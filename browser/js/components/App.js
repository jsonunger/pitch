import React, { Component, PropTypes } from 'react';
import Sidebar from './Sidebar';
import Player from './Player';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="col-xs-2">
          <Sidebar {...this.props.params} />
        </div>
        <div className="col-xs-10">
          { this.props.children }
        </div>
        <footer>
          <Player />
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
