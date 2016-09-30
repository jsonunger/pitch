import React, { Component, PropTypes } from 'react';
import ArtistList from './ArtistList';

class Artists extends Component {
  static propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
    setFilter: PropTypes.func.isRequired,
    unsetFilter: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.unsetFilter();
  }

  render() {
    const { setFilter, artists } = this.props;
    return (
      <div>
        <h3>Artists</h3>
        <div className="panel input-group">
          <span className="input-group-addon">Filter</span>
          <input type="text" className="form-control" placeholder="by name" onChange={e => setFilter(e.target.value)} />
        </div>
        <ArtistList artists={artists} />
      </div>
    );
  }
}

export default Artists;
