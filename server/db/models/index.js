'use strict';
import Playlist from './playlist';
import Artist from './artist';
import Album from './album';
import Song from './song';
import User from './user';

Song.belongsTo(Album);
Album.hasMany(Song);
Album.belongsTo(Artist);

Artist.belongsToMany(Song, { through: 'artistSong' });
Song.belongsToMany(Artist, { through: 'artistSong' });

Song.belongsToMany(Playlist, { through: 'playlistSong' });
Playlist.belongsToMany(Song, { through: 'playlistSong' });

User.hasMany(Playlist);
Playlist.belongsTo(User);

export { Playlist, Artist, Album, Song, User };
