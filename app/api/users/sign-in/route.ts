import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../models/User";
import { connectDB } from "../../../lib/mongodb";

export async function POST(req: Request) {
    try {
        const { email, password } : { email: string; password: string } = await req.json();
        
        // Validate email and password
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

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