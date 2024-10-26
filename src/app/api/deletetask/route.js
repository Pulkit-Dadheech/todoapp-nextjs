import { Task } from "../../../../models/task";
import { validateToken } from "../../../../utils/middleware";

export const POST=async(req)=>{
    const result = validateToken();
    if(!result.valid) return new Response(JSON.stringify({message: result.message}),{status: 400});
    try{
        const {taskId} = await req.json();
        console.log(taskId);
        await Task.deleteOne({taskId});
        return new Response(JSON.stringify({success: true,message: 'Task deleted successfully'}),{status: 200});
    }catch(e){
        return new Response(JSON.stringify({success: false,error: e}),{status: 400});
    }
}  