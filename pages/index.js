import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { space, color, typography } from 'styled-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Title = styled.h1`
  font-size: 50px;
  font-family: 'Merriweather Sans', sans-serif;
  color: ${({ theme }) => theme.colors.lime[2]};
  ${space}
`

const Subtitle = styled.h2`
  font-size: 45px;
  font-family: 'Merriweather Sans', sans-serif;
  ${color}
  ${space}
`

const Container = styled.div`
	padding: ${({ theme }) => theme.space[2] }px;
	font-size: 50px;
`

const Background = styled.div`
	height: 100vh;
	width: 100vw;
	z-index: -1;
background: #24C6DC;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #514A9D, #24C6DC);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #514A9D, #24C6DC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	position: absolute;
`

const Button = styled.button.attrs(props => ({
	className: 'block'
}))`
${typography}
${space}
`

const Spotify = styled(FontAwesomeIcon).attrs(props => ({
	icon: ['fab', 'spotify']
}))`
font-size: 1px;
`



export default () => {
	return (
		<React.Fragment>
			<Head>
				<link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
								<link
					href="https://fonts.googleapis.com/css?family=Merriweather+Sans:300,300i,400,400i,700,700i,800,800i&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Background/>
			<Container>
				<Title>See The Music</Title>
				<Subtitle color='lime.5' >Visualize & share what you've been listening to on Spotify</Subtitle>
				<br/>
				<Link href="/seethemusic">
					<Button fontSize={4}>✨ SEE THE MUSIC ✨</Button>
				</Link>
			</Container>
		</React.Fragment>
		)
}
