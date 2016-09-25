import devConfig from './development';
import prodConfig from './production';

let env;
if (process.env.NODE_ENV === 'production') {
  env = prodConfig;
} else {
  env = devConfig;
}

const { DATABASE_URI } = env;

export default env;

export { DATABASE_URI };
