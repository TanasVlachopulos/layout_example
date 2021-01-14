import { EventEmitter, Injectable } from '@angular/core';
import { Medium } from './../../models/media.model';
import { PlaylistService } from './../../services/playlist.service';

@Injectable()
export class MediaPlayerService {
  public mediaChange$ = new EventEmitter<Medium>();
  public videoEnded$ = new EventEmitter();

  private media: Medium[] = [];
  private mediaIndex = 0;
  private timer;

  constructor(private readonly playlistService: PlaylistService) {}

  initialize() {
    this.playlistService.media$.subscribe((media) => {
      this.media = media;

      if (this.media.length > 0) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.mediaIndex = 0;
        this.nextMedia();
      }
    });
    this.playlistService.initialize().then((playlist) => console.log(`Playlist with ID '${playlist.id}' initialized.`));

    this.videoEnded$.subscribe(() => this.nextMedia());
  }

  private rewindMedia() {
    this.mediaIndex = this.mediaIndex >= this.media.length - 1 ? 0 : this.mediaIndex + 1;
  }

  private nextMedia() {
    this.mediaChange$.emit(this.media[this.mediaIndex]);

    if (!this.media[this.mediaIndex].isVideo) {
      console.log('setting next image');
      this.timer = setTimeout(() => {
        console.log('rewinding media');
        this.rewindMedia();
        this.nextMedia();
      }, 6000);
    } else {
      console.log('setting next video');
      this.rewindMedia();
    }
  }
}
