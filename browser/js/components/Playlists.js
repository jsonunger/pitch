import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

export default class Playlists extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
    axios.get('/api/playlists')
      .then(res => {
        this.setState({
          playlists: res.data
        });
      });
  }

  deletePlaylist(id, idx) {
    axios.delete(`/api/playlists/${id}`)
      .then(res => res.data)
      .then(() => {
        let playlists = this.state.playlists;
        this.setState({
          playlists: [...playlists.slice(0, idx), ...playlists.slice(idx + 1)]
        });

        if (String(id) === this.props.current) {
          browserHistory.push('/albums');
        }
      });
  }

  render() {
    return (
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        {this.state.playlists.map((playlist, i) =>
          <p key={playlist.id} className="menu-item">
            <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            <button className="btn btn-default btn-xs" onClick={ () => this.deletePlaylist(playlist.id, i) }>
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </p>
        )}
        <p>
          <Link to="/playlists/new" className="btn btn-primary btn-block"><span className="glyphicon glyphicon-plus"></span> PLAYLIST</Link>
        </p>
      </section>
    );
  }
}
