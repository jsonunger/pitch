const SET_NEW_PLAYLIST_NAME = 'SET_NEW_PLAYLIST_NAME';

export const setNewPlaylistName = (name) => ({
  type: SET_NEW_PLAYLIST_NAME,
  name
});

export default function newPlaylistName (state = '', action) {
  switch (action.type) {
    case SET_NEW_PLAYLIST_NAME:
      return action.name;
    default:
      return state;
  }
}
