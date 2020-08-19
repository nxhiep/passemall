import { AppBar, Grid, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import Routes from '../routes';
import { FixedContainer } from './Widgets';
import { useRouter } from 'next/router';
import Link from 'next/link'
const Header = ({ alt = '' }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	if (isMobile) {
		return <HeaderMobile alt={alt} />;
	}
	return <HeaderPC alt={alt} />;
}

const HeaderMobile = ({ alt }) => {
	const router = useRouter()
	return (
		<AppBar color="inherit" position="static" className="main-app-bar">
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="flex-end"
				wrap="nowrap"
			>
				<Link  href="/" >
					<div style={{ alignSelf: "center" }} className={'logo-web'} onClick={(event) => {
						event.preventDefault();
						router.push('/');
					}}>
						<img alt={alt} src="/images/logo.svg" />
					</div>
				</Link>

				<HeaderTabPanel />
			</Grid>
		</AppBar>
	);
}
const HeaderTabPanel = () => {
	const router = useRouter();
	const { appNameId, screenChild } = router.query;
	let screen = screenChild ?? '';
	let homeScreen = screen.length == 0;
	let studyScreen = !screen.startsWith('test') && !screen.startsWith('review') && !homeScreen;
	const gotoPage = (event, screen) => {
		event.preventDefault();
		router.push(getLink(screen));
	}
	const getLink = (screen) => {
		return '/' + appNameId + (screen ? '/' + screen : '');
	}
	return (
		<div className="header-tabs-panel">
			{
				studyScreen ?
					<Button
						className={"header-tab-button" + (studyScreen ? ' active' : '')}>Learn</Button>
					: <Button
						href={getLink()}
						className={"header-tab-button" + (homeScreen ? ' active' : '')}
						onClick={(event) => gotoPage(event)}>Home</Button>
			}
			<Button
				href={getLink(Routes.TEST_SCREEN)}
				className={"header-tab-button" + (screen.startsWith(Routes.TEST_SCREEN) ? ' active' : '')}
				onClick={(event) => gotoPage(event, Routes.TEST_SCREEN)}>Test</Button>
			<Button
				href={getLink(Routes.REVIEW_SCREEN)}
				className={"header-tab-button" + (screen.startsWith(Routes.REVIEW_SCREEN) ? ' active' : '')}
				onClick={(event) => gotoPage(event, Routes.REVIEW_SCREEN)}>Review</Button>

		</div>
	);
}
const HeaderPC = ({ alt }) => {
	let router = useRouter();
	return (
		<AppBar color="inherit" position="static" className="main-app-bar">
			<div>
				<FixedContainer>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<a href="/" >
							<Button className={'logo-web'} onClick={(event) => {
								event.preventDefault();
								router.push('/');
							}}>

							</Button>

							<img alt={alt} src="/images/logo.svg" />
						</a>
						<HeaderTabPanel />
						<div className="temp-panel"></div>
						<div className="temp-panel"></div>
					</Grid>
				</FixedContainer>
			</div>
		</AppBar >
	);
}

export default Header;