const SET_CURRENT_LIST = 'SET_CURRENT_LIST';

export const setCurrentList = list => ({ type: SET_CURRENT_LIST, list });

export default function currentList (state = [], action) {
  switch (action.type) {
    case SET_CURRENT_LIST:
      return action.list || [];
    default:
      return state;
  }
}
