import React, { Component, PropTypes } from 'react';

class SongList extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      songs: props.songs || []
    };
    this.removeSong = this.removeSong.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      songs: nextProps.songs
    });
  }

  removeSong(id, idx) {
    this.props.removeSong(id, idx);
  }

  render() {
    let inPlaylist = this.props.routes.some(route => route.name === 'playlist');
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
          {this.state.songs.map((song, i) => (
            <tr key={song.id}>
              <td>{song.name}</td>
              <td>
                {
                  song.artists.map((artist, i) => <span key={i}>{ artist.name }{ i === song.artists.length - 1 ? '' : ', ' }</span>)
                }
              </td>
              <td>{ song.genres.join(', ') }</td>
              {inPlaylist && <td>
                <button className="btn btn-default btn-xs" onClick={ () => this.removeSong(song.id, i) }>
                  <span className="glyphicon glyphicon-remove"></span>
                </button>
              </td>}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  routes: PropTypes.array.isRequired
};

export default SongList;
