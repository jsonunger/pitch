import { connect } from 'react-redux';
import Artists from '../components/Artists';

function mapStateToProps (state) {
  return {
    artists: state.artists
  };
}

export default connect(mapStateToProps)(Artists);
