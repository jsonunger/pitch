export const convertAlbum = (album) => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  return album;
};

export const convertSong = song => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};
