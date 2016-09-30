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
  nickName: {
    type: Sequelize.STRING
  },
  facebookId: {
    type: Sequelize.STRING,
    unique: true
  }
};

const methods = {
  instanceMethods: {
    getPlaylists() {
      return db.model('playlist').findAll({ where: { userId: this.id } });
    }
  },
  classMethods: {
    findByFacebook(facebookId) {
      return this.findOne({ where: { facebookId } });
    }
  }
};

export default db.define('user', definitions, methods);
