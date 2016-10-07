const SET_CURRENT_LIST = 'SET_CURRENT_LIST';
const CLEAR_CURRENT_LIST = 'CLEAR_CURRENT_LIST';

export const setCurrentList = (songs, id, listType) => ({
  type: SET_CURRENT_LIST,
  songs,
  id,
  listType
});

export const clearCurrentList = () => ({
  type: CLEAR_CURRENT_LIST
});

const initialState = { songs: [] };

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LIST:
      return {
        ...state,
        songs: action.songs,
        id: action.id,
        listType: action.listType
      };
    case CLEAR_CURRENT_LIST:
      return initialState;
    default:
      return state;
  }
}
