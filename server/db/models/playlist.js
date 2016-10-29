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
  instanceMethods: {
    addAndReturnSong(songId) {
      songId = String(songId);
      const addToList = this.addSong(songId);
      const songFromDb = db.model('song').scope('defaultScope', 'populated').findById(songId);
      return Sequelize.Promise.all([addToList, songFromDb])
      .spread((result, song) => song);
    },
    removeSong(songId) {
      songId = String(songId);
      return this.removeSong(songId);
    }
  },
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('song').scope('defaultScope', 'populated')
      }]
    })
  }
};

const Playlist = db.define('playlist', definitions, config);

export default Playlist;
