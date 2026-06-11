import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";
import { createToken } from "@/app/lib/auth";
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

        const token = createToken(existingUser._id);

        const response = NextResponse.json(
            { message: "Sign-in successful", token },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600 * 124 * 7, // 7 days
        });

        return response;
    } catch (error) {
        console.error("Error during sign-in:", error);
        return NextResponse.json(
            { error_message: error instanceof Error ? error.message : "Internal server error" },
            { status: 500 }
        );
    }
}