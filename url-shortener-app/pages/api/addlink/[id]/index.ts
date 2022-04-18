import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../../../lib/db'

export type WebLinkData = {
    weblinkid: number,
    shortenedlink: string,
    targeturl: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.id && typeof req.query.id === 'string' && isValidHttpsUrl(req.query.id)) {
        try {
            const query = 'INSERT INTO weblink(shortenedlink, targeturl) VALUES(create_unique_shortened_url(4), $1) RETURNING weblinkid, shortenedlink, targeturl'
            const values = [decodeURIComponent(`${req.query.id}`)];
            const result = await conn.query(
                query,
                values
            );

            const webLink: WebLinkData = result.rows[0];
            res.status(200).json(webLink);
        } catch (error: any) {
            console.error(error);
            if (error.code === '23505') {
                res
                    .status(404)
                    .json({ message: `A shortened URL link for ${req.query.id} already exists` });
            }
            else {
                res
                    .status(404)
                    .json({ message: `Not able to create shortened URL link for ${req.query.id}` });
            }
        }
    } else {
        res
            .status(404)
            .json({ message: `Invalid input ${req.query.id}` })
    }
}

function isValidHttpsUrl(inputUrl: string) {
    let url;

    try {
        url = new URL(inputUrl);
    } catch (_) {
        return false;
    }

    return url.protocol === "https:";
}
