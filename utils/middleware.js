import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

export const validateToken = () =>{
    const cookie = cookies();
    const token = cookie.get('token')?.value;
    console.log(token);
    if(!token) return {valid: false, message: 'No token provided'}
    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        
        return {valid: true, decodedToken};
    }
    catch(e){
        console.log(e);
        return {valid: false,message: 'Invalid token'};
    }
}