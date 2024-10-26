import { Task } from "../../../../models/task";
import { connectDb } from "../../../../utils/features"
import { validateToken } from "../../../../utils/middleware";

export const GET = async(req)=>{
    const result = validateToken();
    const id = result.decodedToken._id; 

    if(!result.valid) return new Response(JSON.stringify({message: result.message}),{status: 400});
    try{
        if(id){
            await connectDb();  
            const userTaskDetails = await Task.find({user: id});
            console.log(userTaskDetails);
            return new Response(JSON.stringify({message: "Task created successfully",data: userTaskDetails}),{status: 200});
        }
        return new Response(JSON.stringify({error: 'UserId not found'}),{status: 400});
    }
    catch(error){
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    

}