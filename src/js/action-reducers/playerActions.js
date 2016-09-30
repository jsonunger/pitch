import { pauseMusic, playMusic } from './isPlaying';
import { setCurrentList } from './currentList';
import { setCurrentSong } from './currentSong';

const mod = (num, m) => ((num % m) + m) % m;

export const start = (song, list, listType) => (dispatch, getState) => {
  dispatch(pauseMusic());
  if (!list.songs.length) return;
  dispatch(setCurrentSong(song));
  if (getState().currentList.id !== list.id) dispatch(setCurrentList(list.songs, list.id, listType));
  dispatch(playMusic());
};

export const next = () => (dispatch, getState) => {
  const {currentList, currentSong } = getState();
  const songs = currentList.songs;
  let idx = songs.indexOf(currentSong);
  idx = mod(idx + 1, songs.length);
  dispatch(start(songs[idx], currentList, currentList.listType));
};

export const previous = () => (dispatch, getState) => {
  const {currentList, currentSong } = getState();
  const songs = currentList.songs;
  let idx = songs.indexOf(currentSong);
  idx = mod(idx - 1, songs.length);
  dispatch(start(songs[idx], currentList, currentList.listType));
};
