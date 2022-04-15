import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = 'delete from weblink where weblinkid = $1';
        const values = ['' + req.query.id];
        const result = await conn.query(
            query,
            values
        );
        res
            .status(200)
            .json({ message: `Deleted shortened URL link for id ${req.query.id}` });
    } catch (error) {
        console.log(error);
        res
            .status(404)
            .json({ message: `Not able to delete shortened URL link for id ${req.query.id}` })
    }
}
