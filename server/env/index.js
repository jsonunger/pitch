import devConfig from './development';
import prodConfig from './production';

let env;
if (process.env.NODE_ENV === 'production') {
  env = prodConfig;
} else {
  env = devConfig;
}

const { DATABASE_URI, FACEBOOK } = env;

FACEBOOK.profileFields = ['id', 'displayName', 'photos', 'emails'];

export default env;

export { DATABASE_URI, FACEBOOK };
