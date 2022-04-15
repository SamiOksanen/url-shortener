import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import Head from 'next/head'
import { server } from '../config'
import { WebLinkData } from './api/addlink/[id]'
import Link from 'next/link'

const Home: NextPage = () => {

    const isInitialMount = useRef(true);

    const [targetUrl, setTargetUrl] = useState('');

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetUrl(event.target.value);
    };

    const [validationError, setValidationError] = useState('');

    function validateTargetUrl() {
        if (!targetUrl) {
            setValidationError('Please give a value.');
        } else {
            setValidationError('');
        }
    }

    useEffect(() => {
        if (isInitialMount.current && targetUrl !== '') {
            isInitialMount.current = false;
            validateTargetUrl();
        } else {
            if (!isInitialMount.current) {
                validateTargetUrl();
            }
        }
    }, [targetUrl]);

    const [webLink, setWebLink]: any = useState(null);

    const handleLinkCreation = async () => {
        const res = await fetch(`${server}/api/addlink/${encodeURIComponent(targetUrl)}`);
        const newLink: WebLinkData = await res.json();
        setWebLink(newLink);
        console.log('button clicked: ' + JSON.stringify(newLink));
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
            <Head>
                <title>URL Shortener</title>
                <meta name="description" content="App to create shortened URL links" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ my: 4 }}>
                <Typography variant="h2" component="h1" color="primary" gutterBottom>
                    URL Shortener
                </Typography>
                <Box sx={{ maxWidth: '100%' }}>
                    {
                        validationError ? <TextField
                            id="target-url"
                            label="Target URL"
                            placeholder="Please enter the target URL"
                            value={targetUrl}
                            onChange={handleUrlChange}
                            helperText={validationError}
                            error
                            fullWidth
                        /> : <TextField
                            id="target-url"
                            label="Target URL"
                            placeholder="Please enter the target URL"
                            value={targetUrl}
                            color="secondary"
                            onChange={handleUrlChange}
                            fullWidth
                        />
                    }
                </Box>
                <p></p>
                <Button variant="contained" color="primary" onClick={handleLinkCreation}>
                    Create Link
                </Button>
                {webLink && <>
                <Link href={`/f/${webLink.shortenedlink}`}>
                    <Typography variant="h3" component="h3" color="primary" gutterBottom>
                        {server}/f/{webLink.shortenedlink}
                    </Typography>
                </Link>
                <Link href={`/linkstatistics/${webLink.weblinkid}`}>
                    <Typography variant="h3" component="h3" color="primary" gutterBottom>
                        {server}/linkstatistics/{webLink.weblinkid}
                    </Typography>
                </Link>
                </>
                }
            </Box>
        </Container>
    )
}

export default Home;
