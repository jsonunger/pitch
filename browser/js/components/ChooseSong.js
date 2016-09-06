import React, { Component } from 'react';
import axios from 'axios';

const doesSongExist = (id, songs) => songs.some(song => song.id === +id);

export default class ChooseSong extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedSong: '',
      songs: [],
      songExists: false
    };
    this.addSong = this.addSong.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addSong(e) {
    e.preventDefault();
    this.props.addSong(this.state.selectedSong);
  }

  handleChange(e) {
    let selectedSong = e.target.value;
    if (!selectedSong) return this.setState({ selectedSong });
    let songExists = doesSongExist(selectedSong, this.props.songs);
    this.setState({ selectedSong, songExists });
  }

  componentDidMount() {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({ songs });
      });
  }

  render() {
    return (
      <div className="well">
        <form className="form-horizontal" name="songSelect" onSubmit={ this.addSong }>
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select className="form-control" name="song" required value={ this.state.selectedSong } onChange={ this.handleChange }>
                  <option></option>
                  { this.state.songs.map(song => <option value={song.id} key={song.id}>{song.name}</option>) }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ this.state.songExists || !this.state.selectedSong }>Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
