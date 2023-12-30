$.each($('.responsive4'), function (key, slider_item){
  const slider = $(slider_item)
  const count4 = slider.data('count');
  slider.slick({
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    rtl: true,
    arrows: false,
    dots: count4 > 6,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: count4 > 5,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: count4 > 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: count4 > 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        }
      },
    ]
  })
})

$('img').loadScroll(500);
$('body').removeClass('invisible');