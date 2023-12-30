$.each($('.responsive6'), function (key, slider_item){
  const slider = $(slider_item)
  const count6 = slider.data('count');
  slider.slick({
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    rtl: true,
    arrows: false,
    dots: count6 > 6,
    
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: count6 > 5,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: count6 > 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: true,
          dots: false
        }
      },
      {
        breakpoint: 462,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          dots: false
        }
      },
    ]
  });
});
