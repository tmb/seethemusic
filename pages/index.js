import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.base};
  ${space}
`

const Subtitle = styled.h2`
  font-size: 45px;
  color: ${({ theme }) => theme.colors.lime[5]};
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
	background-color: white;
	filter: brightness(15%);
	position: absolute;
`

const Button = styled.button.attrs(props => ({
	className: 'block'
}))`
padding: ${({ theme }) => theme.space[2]}px ${({ theme }) => theme.space[4]}px !important;
font-size: .48em;
${space}
`

const Spotify = styled(FontAwesomeIcon).attrs(props => ({
	icon: ['fab', 'spotify']
}))`
${space}
`

const doShit = () => {
	console.log('whoa!')
}


export default () => {
	return (
		<React.Fragment>
			<Background/>
			<Container>
				<Title>See The Music</Title>
				<Subtitle>Visualize & share what you've been listening to on Spotify</Subtitle>

				<Button onClick={doShit}>Connect to Spotify <Spotify ml={1} /></Button>
			</Container>
		</React.Fragment>
		)
}
