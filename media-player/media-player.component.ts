import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Medium } from './../../models/media.model';
import { MediaPlayerService } from './media-player.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
})
export class MediaPlayerComponent implements OnInit, AfterViewInit {
  constructor(readonly service: MediaPlayerService) {}

  videoPlayer: HTMLVideoElement;
  videoContainer: HTMLDivElement;
  imagePlayer: HTMLImageElement;
  originalVideoHeight: number;

  @ViewChild('videoPlayer') videoElement: ElementRef;
  @ViewChild('videoContainer') videoContainerElement: ElementRef;
  @ViewChild('imagePlayer') imageElement: ElementRef;

  hideImage: boolean;

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.resizeVideo();
  // }

  ngAfterViewInit(): void {
    this.videoPlayer = this.videoElement.nativeElement;
    this.videoContainer = this.videoContainerElement.nativeElement;
    this.imagePlayer = this.imageElement.nativeElement;
    console.log('Starting mediaplyer');

    this.resizeVideo(); // TODO: find a way how to resize video in every load
    this.hideImage = true;
    this.videoContainer.hidden = true;

    this.service.mediaChange$.subscribe((media: Medium) => {
      if (media.isVideo) {
        this.videoPlayer.src = media.url;
        this.hideImage = true;
        this.videoContainer.hidden = false;
        this.videoPlayer.play();
      } else {
        this.videoContainer.hidden = true;
        this.hideImage = false;
        this.imagePlayer.src = media.url;
      }
    });

    this.service.initialize();
  }

  /**
   * Adjust video height to fit window
   */
  private resizeVideo(): void {
    const containerHeight = this.videoContainerElement.nativeElement.offsetHeight;
    const conteinerWidth = this.videoContainerElement.nativeElement.offsetWidth;
    const videoHeight = this.videoElement.nativeElement.offsetHeight;

    console.log(containerHeight, conteinerWidth);
    this.videoPlayer.height = containerHeight;

    // if (containerHeight < videoHeight || containerHeight < this.originalVideoHeight) {
    //   if (!this.originalVideoHeight) {
    //     this.originalVideoHeight = videoHeight;
    //   }
    //   this.videoPlayer.height = containerHeight;
    // } else if (this.originalVideoHeight) {
    //   this.videoPlayer.height = this.originalVideoHeight;
    // } else {
    //   this.videoPlayer.height = containerHeight;
    // }
  }

  videoEnded() {
    console.log('Video ended');
    // this.videoPlayer.pause();
    // this.videoPlayer.hidden = true;
    this.service.videoEnded$.emit();
  }

  canPlay() {
    // console.log('video can be played');
    // this.videoPlayer.play();
    // this.videoPlayer.hidden = false;
    // this.videoContainerElement.nativeElement.hide = false;
  }

  isPlaying() {
    // console.log('video is playing');
  }

  loadStarted() {
    // console.log('video load started');
  }

  onTimeUpdate() {
    // console.log(`Time updated ${this.videoPlayer.currentTime}/${this.videoPlayer.duration}`);
    // this should stop video before end and load next video, without visible blink, but it does not work (┬┬﹏┬┬)
    // if (this.videoPlayer.duration - this.videoPlayer.currentTime < 0.5) {
    //   this.videoPlayer.pause();
    //   this.service.videoEnded$.emit();
    // }
  }

  ngOnInit(): void {}
}
