import { NextApiRequest, NextApiResponse } from "next";
import conn from "../../../lib/db";

export type WebLinkStats = {
    weblinkid: number,
    shortenedlink: string,
    targeturl: string,
    visits: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    if (req.query.id && typeof req.query.id === 'string' && isValidId(req.query.id)) {
        try {
            const query = 'SELECT wl.weblinkid, wl.shortenedlink, wl.targeturl, (SELECT COUNT(1) FROM weblinkvisit wlv WHERE wl.weblinkid = wlv.weblinkid) AS visits FROM weblink wl WHERE wl.weblinkid = $1'
            const values = ['' + req.query.id];
            const result = await conn.query(
                query,
                values
            );

            if (result.rows[0]) {
                const webLink: WebLinkStats = result.rows[0];
                res.status(200).json(webLink);
            } else {
                res
                    .status(404)
                    .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
            }
        } catch (error) {
            console.log(error);
            res
                .status(404)
                .json({ message: `Can't find Shortened URL link with the id ${req.query.id}` });
        }
    } else {
        res
            .status(404)
            .json({ message: `Invalid input ${req.query.id}` })
    }
}


export function isValidId(inputId: string) {
    return /^\d+$/.test(inputId);
}