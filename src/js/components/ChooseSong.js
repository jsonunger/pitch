import React, { Component, PropTypes } from 'react';
import { sortByName } from '../utils/convert';

class ChooseSong extends Component {
  static propTypes = {
    addSong: PropTypes.func.isRequired,
    playlist: PropTypes.object.isRequired,
    selectedSong: PropTypes.string,
    setSelectedSong: PropTypes.func.isRequired,
    songs: PropTypes.arrayOf(PropTypes.object).isRequired,
    songExists: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit (e) {
    const { addSong, playlist, selectedSong } = this.props;
    e.preventDefault();
    addSong(playlist.id, selectedSong);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playlist !== nextProps.playlist && this.props.selectedSong) {
      this.props.setSelectedSong('');
    }
  }

  render() {
    const { selectedSong, songs, songExists, setSelectedSong } = this.props;
    sortByName(songs);
    return (
      <div className="well">
        <form className="form-horizontal" name="songSelect" onSubmit={ this.submit }>
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select className="form-control" name="song" required value={ selectedSong } onChange={ e => setSelectedSong(e.target.value) }>
                  <option></option>
                  { songs.map(song => <option value={song.id} key={song.id}>{song.name} - {song.artists.map(a => a.name).join(', ')}</option>) }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ songExists || !selectedSong }>Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default ChooseSong;
