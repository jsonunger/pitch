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
  sortName: {
    type: Sequelize.STRING,
    set(val) {
      this.setDataValue('sortName', val.trim());
    }
  }
};

const config = {
  instanceMethods: {
    getAlbums() {
      return db.model('album').findAll({
        include: [{
          model: db.model('song'),
          include: [{
            model: db.model('artist'),
            where: { id: this.id }
          }]
        }]
      });
    }
  }
};

const Artist = db.define('artist', definitions, config);

export default Artist;
