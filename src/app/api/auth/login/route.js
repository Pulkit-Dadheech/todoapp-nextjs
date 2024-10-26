import { User } from "../../../../../models/user";
import bcrypt from 'bcryptjs';
import { connectDb, generateToken } from "../../../../../utils/features";
import { cookieSetter } from "../../../../../utils/features";

export const POST = async(req)=>{
    try{
        const {email,password} = await req.json();
        await connectDb();
        console.log(email,password);
        const checkEmailPresent = await User.findOne({email});
        if(!checkEmailPresent) return new Response(JSON.stringify({error: "User is not Registered"}),{status: 400})
        
        const user= await User.findOne({email: email}).select('password');
        if (!user) return new Response(JSON.stringify({message: "User not found"}),{status: 404});
        const isMatch = bcrypt.compareSync(password,user.password);
        if(!isMatch) return new Response(JSON.stringify({error: 'Incorrect Password'}),{status: 401});
        
        const token = generateToken(user._id);
        const response = cookieSetter(token,true);

        return new Response(JSON.stringify({success: true,message: 'User Login Successful',userId: user._id}),{status: 200,headers: response.headers});
    }catch(error){
        return new Response(JSON.stringify({error: error.message}),{status: 500})
    }
}