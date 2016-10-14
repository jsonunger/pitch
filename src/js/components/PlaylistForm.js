import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import { createPlaylist } from '../action-reducers/playlists';
import Glyphicon from './Glyphicon';

function isNameTaken (name, playlists) {
  return playlists.some(play => play.name === name);
}

class PlaylistForm extends Component {
  static propTypes = {
    user: PropTypes.object,
    playlists: PropTypes.array,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      modal: false
    };
    this.createPlaylist = this.createPlaylist.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  createPlaylist(e) {
    const { dispatch, user } = this.props;
    e.preventDefault();
    dispatch(createPlaylist(user.id, this.state.name))
    .then(this.closeModal);
  }

  openModal() {
    this.setState({ modal: true });
  }

  closeModal() {
    this.setState({ modal: false, name: '' });
  }

  render() {
    const isDisabled = isNameTaken(this.state.name, this.props.playlists) || !this.state.name;
    return (
      <div>
        <Button onClick={this.openModal} bsStyle="primary" block className="btn-section ellipsis">
          <Glyphicon glyph="plus" /> PLAYLIST
        </Button>
        <Modal show={this.state.modal} onHide={this.closeModal} keyboard={false}>
          <Modal.Header>
            <Modal.Title>Create New Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal name="playlistForm" onSubmit={this.createPlaylist}>
              <fieldset>
                <FormGroup controlId="title">
                  <ControlLabel className="col-xs-2">Title</ControlLabel>
                  <Col xs={10} sm={9}>
                    <FormControl name="title" type="text" required onChange={e => this.setState({ name: e.target.value || '' })} />
                  </Col>
                  <Button type="submit" style={{ display: 'none' }} disabled={ isDisabled }></Button>
                </FormGroup>
              </fieldset>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
            <Button type="button" bsStyle="success" disabled={ isDisabled } onClick={this.createPlaylist}>Create Playlist</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PlaylistForm;
