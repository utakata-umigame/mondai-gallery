var passport = require('passport');
var db = require('./mongo');
var crypto = require('crypto');
var LocalStrategy = require('passport-local').Strategy;
passport.use(
  new LocalStrategy(function(username, password, done) {
    db.User.findOne({username: username}, function (err, doc) {
      if (err) {
        return done(null, false);
      }
      if (doc) {
        //ハッシュ値を計算して照合
        var shasum = crypto.createHash('sha1');
        shasum.update(password);
        var hash = shasum.digest('hex');
        if (doc.password === hash) {
          return done(null, {username: username, nickname: doc.nickname});
        } else {
          // パスワード不一致
          return done(null, false);
        }
      } else {
        // ユーザーネームが存在しない
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});
passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});
module.exports = passport;
