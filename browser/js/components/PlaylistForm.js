import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

function isNameTaken(name, playlists) {
  return playlists.some(play => play.name === name);
}

export default class PlaylistForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      serverError: '',
      playlistName: '',
      nameTaken: false,
      playlists: []
    };

    this.createPlaylist = this.createPlaylist.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => {
        this.setState({ playlists });
      });
  }

  createPlaylist(e) {
    e.preventDefault();
    const newPlaylist = {
      name: this.state.playlistName
    };

    axios.post('/api/playlists', newPlaylist)
      .then(res => res.data)
      .then(playlist => {
        browserHistory.push(`/playlists/${ playlist.id }`);
      })
      .catch(err => {
        this.setState({ serverError: err.message || 'Something went wrong!' });
      });
  }

  handleChange(e) {
    const playlistName = e.target.value,
    nameTaken = isNameTaken(playlistName, this.state.playlists),
    serverError = '';

    this.setState({ playlistName, nameTaken, serverError });
  }

  render() {
    return (
      <div className="well">
        <form className="form-horizontal" name="playlistForm" onSubmit={this.createPlaylist}>
          <fieldset>
            <legend>New Playlist</legend>
            { this.state.serverError && <div className="alert alert-danger">{ this.state.serverError }</div> }
            <div className="form-group">
              <label htmlFor="title" className="col-xs-2 control-label">Title</label>
              <div className="col-xs-10">
                <input className="form-control" name="title" type="text" required onChange={ this.handleChange } />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ this.state.nameTaken }>Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
