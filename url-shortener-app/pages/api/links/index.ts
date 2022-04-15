import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = 'SELECT weblinkid, shortenedlink, targeturl FROM weblink'
        const result = await conn.query(
            query
        );

        const webLinks = result.rows;
        res.status(200).json(webLinks);
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
    }
}