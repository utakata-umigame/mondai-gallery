'use strict';

const oauth = require('oauth');
const tumblr = require('tumblr.js');

const ck = process.env.TUMBLR_KEY,
      cs = process.env.TUMBLR_SECRET;

let   ot = '',
      os = '',
      at = '',
      as = '';

const host = process.env.HOST||'localhost';
const port = process.env.PORT||3000;

const consumer = new oauth.OAuth(
  "https://www.tumblr.com/oauth/request_token",
  "https://www.tumblr.com/oauth/access_token",
  ck,
  cs,
  "1.0A",
  'http://' + host + ':' + port + '/api/auth/callback',
  "HMAC-SHA1"
);

module.exports = {
  auth: (req, res) => {
    consumer.getOAuthRequestToken((error, oauthToken, oauthTokenSecret) => {
      if (error) {
        res.json(error);
      } else {
        ot = oauthToken,
        os = oauthTokenSecret;
        res.redirect("https://www.tumblr.com/oauth/authorize?oauth_token=" + ot);
      }
    });
  },
  callback:  (req, res) => {
    consumer.getOAuthAccessToken(ot, os, req.query.oauth_verifier, function(error, _oauthAccessToken, _oauthAccessTokenSecret) {
      if (error) {
        res.json(error);
      } else {
        at = _oauthAccessToken;
        as = _oauthAccessTokenSecret;
        res.redirect('/callback/?token=' + at + '&secret=' + as);
      }
    });
  },
  post: (req, res) => {;
    let client = tumblr.createClient({
      consumer_key: ck,
      consumer_secret: cs,
      token: req.body.token,
      token_secret: req.body.secret
    });
    client.createTextPost('otn-ninjin', {title: req.body.title, body: req.body.content}, (err, data) => {
      if (err) {
        res.status(403).send({
          'success': false,
          'message': err.message
        });
      }
      else res.json(data);
    });
  }
};
