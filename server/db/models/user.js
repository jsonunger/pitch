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
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
};

const methods = {
  instanceMethods: {
    getPlaylists() {
      return db.model('playlist').findAll({ where: { userId: this.id } });
    },
    addPlaylist(body) {
      return db.model('playlist').create(body)
        .then(playlist => playlist.setUser(this.id));
    }
  },
  classMethods: {
    findByFacebook(facebookId) {
      return this.findOne({ where: { facebookId } });
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
