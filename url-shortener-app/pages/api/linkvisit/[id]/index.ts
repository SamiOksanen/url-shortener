import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../../lib/db";
import { WebLinkData } from "../../addlink/[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = 'SELECT weblinkid, shortenedlink, targeturl FROM weblink WHERE shortenedlink = $1'
        const values = ['' + req.query.id];
        const result = await conn.query(
            query,
            values
        );

        const webLink: WebLinkData = result.rows[0];

        // TODO: insert weblinkvisit row

        res.status(200).json(webLink);
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
    }
}