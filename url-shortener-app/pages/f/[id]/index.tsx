import { server } from '../../../config'
import { WebLinkData } from '../../api/addlink/[id]'
import { useEffect } from 'react'

const ForwardToTarget = ({ linkData }: { linkData: WebLinkData }) => {
    useEffect(() => {
        if (document.referrer && document.referrer === linkData.targeturl) {
            window.location.assign(`${server}`);
        } else {
            window.location.assign(linkData.targeturl);
        }
    })
    return(
        <>
        </>
    )
}

export const getServerSideProps = async (context: any) => {
    const res = await fetch(`${server}/api/linkvisit/${context.params.id}`);
    if (res.status === 200) {
        const linkData: WebLinkData = await res.json();
        return {
            props: {
                linkData,
            },
        }
    } else {
        const error: {message: string} = await res.json();
        throw new Error(error.message);
    }
}

export default ForwardToTarget;