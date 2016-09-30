export default {
  DATABASE_URI: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  FACEBOOK: {
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  }
};
