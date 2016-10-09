import React, { PropTypes } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import '../../scss/songList';

const SongList = ({ songs, removeSong, playlist, playSong, currentSong, currentList, album, user, artist, listType }) => {
  let current;
  if (playlist.id) current = playlist;
  else if (album.id) current = album;
  else if (artist.id) current = artist;
  let isActiveList = currentList.listType === listType && currentList.id === current.id;
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Artists</th>
          <th>Genre</th>
          {listType === 'playlist' && <th></th>}
        </tr>
      </thead>
      <tbody id="songList">
        {songs.map((song, i) => (
          <tr onDoubleClick={() => playSong(song, current, listType)} className={ song.id === currentSong.id && isActiveList ? 'active' : '' } key={song.id}>
            <td>{song.name}</td>
            <td>
              {
                song.artists.map((art, idx) => `${art.name}${ idx === song.artists.length - 1 ? '' : ', ' }`)
              }
            </td>
            <td>{ song.genre }</td>
            {listType === 'playlist' && <td>
              <Button bsSize="xsmall" onClick={ () => removeSong(playlist.id, song.id, user.id) }>
                <Glyphicon glyph="remove" />
              </Button>
            </td>}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeSong: PropTypes.func,
  playlist: PropTypes.object,
  playSong: PropTypes.func.isRequired,
  currentSong: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired,
  album: PropTypes.object,
  user: PropTypes.object,
  artist: PropTypes.object,
  listType: PropTypes.string
};

export default SongList;
