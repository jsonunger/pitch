import React, { Component, PropTypes } from 'react';
import { sortByName } from '../utils/convert';

function songExists (songList, songId) {
  return songList.some(song => song.id === songId);
}

class ChooseSong extends Component {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      song: ''
    };
    this.submit = this.submit.bind(this);
  }

  submit (e) {
    const { addSong, playlist, user } = this.props;
    e.preventDefault();
    addSong(playlist.id, this.state.song, user.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ song: '' });
  }

  render() {
    const { songs, playlist } = this.props;
    const { song } = this.state;
    sortByName(songs);
    return (
      <div className="well">
        <form className="form-horizontal" name="songSelect" onSubmit={ this.submit }>
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select className="form-control" name="song" required value={ song } onChange={ e => this.setState({ song: e.target.value }) }>
                  <option></option>
                  { songs.map(s => <option value={s.id} key={s.id}>{s.name} - {s.artists.map(a => a.name).join(', ')}</option>) }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ songExists(playlist.songs, song) || !song }>Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default ChooseSong;
