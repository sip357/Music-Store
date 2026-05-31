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

        if (existingUser) {
            console.warn(`Attempt to sign up with existing email: ${email}`);
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await users.insertOne({
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const user = {
            _id: result.insertedId,
            email,
            createdAt: new Date(),
        };

        return NextResponse.json(
            {
                message: "Account created",
                user,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error during sign-up:", error);

        return NextResponse.json(
            {
                error_message:
                    error instanceof Error ? error.message : "Internal server error",
            },
            { status: 500 }
        );
    }
}