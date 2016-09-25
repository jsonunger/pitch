import _ from 'lodash';

export default function addArtistList () {
  if (!this.songs) return;
  const artistsById = {};
  this.songs.forEach(song => {
    song.artists.forEach(artist => {
      artistsById[artist.id] = artist;
    });
  });
  this.artists = _.valus(artistsById);
}
