const SET_SELECTED_SONG = 'SET_SELECTED_SONG';

export const setSelectedSong = songId => ({
  type: SET_SELECTED_SONG,
  songId
});

export default function selectedSong (state = '', action) {
  switch (action.type) {
    case SET_SELECTED_SONG:
      return action.songId;
    default:
      return state;
  }
}
