import { useEffect } from "react";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    axios.get("https://api.api-ninjas.com/v1/quotes", {
        params: {

            category: "inspirational",
            limit: 2,
        },
        headers: {
            "X-Api-Key": process.env.QUOTES_API_KEY
        }
    }).then(response => { res.json(response.data[0]) })  //the response returns an array of quotes
        .catch(e => { console.log(e); })

    //no need for useEffect - thats for when you call it, and also could use try/catch statement
}