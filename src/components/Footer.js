import { Box, Grid, Link } from '@material-ui/core';
import React from 'react';
import { FixedContainer } from './Widgets';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Footer = ({ alt = ''}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    if(isMobile){
        return <div></div>;
    }
    return (
    <Box component="footer" style={{marginTop:"auto"}}>
        <FixedContainer>
            <div className={'footer-content'}>
                <Grid container direction="row" alignItems="center" justify="space-between">
                    <Link href="/" className={'logo-web'}>
                        <img alt={alt} src="/images/logo.svg" />
                    </Link>
                </Grid>
            </div>
        </FixedContainer>
    </Box>);
}
export default Footer;