import db from '../db';
import * as Sequelize from 'sequelize';

const definitions = {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING,
    unique: true
  },
  googleId: {
    type: Sequelize.STRING,
    unique: true
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
};

const methods = {
  classMethods: {
    findByProvider(provider, profileId) {
      return this.findOne({ where: { [`${provider}Id`]: profileId } });
    },
    findByEmail(email) {
      return this.findOne({ where: { email } });
    }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('playlist')
      }]
    })
  }
};

export default db.define('user', definitions, methods);
