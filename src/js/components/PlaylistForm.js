import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

function isNameTaken (name, playlists) {
  return playlists.some(play => play.name === name);
}

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  createPlaylist(e) {
    const { create, err, user } = this.props;
    e.preventDefault();
    create(this.state.name, user.id)
      .then(({ playlist }) => {
        browserHistory.push(`/playlists/${playlist.id}`);
      })
      .catch(err);
  }

  render() {
    return (
      <div className="well">
        <form className="form-horizontal" name="playlistForm" onSubmit={this.createPlaylist}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label htmlFor="title" className="col-xs-2 control-label">Title</label>
              <div className="col-xs-10">
                <input className="form-control" name="title" type="text" required onChange={ e => this.setState({ name: e.target.value || '' }) } />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ isNameTaken(this.state.name, this.props.playlists) || !this.state.name }>Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

PlaylistForm.propTypes = {
  create: PropTypes.func.isRequired,
  err: PropTypes.func.isRequired,
  user: PropTypes.object,
  playlists: PropTypes.array
};

export default PlaylistForm;
