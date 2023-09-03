import { NextApiRequest, NextApiResponse } from "next";
import { ReviewModel } from "../../models/review";
import databaseConnect from "../../lib/connection";

export default async function handler(req: NextApiRequest, res: NextApiResponse,) {

    await databaseConnect()

    //publically accessible API endpoints

    try {
        if (req.method === "POST") {        //so only posts request make it through
            if (!req.body.review || req.body.subject === '-' || req.body.level === '-' || req.body.review.length < 20) return res.status(400).send("Missing post body");
            console.log(req.body.name)
            console.log(process.env.MONGODB_URL)

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
                newReview: true,
            })
            return res.status(200).send("Success")
        } else if (req.method === 'GET') {

            const reviews = await ReviewModel.find();
            reviews.reverse()

            const filteredRevsArray = reviews.filter(r => r.displayed)    //must be set to 'displayed' in admin 
                .map((obj,i) => {
                    return {
                        index: i,             //so filtering doesnt change left or right display
                        _id: obj._id,
                        review:  obj.review.current ?? obj.review.original ,   //keep current if it exists, otherwise use the original. 
                        name:  obj.name.current ?? obj.name.original ,
                        subject:  obj.subject.current ?? obj.subject.original ,
                        level:  obj.level.current ?? obj.level.original ,
                        date: obj.date,
                        examBoard: obj.examBoard,
                    }
                })
            
            return res.status(200).json({ reviewsArray: filteredRevsArray })

        }
        else {
            return res.status(405).send("method not allowed")
        }

    } catch (e) {
        return res.status(500).json({ message: e })
    }
}