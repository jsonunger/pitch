import React, { Component, PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import { sortByName } from '../utils/helpers';

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
      <Well>
        <Form horizontal name="songSelect" onSubmit={this.submit}>
          <fieldset>
            <legend>Add to Playlist</legend>
            <FormGroup controlId={'song'}>
              <ControlLabel className="col-xs-2">Song</ControlLabel>
              <Col xs={10}>
                <FormControl componentClass={'select'} required value={ song } onChange={ e => this.setState({ song: e.target.value }) }>
                  <option></option>
                  { songs.map(s => <option value={s.id} key={s.id}>{s.name} - {s.artists.map(a => a.name).join(', ')}</option>) }
                </FormControl>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col xs={10} xsOffset={2}>
                <Button type={'submit'} bsStyle={'success'} disabled={ songExists(playlist.songs, song) || !song }>
                  Add Song
                </Button>
              </Col>
            </FormGroup>
          </fieldset>
        </Form>
      </Well>
    );
  }
}

export default ChooseSong;
