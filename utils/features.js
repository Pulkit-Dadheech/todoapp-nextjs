import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const connectDb=async()=>{
    return await mongoose.connect(process.env.MONGO_URI,{
        dbName: "NextTodo"
    });
};


export const cookieSetter = (token,set) =>{
    const response = NextResponse.json({ success: true, message: 'User Login Successful' });
    if (set) {
        response.cookies.set("token", token, {
            path: "/",
            // httpOnly: true,
            maxAge: 15 * 24 * 60 * 60, // maxAge in seconds
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
    } else {
        response.cookies.set("token", "", { path: "/", maxAge: 0 }); // Clear the cookie if not set
    }

    return response;
    

}

export const generateToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET)
}

