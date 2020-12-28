import { Container, Grid, makeStyles } from "@material-ui/core"
import { VERSION } from "../../config_app";
import { FacebookFooter, GmailFooter, LinkedInFooter, TumblrIcon, TwitterFooter, Youtube } from "../Icons";

const useStyles = makeStyles({
    tagAFooter: {
        color: "#1239e1",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        '&:hover': {
            textDecoration: "underline"
        }
    },
});

const FooterPanel = ({ isMobile }) => {
    const styles = useStyles()
    return <footer style={{ backgroundColor: "#DAD3F1", padding: "50px 0", color: "#4e63bd" }}>
        <Container>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <a href="/">
                        <img alt="ABC Elearning" src="/images/logo/logo-dark.svg" width="240px" height="60px" />
                    </a>
                </Grid>
                <Grid item xs={12} sm={6} md={3} style={{paddingTop: "20px"}}>
                    <div style={{fontSize: "20px", marginBottom: "20px"}}><strong>Resources</strong></div>
                    <div>
                        <div><a href="/blog" className={styles.tagAFooter}>Blog</a></div>
                        <div style={{height:"10px"}}></div>
                        <div><a href="https://passemall.com/blog/about-us-5634123102158848" className={styles.tagAFooter}>About us</a></div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={5} style={{paddingTop: "20px"}}>
                    <div style={{fontSize: "20px", marginBottom: "20px"}}><strong>Social</strong></div>
                    <SocialWidget />
                </Grid>
            </Grid>
        </Container>
        <div style={{
            fontSize: "10px",
            position: "absolute",
            bottom: "5px",
            left: "5px"
        }}>Version: {VERSION}</div>
    </footer>
}

const SocialWidget = ({ color }) => {
    const styles = useStyles()
    return <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://twitter.com/abcelearningapp" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <TwitterFooter color={color}></TwitterFooter>
                <span style={{ marginLeft: "8px" }}>Twitter</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.facebook.com/ABC-E-learning-110654290809849" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <FacebookFooter color={color}></FacebookFooter>
                <span style={{ marginLeft: "8px" }}>Facebook</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.youtube.com/channel/UCkLKqup_8asTJGtQIgXCOZg" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <Youtube color={color}></Youtube>
                <span style={{ marginLeft: "8px" }}>Youtube</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.tumblr.com/blog/view/abcelearningapps" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <TumblrIcon color={color} bgColor="white"></TumblrIcon>
                <span style={{ marginLeft: "8px" }}>Tumblr</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <a href="https://www.linkedin.com/in/abc-elearningapps-ab9a231b8" target="_blank" rel="noopener" className={styles.tagAFooter}>
                <LinkedInFooter color={color}></LinkedInFooter>
                <span style={{ marginLeft: "8px" }}>LinkedIn</span>
            </a>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
            <a href="mailto:abc.elearningapps@gmail.com" target="_blank" className={styles.tagAFooter}>
                <GmailFooter color={color}></GmailFooter>
                <span style={{ marginLeft: "8px" }}>abc.elearningapps@gmail.com</span>
            </a>
        </Grid>
    </Grid>
}

export default FooterPanel