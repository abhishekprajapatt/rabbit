import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully...!")
    } catch (error) {
        console.log("MongoDB Not Connected...!")
        console.log(error);
    }
}

export default connectDB;