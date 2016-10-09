export const convertAlbum = (album) => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  return album;
};

export const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

export const sortByName = array => array.sort((a, b) => {
  if (a.sortName < b.sortName) return -1;
  else if (a.sortName > b.sortName) return 1;
  else return 0;
});

export const findProp = (obj, path) => {
  if (typeof obj !== 'object') return;

  let props = Array.isArray(path) ? path : path.split('.');
  const propVal = obj[props.shift()];
  if (typeof propVal === 'undefined') return;

  return props.length ? findProp(propVal, props) : propVal;
};
