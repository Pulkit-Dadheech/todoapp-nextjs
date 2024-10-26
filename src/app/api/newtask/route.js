import { Task } from "../../../../models/task";
import { connectDb } from "../../../../utils/features"
import { validateToken } from "../../../../utils/middleware";


export const POST = async(req)=>{
    const result = validateToken();

    console.log(result);
    if(!result.valid) return new Response(JSON.stringify({message: result.message}),{status: 400});
    try{
        await connectDb();
        const {title,description} = await req.json();
        const userId = result.decodedToken._id;

        const tasks = await Task.create({
            title,
            description,
            user: userId
        })
        
        return new Response(JSON.stringify({message: "Task created successfully",data: tasks}),{status: 200});
    }
    catch(error){
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    

}