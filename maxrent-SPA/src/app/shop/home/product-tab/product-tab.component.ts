import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../_models/product-models/product';
declare var $: any;


@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.scss']
})
export class ProductTabComponent implements OnInit {

  @Input() products: Product[];

  constructor() { }

  ngOnInit() {
    // tab js
    $('#tab-1').css('display', 'Block');
    $('.default').css('display', 'Block');
    $('.tabs li a').on('click', function () {
        event.preventDefault();
        $(this).parent().parent().find('li').removeClass('current');
        $(this).parent().addClass('current');
        const currunt_href = $(this).attr('href');
        $('#' + currunt_href).show();
        $(this).parent().parent().parent().parent().find('.tab-content').not('#' + currunt_href).css('display', 'none');
    });
  }

  // Slick slider config
  // tslint:disable-next-line:member-ordering
  public productSlideConfig: any = {
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 420,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
  };


}
