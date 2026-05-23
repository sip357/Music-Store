import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const usersCollectionName = process.env.USERS_COLLECTION_NAME;
        if (!usersCollectionName) {
            throw new Error("USERS_COLLECTION_NAME is not defined in environment variables");
        }
        const body = await req.json();
        const { email, password }: { email: string; password: string } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const db = await connectDB();
        const users = db.collection(usersCollectionName);

        // check if user exists
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        
        return NextResponse.json(
            { message: "Sign-in successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { error_message: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}