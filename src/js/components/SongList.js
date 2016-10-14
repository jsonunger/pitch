import React, { Component, PropTypes } from 'react';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from './Glyphicon';
import '../../scss/songList';

class SongList extends Component {
  static propTypes = {
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeSong: PropTypes.func,
    playlist: PropTypes.object,
    playSong: PropTypes.func.isRequired,
    currentSong: PropTypes.object.isRequired,
    currentList: PropTypes.object.isRequired,
    album: PropTypes.object,
    user: PropTypes.object,
    artist: PropTypes.object,
    listType: PropTypes.string,
    isPlaying: PropTypes.bool,
    toggleSong: PropTypes.func,
    goTo: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      songId: null
    };
  }

  render() {
    const { songs, removeSong, playlist, playSong, currentSong, currentList, album, user, artist, isPlaying, listType, toggleSong, goTo } = this.props;

    let current;
    if (playlist.id) current = playlist;
    else if (album.id) current = album;
    else if (artist.id) current = artist;
    let isActiveList = currentList.listType === listType && currentList.id === current.id;
    return (
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            {!artist.id && <th>Album</th>}
            <th>Genre</th>
            {listType === 'playlist' && <th></th>}
          </tr>
        </thead>
        <tbody id="songList">
          {songs.map(song => {
            const isCurrentSong = song.id === currentSong.id && isActiveList;
            const isSelectedSong = song.id === this.state.songId;
            let glyph;
            if (!isCurrentSong || (isCurrentSong && !isPlaying)) glyph = 'play';
            else if (isSelectedSong && isPlaying) glyph = 'pause';
            else if (isPlaying) glyph = 'volume-up';

            const style = (glyph === 'volume-up') ? { opacity: 1 } : {};
            return (
              <tr onDoubleClick={() => playSong(song, current, listType)} className={ isCurrentSong ? 'active' : '' } key={song.id}>
                <td className="audio btn-td">
                  <Button
                    className="btn-circle"
                    style={style}
                    onMouseEnter={() => this.setState({songId: song.id})}
                    onMouseLeave={() => this.setState({songId: null})}
                    onClick={() => {
                      if (!isCurrentSong) {
                        return playSong(song, current, listType);
                      } else {
                        return toggleSong();
                      }
                    }}
                    >
                    <Glyphicon glyph={glyph} />
                  </Button>
                </td>
                <td>{song.name}</td>
                <td>
                  {
                    song.artists.map((art, idx) => `${art.name}${ idx === song.artists.length - 1 ? '' : ', ' }`)
                  }
                </td>
                {!artist.id && <td>{song.album.name}</td>}
                <td>{ song.genre }</td>
                <td className="btn-td">
                  <Dropdown pullRight id={`dropdown-${song.id}`}>
                    <Dropdown.Toggle noCaret>
                      <Glyphicon glyph="ellipsis-v" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {!artist.id && <MenuItem onClick={() => goTo(`/artists/${song.artists[0].id}`)}>Go to Artist</MenuItem>}
                      {!album.id && <MenuItem onClick={() => goTo(`/albums/${song.albumId}`)}>Go to Album</MenuItem>}
                      <MenuItem divider />
                      <MenuItem onClick={() => removeSong(playlist.id, song.id, user.id)}>Remove Song</MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default SongList;
