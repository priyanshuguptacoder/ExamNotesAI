import mongoose from "mongoose";

const connectDb = async () => {
    try {
        if (!process.env.MONGODB_URL) {
            console.error("❌ MONGODB_URL is missing in environment variables!");
            return;
        }
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("✅ DB Connected successfully")
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message || error)
    }
}
export default connectDb