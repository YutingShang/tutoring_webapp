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
                    {original:req.body.review}, //create new post item using the body datafield of the request
                subject: 
                    {original: req.body.subject},
                name: 
                    {original: req.body.name},
                level: 
                    {original: req.body.level},
                displayed: false,            //by default it is not displayed in the feedback page yet
            })
            return res.status(200).send("Success") 
        }else if (req.method==='GET'){

            await mongoose.connect(process.env.MONGODB_URL as string);
            const reviews = await ReviewModel.find();

            return res.status(200).json({reviewsArray: reviews})

        }else if (req.method==='PUT'){        //update the review information
            await mongoose.connect(process.env.MONGODB_URL as string);
            await ReviewModel.findOneAndUpdate({_id: req.body._id} ,  //filter condition then the desired update
                {displayed: req.body.displayed, "review.current": req.body.reviewLatestEdit, "subject.current": req.body.subjectLatestEdit,
                "name.current": req.body.nameLatestEdit, "level.current": req.body.levelLatestEdit, date: req.body.date, examBoard: req.body.examBoard})       //review.current gets the nested field review:{current:}      

            return res.status(200).send("Success")
        }
        else{
            return res.status(405).send("method not allowed")
        }

    }catch(e){
        return res.status(500).json({message: e})
    }
}