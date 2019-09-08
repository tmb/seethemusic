import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Song from "../components/song";
import Slider from "../components/slider";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { space, color, typography } from "styled-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {CopyToClipboard} from 'react-copy-to-clipboard';



const See = props => {
	const [notify, setNotify] = useState(true);
	const [url, setUrl] = useState('')

	const Background = styled.div`
		height: 100vh;
		width: 100vw;
		z-index: -1;
		background-color: white;
		filter: brightness(15%);
		position: absolute;
	`;

	const Songs = styled.div`
		white-space: nowrap;
		overflow: hidden;
	`;

	const Container = styled.div`
		height: 100vh;
		display: flex;
		align-items: center;
	`;

	const Buttons = styled.div`
		display: flex;
		width: 100%;
		justify-content: space-between;
		height: 4rem;
		position: absolute;
	`;
	const Button = styled.button.attrs(props => ({
		className: "block"
	}))`
		${typography}
		${space}
	`;

	function unfocus() {
		this.refs.slider.focus()
	}

	useEffect(() => {
		if (props.success) {
			toast(props.success);
		}

		setUrl(window.location.href)
	}, []);

	return (
		<React.Fragment>
			<Head>
				<link
					href="https://fonts.googleapis.com/css?family=Merriweather+Sans:300,300i,400,400i,700,700i,800,800i&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Background />
			<Buttons>
				<div style={{ display: "flex" }}>
					<Link href="/createplaylist">
						<Button fontSize={2}>
							Create Playlist from Songs 🎵
						</Button>
					</Link>
				</div>
				
				<div style={{ display: "flex" }}>
				 <CopyToClipboard text={url}>
				 	<Button fontSize={2}>Copy URL 📎</Button>
				 </CopyToClipboard> 
				</div>
			</Buttons>
			<Container>
				<Slider duration={70}>
					<Songs>
						{props.songs.map((val, i) => {
							return (
								<Song
									songUrl={val.track.href}
									albumImage={val.track.album.images[0].url}
									songAlbumUrl={
										val.track.external_urls.spotify
									}
									songName={val.track.name}
									songArtist={val.track.artists[0].name}
								/>
							);
						})}
					</Songs>
				</Slider>
			</Container>
			<ToastContainer />
		</React.Fragment>
	);
};

See.getInitialProps = async ({ query, req }) => {
	return {
		songs: query.body.items,
		success: req.session.success,
		notify: req.session.notify
	};
};

export default See;
