let env;
if (process.env.NODE_ENV === 'production') {
  env = require('./production').default;
} else {
  env = require('./development').default;
}

const { DATABASE_URI, FACEBOOK, GOOGLE } = env;

FACEBOOK.profileFields = ['id', 'displayName', 'photos', 'emails'];

export default env;

export { DATABASE_URI, FACEBOOK, GOOGLE };
