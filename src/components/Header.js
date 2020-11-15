import { Container, IconButton, List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FAQLink } from '../components/Widgets';
import HeaderMenu from './HeaderMenu';
const Header = ({ alt = '', isStudy = false, isBlog = false, appInfo }) => {
	return <HeaderMenu appInfo={appInfo} />;
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.between(0, 780));
	if (isStudy) {
		return (
			<HeaderStudy isMobile={isMobile} appInfo={appInfo} />
		)
	}
	return <HeaderPC alt={alt} isMobile={isMobile} isBlog={isBlog} appInfo={appInfo} />;
}
const HeaderStudy = ({ isMobile, appInfo }) => {
	const router = useRouter();
	const { screenChild } = router.query;
	const getLink = (screen) => {
		return "/" + (screen ? screen : '');
	}
	return (
		<header>
			<Container style={{ display: "flex" }}>
				<a href="/">
					<img src="/images/logo-landing.png" alt="logo-app" height="80px"></img>
				</a>
				{isMobile ? null : (
					<div style={isMobile ? { dispaly: "none" } : { marginLeft: "auto", display: "flex", alignItems: "center" }}>
						<Link href={getLink()}><a>Home</a></Link>
						<Link href={getLink("test")}><a>Test</a></Link>
						<Link href={getLink("review")}><a>Review</a></Link>
						<FAQLink />
					</div>
				)}
			</Container>
		</header>
	)
}

const HeaderPC = ({ alt, isMobile, isBlog }) => {
	const router = useRouter();
	const { ScreenChild } = router.query;
	const [openDrawer, setOpenDrawer] = useState(false);
	const handleOpenDrawer = (open) => {
		setOpenDrawer(open)
	}
	let a = ["Home", "Blog", "Support"];
	let b = ["Home", "About us", "Blog"]
	return (
		<header>
			<Container style={{ display: "flex" }}>
				<a href="/">
					<img src="/images/logo-landing.png" alt="logo-app" height="80px"></img>
				</a>
				<HeaderMenu />
			</Container>
		</header>
	)
}
export default Header;