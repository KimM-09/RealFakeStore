import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if(!mongoURI) {
            throw new Error("Mongo URI is not defined in the environment variables (.env file).")
        }

        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch(err) {
        console.error(`Database Connection Error: ${(err as Error).message}`);
        process.exit(1);
    }
};