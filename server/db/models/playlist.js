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
  artists: unique('artists').through('songs')
};

const config = {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('song').scope('defaultScope', 'populated')
      }]
    })
  },
  instanceMethods: {
    addAndReturnSong(songId) { // `addSong` doesn't promise a song.
      songId = String(songId);
      const addedToList = this.addSong(songId);
      const songFromDb = db.model('song').scope('defaultScope', 'populated').findById(songId);
      return Sequelize.Promise.all([addedToList, songFromDb])
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
