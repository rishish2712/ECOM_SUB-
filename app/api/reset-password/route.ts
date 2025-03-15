import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import IUser from "@/lib/db/models/user.model";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { success: false, message: "Invalid request." },
                { status: 400 }
            );
        }

        await connectToDatabase();

        const user = await IUser.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Invalid or expired token." },
                { status: 400 }
            );
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        user.resetPasswordToken = undefined; // Remove token after reset
        user.resetPasswordExpires = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "Password reset successfully! You can now log in with your new password." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong" },
            { status: 500 }
        );
    }
}
