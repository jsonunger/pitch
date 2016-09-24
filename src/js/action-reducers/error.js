/** ACTION TYPES */
const REQUEST_FAILED = 'REQUEST_FAILED';
const RECOVERED = 'RECOVERED';

/** SYNC ACTION CREATORS */
export const failed = error => ({
  type: REQUEST_FAILED,
  error
});
export const recovered = () => ({
  type: RECOVERED
});

/** ASYNC ACTION CREATORS */
export const requestFailed = (err) => (dispatch) => {
  dispatch(failed(err));
};

/** REDUCER */
export default function error (state = {}, action) {
  switch (action.type) {
    case REQUEST_FAILED:
      return action.error;
    case RECOVERED:
      return {};
    default:
      return state;
  }
}
