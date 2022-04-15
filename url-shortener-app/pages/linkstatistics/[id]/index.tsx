import { server } from '../../../config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '@mui/material'
import Head from 'next/head'
import { WebLinkData } from '../../api/addlink/[id]'
import { WebLinkStats } from '../../api/links/[id]'

const LinkStatistics = ({ linkStats }: { linkStats: WebLinkStats }) => {
    // TODO: Delete button

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Head>
                <title>URL Shortener</title>
                <meta name="description" content="App to create shortened URL links" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <p>{linkStats.shortenedlink}</p>
            <p>{linkStats.targeturl}</p>
            <p>{linkStats.visits}</p>
            <br />
            <Link href='/'>Go Back</Link>
        </Container>
    )
}

export const getServerSideProps = async (context: any) => {
    const res = await fetch(`${server}/api/links/${context.params.id}`)

    const linkStats: WebLinkStats = await res.json()

    return {
        props: {
            linkStats,
        },
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