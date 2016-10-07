import path from 'path';
import session from 'express-session';
import passport from 'passport';
import connect from 'connect-session-sequelize';

const SequelizeStore = connect(session.Store);

const ENABLED_AUTH_STRATEGIES = [
  'facebook',
  'google',
  // 'local'
];

export default function(app, db) {
  const dbStore = new SequelizeStore({ db });

  const User = db.model('user');

  dbStore.sync();

  // Session middleware will set/read sessions from the request
  // Sessions will be stored in PostgreSQL using the same connection from Sequelize
  app.use(session({
    secret: app.getValue('env').SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false
  }));

  // Initialize passport and allow it to read the request session info
  app.use(passport.initialize());
  app.use(passport.session());

  // Cookies are just userIds encrypted with the secret
  passport.serializeUser((user, done) => done(null, user.id));

  // When we get a cookie, we use the id to set req.user
  passport.deserializeUser((id, done) => {
    User.scope('populated').findById(id)
      .then(user => done(null, user))
      .catch(done);
  });

  // Used by client to determine if a user is already logged in
  app.get('/session', (req, res, next) => {
    if (req.user) {
      res.send({ user: req.user });
    } else {
      const err = new Error('No authenticated user');
      err.status = 401;
      next(err);
    }
  });

  // Simple logout route
  app.get('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  // Register all enabled strategies
  ENABLED_AUTH_STRATEGIES.forEach(strategyName => {
    require(path.join(__dirname, strategyName))(app, db);
  });
}
