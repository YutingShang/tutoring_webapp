import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import { ReviewModel } from "../../models/review";
import { UserModel } from "../../models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
    const session = await getServerSession(req, res, authOptions)
    await mongoose.connect(process.env.MONGODB_URL as string)      //do I need to connect to database again after this? //also do i need to close connection?
    const thisUser = await UserModel.findOne({ email: session?.user.email })

    //actually session and thisUser should both be null if unauthorised since I log them out
    if (thisUser === null || session === null) {
        return res.status(403).send("UNAUTHORISED ACCESS TUT TUT")
    }

    try {

        if (req.method === 'GET') {

            await mongoose.connect(process.env.MONGODB_URL as string);
            const reviews = await ReviewModel.find();

            //user is authorised - return entire array         
            return res.status(200).json({ reviewsArray: reviews })

        }
        else if (req.method === 'PUT') {        //update the review information

            await mongoose.connect(process.env.MONGODB_URL as string);
            await ReviewModel.findOneAndUpdate({ _id: req.body._id },  //filter condition then the desired update
                {
                    displayed: req.body.displayed, "review.current": req.body.reviewLatestEdit, "subject.current": req.body.subjectLatestEdit,
                    "name.current": req.body.nameLatestEdit, "level.current": req.body.levelLatestEdit, date: req.body.date, examBoard: req.body.examBoard
                })       //review.current gets the nested field review:{current:}      

            return res.status(200).send("Success")

        }
        else {
            return res.status(405).send("method not allowed")
        }

    } catch (e) {
        return res.status(500).json({ message: e })
    }
}