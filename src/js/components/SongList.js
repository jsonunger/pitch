import React, { PropTypes } from 'react';
import '../../scss/songList';

const SongList = ({ songs, removeSong, playlist, inPlaylist, playSong, currentSong, currentList, album }) => {
  const current = inPlaylist ? playlist : album;
  const listType = inPlaylist ? 'playlist' : 'album';
  let isActiveList = currentList.id === current.id;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Artists</th>
          <th>Genre</th>
          {inPlaylist && <th></th>}
        </tr>
      </thead>
      <tbody id="songList">
        {songs.map((song, i) => (
          <tr onDoubleClick={() => playSong(song, current, listType)} className={ song.id === currentSong.id && isActiveList ? 'active' : '' } key={song.id}>
            <td>{song.name}</td>
            <td>
              {
                song.artists.map((artist, idx) => <span key={i}>{ artist.name }{ idx === song.artists.length - 1 ? '' : ', ' }</span>)
              }
            </td>
            <td>{ song.genre }</td>
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
  playSong: PropTypes.func.isRequired,
  currentSong: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired,
  album: PropTypes.object
};

export default SongList;
