const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

export const setCurrentSong = song => ({ type: SET_CURRENT_SONG, song });

export default function currentSong (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return action.song || {};
    default:
      return state;
  }
}
