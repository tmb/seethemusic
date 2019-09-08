import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { space, color, typography, layout } from 'styled-system'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SongContainer = styled.div`
	display: inline-flex;
	flex-wrap: wrap;
	background-color: white;
	border-radius: 4px;
	${layout}
	${space}
`

const SongName = styled.p`
	font-weight: bold;
	font-family: 'Merriweather Sans', sans-serif;
	flex-basis: 100%;
	${typography}
	${space}
	${color}
`

const SongArtist = styled.div`
	font-family: 'Merriweather Sans', sans-serif;
	font-weight: 500;
	${typography}
	${space}
	${color}
`

const SongImage = styled.img`
	max-width: 100%;
    max-height: 100%;
	flex-basis: 100%;

`

export default (song) => {
	return (
		<SongContainer p={2} ml={4} maxWidth={'32rem'} >
			<SongImage src={song.albumImage} />
			<SongName fontSize={4} mt={2} mb={1} color={'black'}>{song.songName}</SongName>
			<SongArtist>{song.songArtist}</SongArtist>
		</SongContainer>
		)
}
