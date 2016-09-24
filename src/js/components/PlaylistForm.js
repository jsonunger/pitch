import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.createPlaylist = this.createPlaylist.bind(this);
  }

  createPlaylist(e) {
    const { create, err, newPlaylistName } = this.props;
    e.preventDefault();
    create(newPlaylistName)
      .then(({ playlist }) => {
        browserHistory.push(`/playlists/${playlist.id}`);
      })
      .catch(err);
  }

  componentWillUnmount() {
    this.props.setName('');
  }

  render() {
    const { setName, nameTaken } = this.props;
    return (
      <div className="well">
        <form className="form-horizontal" name="playlistForm" onSubmit={this.createPlaylist}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label htmlFor="title" className="col-xs-2 control-label">Title</label>
              <div className="col-xs-10">
                <input className="form-control" name="title" type="text" required onChange={ e => setName(e.target.value) } />
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success" disabled={ nameTaken }>Create Playlist</button>
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
  newPlaylistName: PropTypes.string,
  setName: PropTypes.func,
  nameTaken: PropTypes.bool
};

export default PlaylistForm;
