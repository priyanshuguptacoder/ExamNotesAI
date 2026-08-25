import Notes from "../models/notes.model.js"
import UserModel from "../models/user.model.js"
import { generateGeminiResponse } from "../services/gemini.services.js"
import { buildPrompt } from "../utils/promptBuilder.js"

export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeChart = false
        } = req.body;
        if (!topic) {
            return res.status(400).json({ message: "Topic is required" })
        }

        // Atomically deduct 10 credits only if user exists and has >= 10 credits.
        // The $gte condition acts as a guard so two concurrent requests cannot
        // both pass the balance check and deduct from the same credits.
        const user = await UserModel.findOneAndUpdate(
            { _id: req.userId, credits: { $gte: 10 } },
            { $inc: { credits: -10 } },
            { new: true }
        )

        if (!user) {
            // Either user doesn't exist or had < 10 credits
            const exists = await UserModel.findById(req.userId)
            if (!exists) {
                return res.status(400).json({ message: "User not found" })
            }
            exists.isCreditAvailable = false
            await exists.save()
            return res.status(403).json({ message: "Insufficient credits" })
        }

        // Update isCreditAvailable flag if needed after deduction
        if (user.credits < 10) {
            user.isCreditAvailable = false
            await user.save()
        }

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })

        let aiResponse;
        try {
            aiResponse = await generateGeminiResponse(prompt)
        } catch (aiError) {
            // Refund the credit deducted above if AI call fails
            await UserModel.findByIdAndUpdate(req.userId, {
                $inc: { credits: 10 },
                $set: { isCreditAvailable: true }
            })
            console.error("Gemini generation failed — credit refunded:", aiError.message)
            return res.status(500).json({
                error: "AI generation failed",
                message: aiError.message
            })
        }

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: aiResponse
        })

        await UserModel.findByIdAndUpdate(req.userId, {
            $push: { notes: notes._id }
        })

        return res.status(200).json({
            data: aiResponse,
            noteId: notes._id,
            creditsLeft: user.credits
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "AI generation failed",
            message: error.message
        });
    }
}
