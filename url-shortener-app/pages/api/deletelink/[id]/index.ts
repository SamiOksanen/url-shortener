import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../../../../lib/db';
import { isValidId } from '../../links/[id]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.id && typeof req.query.id === 'string' && isValidId(req.query.id)) {
        try {
            const query = 'DELETE FROM weblinkvisit WHERE weblinkid = $1';
            const values = [req.query.id];
            await conn.query(
                query,
                values
            );
            const query2 = 'DELETE FROM weblink WHERE weblinkid = $1';
            await conn.query(
                query2,
                values
            );
            res
                .status(200)
                .json({ message: `Deleted shortened URL link and its statistics for id ${req.query.id}` });
        } catch (error) {
            console.log(error);
            res
                .status(404)
                .json({ message: `Not able to delete shortened URL link for id ${req.query.id}` })
        }
    } else {
        res
            .status(404)
            .json({ message: `Invalid input ${req.query.id}` })
    }
}
