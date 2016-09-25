import db from '../db';
import * as DataTypes from 'sequelize';

const definitions = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  extension: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  buffer: {
    type: DataTypes.BLOB,
    allowNull: false
  }
};

const config = {
  defaultScope: {
    attributes: {
      include: ['albumId'],
      exclude: ['buffer']
    },
    include: [{
      model: db.model('artist')
    }]
  }
};

const Song = db.define('song', definitions, config);

export default Song;

