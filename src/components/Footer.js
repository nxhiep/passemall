import { Container, Divider, Grid, IconButton } from '@material-ui/core';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useRouter } from 'next/router';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FacebookFooter, GmailFooter, InstaFooter, TwitterFooter, Youtube, TumblrIcon, LinkedInFooter } from './Icons';
const useStyles = makeStyles({
    root: {
        "&:hover": {
            background: "none"
        }
    }
})
const Footer = ({ alt = '', isStudy, color, bucket = "" }) => {
    if(!color){
        color = "#495ebf";
    }
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
    if (isMobile && isStudy) {
        return <FooterStudy></FooterStudy>
    }
    if (isStudy && !isMobile) {
        return null
    }
    const srcImage = (bucket == "ged" ? "/images/logo-footer.svg" : "/images/logo-landing.png");
    return (
        <footer style={{ backgroundColor: color }}>
            {isMobile ? (
                <div className="footer-content">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className="logo-footer">
                                <img src={srcImage} alt="logo-footer" style={{ cursor: "pointer" }} height="80px" ></img>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <div className="resources">
                                <div><strong>Resources</strong></div>
                                <div><a href="/blog">Blog</a></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <div className="company">
                                <div><strong>Social</strong></div>
                                <SocialWidget color={color} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ) : (
                    <Container >
                        <div className="footer-content">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="logo-footer">
                                        <img src={srcImage} alt="logo-footer" style={{ cursor: "pointer" }} ></img>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <div className="resources">
                                        <div><strong>Resources</strong></div>
                                        <div><a href="/blog">Blog</a></div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="company">
                                            <div><strong>Social</strong></div>
                                            <SocialWidget color={color} />
                                        </div>
                                </Grid>
                            </Grid>
                            <Divider className="line"></Divider>
                        </div>
                    </Container>
                )}
        </footer>
    );
}

const SocialWidget = ({ color }) => {
    return <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://twitter.com/abcelearningapp" target="_blank" rel="noopener">
                <TwitterFooter color={color}></TwitterFooter>
                <span style={{ marginLeft: "8px" }}>Twitter</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.facebook.com/ABC-E-learning-110654290809849" target="_blank" rel="noopener">
                <FacebookFooter color={color}></FacebookFooter>
                <span style={{ marginLeft: "8px" }}>Facebook</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.youtube.com/channel/UCkLKqup_8asTJGtQIgXCOZg" target="_blank" rel="noopener">
                <Youtube color={color}></Youtube>
                <span style={{ marginLeft: "8px" }}>Youtube</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.tumblr.com/blog/view/abcelearningapps" target="_blank" rel="noopener">
                <TumblrIcon color={color} bgColor="white"></TumblrIcon>
                <span style={{ marginLeft: "8px" }}>Tumblr</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.linkedin.com/in/abc-elearningapps-ab9a231b8" target="_blank" rel="noopener">
                <LinkedInFooter color={color}></LinkedInFooter>
                <span style={{ marginLeft: "8px" }}>LinkedIn</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <a href="mailto:abc.elearningapps@gmail.com" target="_blank">
                <GmailFooter color={color}></GmailFooter>
                <span style={{ marginLeft: "8px" }}>abc.elearningapps@gmail.com</span>
            </a>
        </Grid>
    </Grid>
}
const FooterStudy = ({ isMobile }) => {
    const router = useRouter();
    const { practice, appNameId, screenChild } = router.query;
    let index;
    if (screenChild === "test") {
        index = 2;
    } else {
        if (screenChild === "review") {
            index = 3;
        } else {
            index = 1;
        }
    }
    const classes = useStyles();
    return (
        <div className="footer-mobile">
            <IconButton
                onClick={() => {
                    if (index !== 1) {
                        router.push("/" + appNameId)
                    }
                }}
                style={index === 1 ? { position: "relative", bottom: "20px" } : (index === 2 ? { color: "#AEAEC0", marginLeft: "16px", marginRight: "auto" } : { color: "#AEAEC0", marginLeft: "16px" })}
                className={index === 1 ? classes.root : null}
                disableTouchRipple={index === 1 ? true : false}>
                <span style={index === 1 ? { display: "flex", flexDirection: "column", alignItems: "center", boxShadow: " -12px -12px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)", width: "62px", height: "62px", borderRadius: "50%", justifyContent: "center", background: "linear-gradient(134.17deg, #EEF0F5 4.98%, #E6E9EF 94.88%)" } : { display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <HomeIcon style={index === 1 ? { fontSize: "30px", color: "#3f51b5" } : { fontSize: "30px" }}></HomeIcon>
                    {index === 1 ? null : <span style={{ fontSize: "14px" }}>Home</span>}
                </span>
            </IconButton>
            <IconButton
                onClick={() => {
                    if (index !== 2) {
                        router.push("/" + appNameId + "/" + "test")
                    }
                }}
                style={index === 2 ? { position: "relative", bottom: "20px" } : { color: "#AEAEC0", marginRight: "auto", marginLeft: "auto" }}
                className={index === 2 ? classes.root : null}
                disableTouchRipple={index === 2 ? true : false}>
                <span style={index === 2 ? { display: "flex", flexDirection: "column", alignItems: "center", boxShadow: " -12px -12px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)", width: "62px", height: "62px", borderRadius: "50%", justifyContent: "center", background: "linear-gradient(134.17deg, #EEF0F5 4.98%, #E6E9EF 94.88%)" } : { display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <LibraryBooksIcon style={index === 2 ? { fontSize: "30px", color: "#3f51b5" } : { fontSize: "30px" }}></LibraryBooksIcon>
                    {index === 2 ? null : <span style={{ fontSize: "14px" }}>Test</span>}
                </span>
            </IconButton>
            <IconButton
                onClick={() => {
                    if (index !== 3) {
                        router.push("/" + appNameId + "/" + "review")
                    }
                }}
                style={index === 3 ? { position: "relative", bottom: "20px" } : (index === 2 ? { color: "#AEAEC0", marginRight: "16px", marginLeft: "auto" } : { color: "#AEAEC0", marginRight: "16px" })}
                className={index === 3 ? classes.root : null}
                disableTouchRipple={index === 3 ? true : false}>
                <span style={index === 3 ? { display: "flex", flexDirection: "column", alignItems: "center", boxShadow: " -12px -12px 20px rgba(255, 255, 255, 0.8), 10px 10px 20px rgba(174, 174, 192, 0.4)", width: "62px", height: "62px", borderRadius: "50%", justifyContent: "center", background: "linear-gradient(134.17deg, #EEF0F5 4.98%, #E6E9EF 94.88%)" } : { display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <VisibilityIcon style={index === 3 ? { fontSize: "30px", color: "#3f51b5" } : { fontSize: "30px" }}></VisibilityIcon>
                    {index === 3 ? null : <span style={{ fontSize: "14px" }}>Reivew</span>}
                </span>
            </IconButton>
        </div >
    )

}

export default Footer;