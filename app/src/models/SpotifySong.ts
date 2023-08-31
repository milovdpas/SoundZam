export default class SoundCloudSong {
  url: string;
  title: string;
  artist: string;
  image: string;

  constructor(url: string, title: string, artist: string, image: string) {
    this.url = url;
    this.title = title;
    this.artist = artist;
    this.image = image;
  }
}
