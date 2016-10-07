import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import checkReturnTo from '../../../utils/checkReturnTo';

module.exports = (app, db) => {
  const User = db.model('user');

  const googleConfig = app.getValue('env').GOOGLE;

  const strategyFn = (accessToken, refreshToken, profile, done) => {
    User.findByProvider('google', profile.id)
      .then(user => {
        if (user) {
          return user;
        } else {
          return User.findByEmail(profile.emails[0].value);
        }
      })
      .then(user => {
        if (user) {
          return user.update({
            googleId: profile.id
          });
        } else {
          return User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
        }
      })
      .then(userToLogin => done(null, userToLogin))
      .catch(err => {
        console.error('Error creating user from Google authentication');
        done(err);
      });
  };

  passport.use(new OAuth2Strategy(googleConfig, strategyFn));

  app.get('/auth/google', checkReturnTo, passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }));

  app.get('/auth/google/callback', passport.authenticate('google', { successReturnToOrRedirect: '/', failureRedirect: '/' }));
};
