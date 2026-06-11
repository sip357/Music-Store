import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";
import User from "@/app/models/User";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password }: { email: string; password: string } = body;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // check if user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.warn(`Attempt to sign up with existing email: ${email}`);
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            dateCreated: new Date(),
        });

        await newUser.save();

        const user = {
            _id: newUser._id,
            email: newUser.email,
            dateCreated: newUser.dateCreated,
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