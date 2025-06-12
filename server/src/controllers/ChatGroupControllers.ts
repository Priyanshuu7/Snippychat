import {Response,Request} from "express"
import prisma from "../config/db.config.js";


class ChatGroupController {

    static async store (req:Request, res:Response){

        try {

            const body = req.body;
            const user = req.user;

            await prisma.chatGroup.create({
                data:{
                    title:body.title,
                    passcode:body.passcode,
                    user_id:user.id
                }
            })

            
        } catch (error) {

            res.status(500).json({message:"you Fucked up"})
            
        }
    } 

}

export default ChatGroupController;
