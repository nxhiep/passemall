import { IconButton, Link } from "@material-ui/core";
import React from 'react';
import LinkIcon from '@material-ui/icons/Link';

export const SocialWidget = () => {
    return <div className="list-social">
        <Link href="https://twitter.com/abcelearningapp" target="_blank" style={{textAlign:"center", padding: "8px 0"}}>
            <img src="/images/twitter.svg" alt="twitter" />
        </Link>
        <Link href="https://www.linkedin.com/in/abc-elearningapps-ab9a231b8" target="_blank" style={{textAlign:"center", padding: "8px 0"}}>
            <img src="/images/likedin.svg" alt="likedin" />
        </Link>
        <Link href="https://www.tumblr.com/blog/view/abcelearningapps" target="_blank" style={{textAlign:"center", padding: "8px 0"}}>
            <img src="/images/snapchat.svg" alt="tumblr"></img>
        </Link>
        <Link href="https://www.facebook.com/ABC-E-learning-110654290809849" target="_blank" style={{textAlign:"center", padding: "8px 0"}}>
            <img src="/images/facebook.svg" alt="facebook"></img>
        </Link>
        <IconButton>
            <LinkIcon style={{ color: "#fff", fontSize: "30px" }}></LinkIcon>
        </IconButton>
    </div>
}

// <IconButton>
//     <img src="/images/snapchat.svg" alt="snapchat"></img>
// </IconButton>