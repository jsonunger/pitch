import db from '../db';
import * as Sequelize from 'sequelize';

const definitions = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('name', val.trim());
    }
  },
  genre: {
    type: Sequelize.STRING
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  trackNum: {
    type: Sequelize.INTEGER
  },
  sortName: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('sortName', val.trim());
    }
  }
};

const config = {
  defaultScope: {
    attributes: {
      include: ['albumId']
    }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('artist')
      }, {
        model: db.model('album'),
        attributes: ['name']
      }]
    })
  },
  instanceMethods: {
    toJSON() {
      const plain = this.get({ plain: true });
      delete plain.url;
      return plain;
    }
  }
};

const Song = db.define('song', definitions, config);

export default Song;
