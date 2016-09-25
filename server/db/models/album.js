import db from '../db';
import * as DataTypes from 'sequelize';
import addArtistList from './plugins/addArtistList';

const definitions = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  cover: {
    type: DataTypes.BLOB
  },
  coverType: {
    type: DataTypes.STRING
  },
  artists: {
    type: DataTypes.VIRTUAL
  }
};

const config = {
  defaultScope: {
    attributes: { exclude: ['cover', 'coverType'] }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('song')
      }]
    })
  },
  instanceMethods: {
    addArtistList: addArtistList
  },
  hooks: {
    afterFind: function (queryResult) {
      if (!queryResult) return;
      if (!Array.isArray(queryResult)) queryResult = [queryResult];
      queryResult.forEach(item => item.addArtistList());
    }
  }
};

const Album = db.define('album', definitions, config);

export default Album;
