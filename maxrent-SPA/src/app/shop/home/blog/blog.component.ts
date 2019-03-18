import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   // Slick slider config
  // tslint:disable-next-line:member-ordering
  public blogSlideConfig: any = {
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

  // Blog
  // tslint:disable-next-line:member-ordering
  public blog = [{
      image: 'assets/images/marijuana/blog/1.jpg',
      date: '25 January 2018',
      title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
      by: 'John Dio'
    }, {
      image: 'assets/images/marijuana/blog/2.jpg',
      date: '26 January 2018',
      title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
      by: 'John Dio'
    }, {
      image: 'assets/images/marijuana/blog/3.jpg',
      date: '27 January 2018',
      title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
      by: 'John Dio'
    }];

}
