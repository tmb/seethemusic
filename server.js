const express = require('express')
const next = require('next')
const redis = require('redis')

const client  = redis.createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
const nanoid = require('nanoid')
const SpotifyWebApi = require('spotify-web-api-node')
const mongoose = require('mongoose')
const session = require('express-session')
const redisStore = require('connect-redis')(session);
const Visualization = require('./models/visualization.js')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/themusic', {useNewUrlParser: true});

/* Spotify */
var spotifyApi = new SpotifyWebApi({
  clientId: '',
  clientSecret: '',
  redirectUri: 'https://seethemusic.herokuapp.com/spotify/callback'
});

var scopes = ['user-read-recently-played', 'playlist-modify-private', 'playlist-read-private']
var state = 'auth'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(session({
    secret: 'keyboard cats',
    resave: false,
    store: new redisStore({ client }),
    saveUninitialized: true
  }))


  server.get('/spotify/authorize', (req, res) => {
    return res.redirect(spotifyApi.createAuthorizeURL(scopes, state))
  })

  server.get('/spotify/callback', async (req, res) => {
    var code = req.query.code
    var state = req.query.state
    spotifyApi.authorizationCodeGrant(code).then(async (data) => {
      const accessToken = data.body['access_token']
      const refreshToken = data.body['refresh_token']

      req.session.accessToken = accessToken
      req.session.refreshToken = refreshToken

      res.redirect(req.session.redirectTo)
      req.session.redirectTo = null
      return
    })
  })

  server.get('/seethemusic', async  (req, res) => {
    if(!(req.session.accessToken && req.session.accessToken)) {
      req.session.redirectTo = '/seethemusic'
      return res.redirect('/spotify/authorize')
    }

    spotifyApi.setAccessToken(req.session.accessToken);
    spotifyApi.setRefreshToken(req.session.refreshToken);

    let tracks = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 50 })
    let id = nanoid()
    Visualization.create({ key: id, data: tracks }).then((vis, err) => {
      if(err) {
        console.log(err)
        return res.sendStatus(500)
      }

      return res.redirect('/vis/' + vis.key)
    })
  })

  server.get('/createplaylist', async (req, res) => {
      if(!(req.session.accessToken && req.session.accessToken)) {
        req.session.redirectTo = '/createplaylist'
        return res.redirect('/spotify/authorize')
      }

      spotifyApi.setAccessToken(req.session.accessToken);
      spotifyApi.setRefreshToken(req.session.refreshToken);

      let me = await spotifyApi.getMe()
      let name = me.body.display_name


      spotifyApi.createPlaylist(name, 'VisPlaylist ' + req.session.currentVis, {'public': false}).then((data) => {
        const playlistId = data.body.id
        Visualization.findOne({ key: req.session.currentVis }, (err, vis) => {
          let songArray = []
          vis.data.body.items.forEach((obj) => {
            songArray.push(obj.track.uri)
          })
          spotifyApi.addTracksToPlaylist(playlistId, songArray).then((data) => {
            req.session.notify = true
            req.session.success = 'Successfully created playlist!'

            return res.redirect('/vis/' + vis.key)
          })
        })
      }).catch((err) => {
        console.log(err)
      })
  })

  server.get('/vis/:vis', (req, res) => {
    debugger;
    Visualization.findOne({ key: req.params.vis }, (err, vis) => {
      if(err) {
        console.log('errorrr!!!')
        return app.render(req, res, '/')
      }

      req.session.currentVis = req.params.vis
      return app.render(req, res, '/see', vis.data)
    }).then(() => {
      req.session.notify = false
      req.session.success = ''
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})