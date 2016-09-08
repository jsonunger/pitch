import { pauseMusic, playMusic } from './isPlaying';
import { setCurrentList } from './currentList';
import { setCurrentSong } from './currentSong';

const mod = (num, m) => ((num % m) + m) % m;

export const start = (song, list) => (dispatch, getState) => {
  dispatch(pauseMusic());
  if (!list.length) return;
  dispatch(setCurrentSong(song));
  if (getState().currentList !== list) dispatch(setCurrentList(list));
  dispatch(playMusic());
};

export const next = () => (dispatch, getState) => {
  const {currentList, currentSong } = getState();
  let idx = currentList.indexOf(currentSong);
  idx = mod(idx + 1, currentList.length);
  dispatch(start(currentList[idx], currentList));
};

export const previous = () => (dispatch, getState) => {
  const {currentList, currentSong } = getState();
  let idx = currentList.indexOf(currentSong);
  idx = mod(idx - 1, currentList.length);
  dispatch(start(currentList[idx], currentList));
};
