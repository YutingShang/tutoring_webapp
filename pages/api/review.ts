import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import { ReviewModel } from "../../models/review";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    
    try{

        
        if(req.method==="POST"){        //so only posts request make it through
            if(!req.body.review || req.body.subject==='-' || req.body.level==='-' || req.body.review.length<20) return res.status(400).send("Missing post body");
            console.log(req.body.name)
            console.log(process.env.MONGODB_URL)
            await mongoose.connect(process.env.MONGODB_URL as string);   //establish a connection with the database
            await ReviewModel.create({
                review:
                    req.body.review, //create new post item using the body datafield of the request
                subject: req.body.subject,
                name: req.body.name,
                level: req.body.level
            })
            return res.status(200).send("Success") 
        }else{
            return res.status(405).send("method not allowed")
        }

    }catch(e){
        return res.status(500).json({message: e})
    }
}