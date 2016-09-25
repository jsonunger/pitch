import db from '../db';
import * as DataTypes from 'sequelize';
import addArtistList from './plugins/addArtistList';

const definitions = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('name', val.trim());
    }
  },
  artists: {
    type: DataTypes.VIRTUAL
  }
};

const config = {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('song'),
        include: [{
          model: db.model('artist'),
        }]
      }]
    })
  },
  instanceMethods: {
    addArtistList: addArtistList,
    addAndReturnSong(songId) { // `addSong` doesn't promise a song.
      songId = String(songId);
      const addedToList = this.addSong(songId);
      const songFromDb = db.model('song').findById(songId);
      return DataTypes.Promise.all([addedToList, songFromDb])
      .spread((result, song) => song);
    },
    removeSong(songId) {
      songId = String(songId);
      return this.removeSong(songId);
    }
  },
  hooks: { // automatically adds an artist list if we have songs
    afterFind(queryResult) {
      if (!queryResult) return;
      if (!Array.isArray(queryResult)) queryResult = [queryResult];
      queryResult.forEach(item => item.addArtistList());
    }
  }
};

const Playlist = db.define('playlist', definitions, config);

export default Playlist;
