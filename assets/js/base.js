let temp1 = false;

$('.hover-box').on('touchstart', function(){
  temp1 = true;
});

$('.hover-box').hover(function () {
  if (!temp1 && $(window).width() >= 992) {
    $(this).addClass('scale-up');
    $(this).next('a').addClass('scale-down1').next('a').addClass('scale-down1');
    $(this).prev('a').addClass('scale-down2').prev('a').addClass('scale-down2');
  }
  temp1 = false;
}, function () {
  $(this).removeClass('scale-up');
  $(this).next('a').removeClass('scale-down1').next('a').removeClass('scale-down1');
  $(this).prev('a').removeClass('scale-down2').prev('a').removeClass('scale-down2');
})

const spin_form = $('<span class="spinner-grow spinner-grow-sm" role="status"></span>');
let tmp_form = true;
// joinus_form
const joinus_form = $('#joinUs-form');
const joinus_form_url = joinus_form.data('url');
const joinus_form_sub = $('#news-sub');
joinus_form.on('submit', function (e){
  e.preventDefault();
  if ( !tmp_form )
      return;
  tmp_form = false;
  const data = joinus_form.serialize();
  const cont = joinus_form_sub.html();
  $.ajax({
      url: joinus_form_url,
      data: data,
      method: 'POST',
      beforeSend: function (){
        joinus_form_sub.html(spin_form.hide().fadeIn());
      },
      complete: function (){
        tmp_form = true;
        spin_form.fadeOut();
        joinus_form_sub.html(cont);
      },
      success: function (res){
        joinus_form[0].reset();
        const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      },
      error: function (err) {
        let msg;
        switch (err.status) {
          case 400:
            msg = err.responseJSON.msg;
            break;
          case 403:
            msg = 'لطفا مجدد وارد سایت شوید';
            break;
          default:
            msg = 'متاسفیم، خطای سرور';
            break;
        }
        if ( typeof(msg) == 'object' ) {
          $.each($(msg), function (k,v){
            $.each(v, function (kk,vv){
                const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${vv}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
                new bootstrap.Toast(myEl).show();
            })
          }) 
        } else if ( typeof(msg) == 'string' ) {
          const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
        }
      }
  })
})


$.each($('.responsive'), function (key, slider_item){
  const slider = $(slider_item)
  const count1 = slider.data('count');
  slider.slick({
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    rtl: true,
    arrows: false,
    dots: count1 > 6,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: count1 > 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: count1 > 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: count1 > 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: count1 > 2
        }
      },
      {
        breakpoint: 420,
        settings: {
          infinite: true,
          centerMode: true,
          centerPadding: '2rem',
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          initialSlide: Math.floor(count1 / 2),
        }
      }
    ]
  })
})


$('.responsive2').slick({
  infinite: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 3,
  rtl: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 992,
      settings: {
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    }
  ]
});

const count3 = $('.responsive3').data('count');

$('.responsive3').slick({
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  rtl: true,
  arrows: false,
  dots: count3 > 4,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: count3 > 3
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: count3 > 2
      }
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: count3 > 1
      }
    },
  ]
});

$('img').loadScroll(500);
$('body').removeClass('invisible');