import db from '../db';
import * as Sequelize from 'sequelize';
import unique from './plugins/uniqueThrough';

const definitions = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('name', val.trim());
    }
  },
  artists: unique('artists').through('songs'),
  sortName: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('sortName', val.trim());
    }
  }
};

const config = {
  scopes: {
    songIds: () => ({
      include: [{
        model: db.model('song'),
        attributes: ['id']
      }]
    }),
    populated: () => ({
      include: [{
        model: db.model('song').scope('defaultScope', 'populated')
      }]
    })
  }
};

const Album = db.define('album', definitions, config);

export default Album;
