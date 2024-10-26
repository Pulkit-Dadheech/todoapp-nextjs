import { User } from "../../../../../models/user";
import { connectDb, cookieSetter, generateToken } from "../../../../../utils/features";
import bcrypt from 'bcryptjs';

export const POST = async(req,res)=>{
    try{
        const {name,email,password} = await req.json();
        if(!name || !email || !password) return new Response(JSON.stringify({message: "Please enter all fields",response: res}),{status: 400});
        await connectDb();
        let user = await User.findOne({email});
        if(user) return new Response(JSON.stringify({message: "User Already registered with this email"}),{status: 400});

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword  = bcrypt.hashSync(password,salt);

        user = await User.create({
            username: name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(user._id);
        cookieSetter(token,true);

        return new Response(JSON.stringify({success: true,message: "User registered successfully"}),{status: 201});
    }
    catch(error){
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    

}