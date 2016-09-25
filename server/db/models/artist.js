import db from '../db';
import * as DataTypes from 'sequelize';

const definitions = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  }
};

const config = {
  instanceMethods: {
    getAlbums: function () {
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
