import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../lib/db";

export type WebLinkStats = {
    weblinkid: number,
    shortenedlink: string,
    targeturl: string,
    visits: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = 'SELECT wl.weblinkid, wl.shortenedlink, wl.targeturl, (SELECT COUNT(1) FROM weblinkvisit wlv WHERE wl.weblinkid = wlv.weblinkid) AS visits FROM weblink wl WHERE wl.weblinkid = $1'
        const values = ['' + req.query.id];
        const result = await conn.query(
            query,
            values
        );

        const webLink: WebLinkStats = result.rows[0];
        res.status(200).json(webLink);
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
    }
}