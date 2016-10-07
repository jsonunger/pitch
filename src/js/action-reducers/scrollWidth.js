const SET_SCROLL_WIDTH = 'SET_SCROLL_WIDTH';

export const setScrollWidth = scrollWidth => ({ type: SET_SCROLL_WIDTH, scrollWidth });

export default function reducer (state = 0, action) {
  switch (action.type) {
    case SET_SCROLL_WIDTH:
      return action.scrollWidth;
    default:
      return state;
  }
}
