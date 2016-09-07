const SET_FILTER = 'SET_FILTER';

export const setFilter = filter => ({
  type: SET_FILTER,
  filter
});

export default function filter (state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}
