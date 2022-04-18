import { server } from '../../../config'
import Link from 'next/link'
import { Alert, Button, Container, Typography } from '@mui/material'
import Head from 'next/head'
import { WebLinkStats } from '../../api/links/[id]'
import { useState } from 'react'
import { blue, purple } from '@mui/material/colors'

const LinkStatistics = ({ linkStats }: { linkStats: WebLinkStats }) => {

    const [apiError, setApiError] = useState('');

    const handleLinkDelete = async () => {
        const res = await fetch(`${server}/api/deletelink/${encodeURIComponent(linkStats.weblinkid)}`);
        if (res.status === 200) {
            window.location.assign(`${server}/`)
        } else {
            const error: {message: string} = await res.json();
            setApiError(error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Head>
                <title>URL Shortener Statistics</title>
                <meta name="description" content="Statistics of the shortened URL link" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Typography variant="h2" component="h1" color="primary" gutterBottom>Link Statistics</Typography>
            <Link href={`/f/${linkStats.shortenedlink}`} passHref>
                <Typography variant="h4" component="h2" tabIndex={1} sx={{cursor: "pointer",
                    color: blue[200],
                    '&:hover, &:focus, &.Mui-selected:hover': {
                        color: purple[300],
                    },
                    '&.Mui-selected': {
                        color: purple[300],
                    }}} gutterBottom>{server}/f/{linkStats.shortenedlink}</Typography>
            </Link>
            <Typography variant="h4" component="h2" color="primary" gutterBottom>{linkStats.targeturl}</Typography>
            <Typography variant="h4" component="h2" color="primary" mb={2} gutterBottom>Visits: {linkStats.visits}</Typography>
            <Button variant="contained" color="error" onClick={handleLinkDelete}>
                    Remove Link
            </Button>
            <Link href='/' passHref>
                <Typography variant="h4" component="h2" color="primary" tabIndex={1} sx={{cursor: "pointer",
                    color: blue[200],
                    '&:hover, &:focus, &.Mui-selected:hover': {
                        color: purple[300],
                    },
                    '&.Mui-selected': {
                        color: purple[300],
                    }}} mt={2} gutterBottom>Go Back</Typography>
            </Link>
            {apiError && <Alert variant="filled" severity="error" sx={{width: '100%', mt: 2}} onClose={() => {setApiError('')}}>{apiError}</Alert>}
        </Container>
    )
}

export const getServerSideProps = async (context: any) => {
    const res = await fetch(`${server}/api/links/${context.params.id}`)
    if (res.status === 200) {
        const linkStats: WebLinkStats = await res.json();
        return {
            props: {
                linkStats,
            },
        }
    } else {
        const error: {message: string} = await res.json();
        throw new Error(error.message);
    }
}

/*
export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/links`)

    const links = await res.json()

    const ids = links.map((webLink: WebLinkData) => webLink.weblinkid)
    const paths = ids.map((id: string) => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false,
    }
}
*/

export default LinkStatistics;