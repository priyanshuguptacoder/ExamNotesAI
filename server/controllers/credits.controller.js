import Stripe from "stripe"
import UserModel from "../models/user.model.js";
import dotenv from "dotenv"
dotenv.config()

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Stripe secret key missing in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const CREDIT_MAP = {
  100: 50,
  200: 120,
  500: 300,
};

export const createCreditsOrder = async (req,res) => {
    try {
        const userId = req.userId
        const {amount} = req.body;

         if (!CREDIT_MAP[amount]) {
      return res.status(400).json({
        message: "Invalid credit plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
        mode: "payment",
      payment_method_types: ["card"],
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${CREDIT_MAP[amount]} Credits`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        credits: CREDIT_MAP[amount],
      },
    })

    res.status(200).json({ url: session.url });
    } catch (error) {
         res.status(500).json({ message: "Stripe error" });
    }
}


// In-memory idempotency store. Survives within a single process instance.
// For multi-instance deployments, move this to MongoDB (store event.id in a collection).
const processedEvents = new Set()

export const stripeWebhook = async (req,res) => {
    const sig = req.headers["stripe-signature"]
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.log("❌ Webhook signature error:", error.message);
        return res.status(400).send("Webhook Error");
    }

    // Idempotency: skip already-processed events
    if (processedEvents.has(event.id)) {
        console.log(`⚠️ Duplicate webhook event skipped: ${event.id}`)
        return res.json({ received: true, duplicate: true });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const userId = session.metadata?.userId;
        const creditsToAdd = Number(session.metadata?.credits);

        if (!userId || !creditsToAdd || isNaN(creditsToAdd) || creditsToAdd <= 0) {
            console.error("❌ Webhook: Invalid metadata", session.metadata);
            return res.status(400).json({ message: "Invalid metadata" });
        }

        const user = await UserModel.findByIdAndUpdate(
            userId,
            {
                $inc: { credits: creditsToAdd },
                $set: { isCreditAvailable: true },
            },
            { new: true }
        )

        if (!user) {
            console.error(`❌ Webhook: User not found for userId=${userId}`)
            return res.status(404).json({ message: "User not found, credits not applied" });
        }

        console.log(`✅ Webhook: Added ${creditsToAdd} credits to user ${userId}. New balance: ${user.credits}`)

        // Mark event as processed only after successful DB update
        processedEvents.add(event.id)
    }

    res.json({ received: true });
}