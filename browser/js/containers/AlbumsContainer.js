import { connect } from 'react-redux';
import Albums from '../components/Albums';

function mapStateToProps (state) {
  return {
    albums: state.albums
  };
}

export default connect(mapStateToProps)(Albums);
