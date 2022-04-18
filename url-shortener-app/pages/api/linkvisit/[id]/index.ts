import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../../lib/db";
import { WebLinkData } from "../../addlink/[id]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    try {
        const query = 'SELECT weblinkid, shortenedlink, targeturl FROM weblink WHERE shortenedlink = $1'
        const values = ['' + req.query.id];
        const result = await conn.query(
            query,
            values
        );

        const webLink: WebLinkData = result.rows[0];

        const insertVisit = 'INSERT INTO weblinkvisit(weblinkid, visitdt) VALUES($1, current_timestamp)'
        const insertValues = [webLink.weblinkid];
        await conn.query(
            insertVisit,
            insertValues
        );

        res.status(200).json(webLink);
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
    }
}