const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
const PLAY_MUSIC = 'PLAY_MUSIC';
const PAUSE_MUSIC = 'PAUSE_MUSIC';

export const togglePlaying = () => ({ type: TOGGLE_PLAYING });
export const playMusic = () => ({ type: PLAY_MUSIC });
export const pauseMusic = () => ({ type: PAUSE_MUSIC });

export default function reducer (state = false, action) {
  switch (action.type) {
    case TOGGLE_PLAYING:
      return !state;
    case PLAY_MUSIC:
      return true;
    case PAUSE_MUSIC:
      return false;
    default:
      return state;
  }
}
