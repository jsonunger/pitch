import React, { PropTypes } from 'react';
import '../../scss/songList';

const SongList = ({ songs, removeSong, playlist, inPlaylist, playSong, currentSong, currentList }) => {
  if (songs.every(song => song.playlistSong)) {
    songs.sort((a, b) => new Date(a.playlistSong.createdAt) - new Date(b.playlistSong.createdAt));
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Artists</th>
          <th>Genres</th>
          {inPlaylist && <th></th>}
        </tr>
      </thead>
      <tbody id="songList">
        {songs.map((song, i) => (
          <tr onDoubleClick={() => playSong(song, songs)} className={ song.id === currentSong.id && songs == currentList ? 'active' : '' } key={song.id}>
            <td>{song.name}</td>
            <td>
              {
                song.artists.map((artist, idx) => <span key={i}>{ artist.name }{ idx === song.artists.length - 1 ? '' : ', ' }</span>)
              }
            </td>
            <td>{ song.genres.join(', ') }</td>
            {inPlaylist && <td>
              <button className="btn btn-default btn-xs" onClick={ () => removeSong(playlist.id, song.id) }>
                <span className="glyphicon glyphicon-remove"></span>
              </button>
            </td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  inPlaylist: PropTypes.bool,
  removeSong: PropTypes.func,
  playlist: PropTypes.object,
  playSong: PropTypes.func,
  currentSong: PropTypes.object,
  currentList: PropTypes.arrayOf(PropTypes.object)
};

export default SongList;
