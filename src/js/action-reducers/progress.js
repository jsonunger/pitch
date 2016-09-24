const SET_PROGRESS = 'SET_PROGRESS';

export const setProgress = progress => ({ type: SET_PROGRESS, progress });

export default function currentProgress (state = 0, action) {
  switch (action.type) {
    case SET_PROGRESS:
      return action.progress;
    default:
      return state;
  }
}
