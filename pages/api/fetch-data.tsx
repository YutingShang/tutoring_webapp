import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    return axios.get("https://api.api-ninjas.com/v1/quotes", {
        params: {

            category: "inspirational",
            limit: 10,
        },
        headers: {
            "X-Api-Key": process.env.QUOTES_API_KEY
        }
    }).then(response => {
        let i = 0;
        while (i < 9 && (response.data[i]?.quote.toLowerCase().includes("avatar") || response.data[i]?.quote.toLowerCase().includes("god") || response.data[i]?.quote.toLowerCase().includes("jesus") || response.data[i]?.quote.toLowerCase().includes("christ") || response.data[i]?.quote.toLowerCase().includes("heaven") || response.data[i]?.quote.split(/\s+/).length > 30)) {     //removes the non-sensicle avatar quote, religious quotes and also quotes longer than 45 words, unless its the last quote out of the 10 quotes fetched
            i += 1
        }
        console.log("What was it?", i)
        console.log(response.data)
        res.status(200).json(response.data[i])
    })  //the response returns an array of quotes, sends one of them as a json 
        .catch(e => { console.log(e); res.status(e.status).json(e.response.data)})

    //no need for useEffect - thats for when you call it, and also could use try/catch statement
}