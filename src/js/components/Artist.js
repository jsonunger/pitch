import React, { Component, PropTypes } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class Artist extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    fetchArtist: PropTypes.func.isRequired,
    unset: PropTypes.func.isRequired,
    artist: PropTypes.object.isRequired,
    goTo: PropTypes.func,
    routes: PropTypes.array
  }

  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.routes[3].path || 'album'
    };
    this.go = this.go.bind(this);
  }

  componentDidMount() {
    const { fetchArtist, params } = this.props;
    fetchArtist(params.artistId);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchArtist, params } = nextProps;
    fetchArtist(params.artistId);
  }

  componentWillUnmount() {
    this.props.unset();
  }

  go(evt) {
    const { artist: { id }, goTo } = this.props;
    const activeKey = evt.target.title;
    this.setState({ activeKey });
    return goTo(id, activeKey);
  }

  render() {
    const { artist, children } = this.props;
    return (
      <div>
        <h3>{ artist.name }</h3>
        <Nav bsStyle="tabs" activeKey={this.state.activeKey}>
          <NavItem eventKey={'albums'} title={'albums'} onClick={this.go}>ALBUMS</NavItem>
          <NavItem eventKey={'songs'} title={'songs'} onClick={this.go}>SONGS</NavItem>
        </Nav>
        { children }
      </div>
    );
  }
}

export default Artist;
