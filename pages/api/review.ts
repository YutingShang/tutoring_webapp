import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose"
import { ReviewModel } from "../../models/review";
import { getSession } from "next-auth/react";
import { UserModel } from "../../models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";


export default async function handler(req: NextApiRequest, res: NextApiResponse,) {
    const session = await getServerSession(req, res, authOptions)
    await mongoose.connect(process.env.MONGODB_URL as string)      //do I need to connect to database again after this? //also do i need to close connection?
    const thisUser = await UserModel.findOne({ email: session?.user.email })
    //console.log("session", session)
    // console.log("this user",thisUser)   //actually session and thisUser should both be null if unauthorised since I log them out


    try {


        if (req.method === "POST") {        //so only posts request make it through
            if (!req.body.review || req.body.subject === '-' || req.body.level === '-' || req.body.review.length < 20) return res.status(400).send("Missing post body");
            console.log(req.body.name)
            console.log(process.env.MONGODB_URL)
            await mongoose.connect(process.env.MONGODB_URL as string);   //establish a connection with the database
            await ReviewModel.create({
                review:
                    { original: req.body.review }, //create new post item using the body datafield of the request
                subject:
                    { original: req.body.subject },
                name:
                    { original: req.body.name },
                level:
                    { original: req.body.level },
                displayed: false,            //by default it is not displayed in the feedback page yet
            })
            return res.status(200).send("Success")
        } else if (req.method === 'GET') {

            await mongoose.connect(process.env.MONGODB_URL as string);
            const reviews = await ReviewModel.find();



            if (thisUser !== null) {
                //user is authorised - return entire array         
                return res.status(200).json({ reviewsArray: reviews })

            } else {//publically accessible data

                //set all stuff to 'original' even if edited, mabye should rename 'original' to not be misleading
                //'original' should always have a value, hence not keeping the 'current' one

                const filteredRevsArray = reviews.filter(r => r.displayed)    //must be set to 'displayed' in admin 
                    .map(obj => {
                        return {
                            _id: obj._id,
                            review: { original: obj.review.current ?? obj.review.original },
                            name: { original: obj.name.current ?? obj.name.original },
                            subject: { original: obj.subject.current ?? obj.subject.original },
                            level: { original: obj.level.current ?? obj.level.original },
                            date: obj.date,
                            examBoard: obj.examBoard,
                        }
                    })
                return res.status(200).json({ reviewsArray: filteredRevsArray })
            }

        }
        if (req.method === 'PUT') {        //update the review information

            if (thisUser === null) {
                console.log("NULL")
                return res.status(403).send("UNAUTHORISED ACCESS TUT TUT")
            } else {
                console.log("YAY")
                await mongoose.connect(process.env.MONGODB_URL as string);
                await ReviewModel.findOneAndUpdate({ _id: req.body._id },  //filter condition then the desired update
                    {
                        displayed: req.body.displayed, "review.current": req.body.reviewLatestEdit, "subject.current": req.body.subjectLatestEdit,
                        "name.current": req.body.nameLatestEdit, "level.current": req.body.levelLatestEdit, date: req.body.date, examBoard: req.body.examBoard
                    })       //review.current gets the nested field review:{current:}      

                return res.status(200).send("Success")
            }
        }
        else {
            return res.status(405).send("method not allowed")
        }

    } catch (e) {
        return res.status(500).json({ message: e })
    }
}