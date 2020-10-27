import { IconButton, Link } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import IconArrowUpward from '@material-ui/icons/ArrowUpward';
import { scrollToTop } from '../models/Utils';

export const SocialWidget = () => {
    const [fixed, setSixed] = useState(false);
    const [checkScrollToTop, setScrollToTop] = useState(false);
    useEffect(() => {
        typeof window !== 'undefined' && window.addEventListener('scroll', (event) => {
            setSixed(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100);
            setScrollToTop(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500);
        });
    }, []);

    return <div className="list-social" style={{ position: fixed ? 'fixed' : 'absolute' }}>
        {checkScrollToTop ? <IconButton aria-label="arrow_upward" style={{
            color: 'black',
            backgroundColor: 'white',
            marginBottom: '10px',
            width: '50px',
            height: '50px',
            boxShadow: '0px 0px 6px 2px #838383'
        }} onClick={() => scrollToTop()}> <IconArrowUpward />
        </IconButton> : null}
        <Link href="https://twitter.com/abcelearningapp" target="_blank">
            <img src="/images/twitter.svg" alt="twitter" />
        </Link>
        <Link href="https://www.linkedin.com/in/abc-elearningapps-ab9a231b8" target="_blank">
            <img src="/images/likedin.svg" alt="likedin" />
        </Link>
        <Link href="https://www.tumblr.com/blog/view/abcelearningapps" target="_blank">
            <img src="/images/snapchat.svg" alt="tumblr"></img>
        </Link>
        <Link href="https://www.facebook.com/ABC-E-learning-110654290809849" target="_blank">
            <img src="/images/facebook.svg" alt="facebook"></img>
        </Link>
    </div>
}

// <IconButton>
//     <img src="/images/snapchat.svg" alt="snapchat"></img>
// </IconButton>
// <IconButton>
//     <LinkIcon style={{ color: "#fff", fontSize: "30px" }}></LinkIcon>
// </IconButton>