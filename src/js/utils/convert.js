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
