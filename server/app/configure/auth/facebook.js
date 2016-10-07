import passport from 'passport';
import Strategy from 'passport-facebook';
import checkReturnTo from '../../../utils/checkReturnTo';

module.exports = (app, db) => {
  const User = db.model('user');

  const facebookConfig = app.getValue('env').FACEBOOK;

  const strategyFn = (accessToken, refreshToken, profile, done) => {
    User.findByProvider('facebook', profile.id)
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
            facebookId: profile.id
          });
        } else {
          return User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            facebookId: profile.id
          });
        }
      })
      .then(userToLogin => done(null, userToLogin))
      .catch(err => {
        console.error('Error creating user from Facebook authentication');
        done(err);
      });
  };

  passport.use(new Strategy(facebookConfig, strategyFn));

  app.get('/auth/facebook', checkReturnTo, passport.authenticate('facebook', { scope: 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successReturnToOrRedirect: '/', failureRedirect: '/' }));
};
