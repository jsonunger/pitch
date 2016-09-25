'use strict';
import Playlist from './playlist';
import Artist from './artist';
import Album from './album';
import Song from './song';

Song.belongsTo(Album);
Album.hasMany(Song);

Artist.belongsToMany(Song, { through: 'artistSong' });
Song.belongsToMany(Artist, { through: 'artistSong' });

Song.belongsToMany(Playlist, { through: 'playlistSong' });
Playlist.belongsToMany(Song, { through: 'playlistSong' });

export { Playlist, Artist, Album, Song };
