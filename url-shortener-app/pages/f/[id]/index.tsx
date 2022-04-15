import { server } from '../../../config'
import { WebLinkData } from '../../api/addlink/[id]'
import { useEffect } from 'react'

const ForwardToTarget = ({ linkData }: { linkData: WebLinkData }) => {
    useEffect(() => {
        window.location.assign(linkData.targeturl)
    })
    return(
        <>
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    const res = await fetch(`${server}/api/linkvisit/${context.params.id}`)

    const linkData: WebLinkData = await res.json()

    return {
        props: {
            linkData,
        },
    }
}

export default ForwardToTarget;