import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  img = '';

  imageDefault = './assets/images/default.png';
  //counter = 0;
  //counterFn: number | undefined;
  @Input() set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img => ', this.img);
    // code
  }
  @Input() alt = '';

  @Output() loaded = new EventEmitter<string>();

  // before render
  // dont run async things
  // run once time
  constructor() {
    //console.log('constructor', 'imgValue =>', this.img);
  }

  //before  and during render
  // show inputs changes
  // run many times as changes produce
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', 'imgValue =>', this.img);
    console.log('ngOnChanges', 'valueChanges =>', changes);

  }


  //before render
  // we can put async - fetch things 
  // run once time
  ngOnInit(): void {
    console.log('ngOnInit', 'imgValue =>', this.img);
    /*this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('runing counter');
    }, 1000)*/
  }

  // after reder
  // handler children
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }


  // delete Component - cuando el componente desaparece de pantalla

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    //window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }
  imageLoaded() {
    console.log('LOG HIJO');
    this.loaded.emit('Esto va del hijo al padre');
  }
}
