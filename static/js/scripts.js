let cartCount;
let cartCount2;
let cartCount3Span1;
let cartCount3Span2;
let dotGreen;
let auth;
const uparr_el = $('#uparr');
$(document).ready(function () {

  window.tryParseJSONObject = function (jsonString){
    try {
        var o = JSON.parse(jsonString);

        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
  };

  const offset_top = 0;

  const t = {};
  const cart_submit_btn = $('#cartSubmitBtn');
  const cart_hr = $('#cartHR');

  cartCount = $('#cart-count');
  cartCount2 = $('#cart-count2');
  cartCount3Span1 = $('#cart-count3-span1');
  cartCount3Span2 = $('#cart-count3-span2');

  dotGreen = $('#dot-green');

  auth = cartCount2.length !== 0;

  window.setCounter1 = function () {
    const pds = tryParseJSONObject(localStorage.getItem('pds'))
    counter = pds ? Object.keys(pds).length : 0;
    cartCount.text(counter);
    if (counter < 1) {
      cartCount.addClass('d-none');
      cartCount3Span2.text('سبد خرید شما خالی است')
      cartCount3Span1.text('')
    } else {
      cartCount.removeClass('d-none');
      cartCount3Span2.text('محصول در سبد خرید شما قرار دارد');
      cartCount3Span1.text(counter);
    }
  }
  
  window.setCounter2 = function (counter) {
    cartCount2.text(counter);
  }

  window.checkVal = function (val) {
    return val.match(/^[1-9][0-9]*$/);
  }

  if (localStorage.getItem('login')) {
    const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">شما با موفقیت وارد شدید !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
    new bootstrap.Toast(myEl).show();
    localStorage.removeItem('login')
  }
  if (localStorage.getItem('logout')) {
    const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">شما با موفقیت خارج شدید !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
    new bootstrap.Toast(myEl).show();
    localStorage.removeItem('logout')
  }

  if (!auth) {
    const pds = tryParseJSONObject(localStorage.getItem('pds'))
    if ( !pds ) {
      localStorage.setItem('pds', JSON.stringify({}))
      localStorage.setItem('see', false)
    }
    setCounter1();
  } else {
    const ph1 = $('#ph1');
    const ph2 = $('#ph2');
    const ph_val_edited = phone.substring(0, 4) + '-' + phone.substring(4);
    ph1.text(ph_val_edited)
    ph2.text(ph_val_edited)
  }

  if (!localStorage.getItem('see') || localStorage.getItem('see') == 'false')
    dotGreen.addClass('d-none');
    
    
  if ($(window).width() < 768) {
    uparr_el.removeClass('end-0').addClass('start-0');
  }

  let uparr = false;
  $('body').scroll(function () {
    if ($('body').scrollTop() > 900 ) {
      if (!uparr) {
        uparr_el.removeClass('d-none');
        uparr = true;
      }
    } else {
      uparr_el.addClass('d-none');
      uparr = false;
    }
  });

  uparr_el.on('click', ()=>{
    uparr_el.addClass('d-none');
    $('body').animate({'scrollTop': offset_top}, 500, 'swing', function (){
      uparr = false;
    });
  })


  // tri
  $(document).on('click', '.tri', function () {
    $(this).toggleClass('anim-rotate');
  })

  // ripple
  $(document).on('mousedown', '.btn', function (e) {
    if ($(this).hasClass('btn')) {
      const el = $('<div></div>', {
        'class': 'ripple'
      }).attr('style', "border-radius: 50%; top: " + e.offsetY + "px; left: " + e.offsetX + "px").appendTo($(this)).delay(4000).queue(function () {
        el.remove()
      })
    }
    if ($(this).hasClass('img-clk')) {
      var src = $(e.target).attr('src');
      var alt = $(e.target).attr('alt');
      $('.mh-30 > img').attr('src', src).attr('alt', alt);
    }
  })


  const cart_modal_items = $('#cartModalItems');

  $(document).on('click', '[data-type="plus"]', function () {
    const id = $(this).data('id');
    const qinput = $(`input[data-id="${id}"`);
    const val = parseInt(qinput.val());
    qinput.val(val + 1);
    qinput.trigger('input');
  })
  $(document).on('click', '[data-type="minus"]', function (e) {
    const id = $(this).data('id');
    const qinput = $(`input[data-id="${id}"`);
    const val = parseInt(qinput.val());
    if ( val > 1 ) {
      qinput.val(parseInt(qinput.val()) - 1);
      qinput.trigger('input');
    }
    
  })

  cart_modal_items.on('input', 'input', function () {
    const th = $(this)
    const id = th.data('id');
    const spin2 = $(`[data-id="spin${id}"]`);
    spin2.fadeIn();

    clearTimeout(t[id]);
    t[id] = setTimeout(()=>{
      const val = th.val()
      if (!checkVal(val))
        return;
      const pds = tryParseJSONObject(localStorage.getItem('pds'))
      spin2.fadeOut();
      if (!pds)
        return
      pds[id].quantity = parseInt(th.val());
      localStorage.setItem('pds', JSON.stringify(pds));
      if (typeof(changeState) != 'undefined') changeState(val, id);
      const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${pds[id].quantity} عدد از این محصول در سبد خرید !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
    }, 1000);
  })


  const spin = $(`<span class="spinner-grow spinner-grow-sm" role="status"></span>`);
  $(document).on('click', '.cart-button', function (e) {
    e.stopPropagation();
    e.preventDefault();
    const th = $(this);
    const id = th.data('id');
    const has = th.hasClass('disstyle-none');

    const cont = $(th.html());
    
    if (auth) {
      $.ajax({
        url: basketAddUrl,
        data: {
          'id': id,
          csrfmiddlewaretoken: csrftoken,
        },
        method: 'POST',
        beforeSend: function (){
          th.attr('disabled', 'disabled');
          if (!has) {
            th.fadeOut(150, function(){
              th.html('');
              th.append(spin);
              th.fadeIn(150);
            });
          } else {
            spin.fadeIn(150);
            th.html(spin);
          }
        },
        complete: function (){
          if (!has) {
            th.fadeOut(150, function(){
              th.removeAttr('disabled');
              th.html('');
              th.append(cont);
              th.fadeIn(150);
            });
          } else {
            th.removeAttr('disabled');
            cont.fadeIn(150);
            th.html(cont);
          }
        },
        success: function (res) {
          setCounter2(res.count);
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
          const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
        }
      })
    } else {
      const pds = tryParseJSONObject(localStorage.getItem('pds'))
      if ( !pds )
        pds = {}
      if (pds[id]) {
        pds[id].quantity += 1;
        localStorage.setItem('pds', JSON.stringify(pds));
        const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${pds[id].quantity} عدد از این محصول در سبد خرید !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      } else {

        const image1 = th.data('image1');
        const title = th.data('title');
        const url = th.data('url');

        const data = {
          'image1': image1,
          'title': title,
          'url': url,
          'quantity': 1
        }
        pds[id] = data
        localStorage.setItem('pds', JSON.stringify(pds));
        const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">محصول به سبد خرید شما اضافه شد !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      }

      localStorage.setItem('see', true);
      dotGreen.removeClass('d-none');
      setCounter1();
    }
  })


  cart_modal_items.on('click', '.cart-close', function () {
    const th = $(this);
    const id = th.data('id');
    const pds = tryParseJSONObject(localStorage.getItem('pds'));
    if ( pds ) {
      try {
        $.when(delete pds[id]).done(function (){
          localStorage.setItem('pds', JSON.stringify(pds));
        })
      } catch (error) {}
    }

    if ( cart_modal_items.children('div').length == 1 ) {
      cart_submit_btn.fadeOut();
      cart_hr.fadeOut();
    }

    $(`#cartModal${id}`).fadeOut(function () {
      $(this).remove();
    });

    setCounter1();

    if (typeof(changeState) != 'undefined')  changeState('0', id);
    const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">با موفقیت حذف شد !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
    new bootstrap.Toast(myEl).show();
  })


  $('body').on('submit', '.nosub', function (e){
    e.preventDefault();
  })

  $('#cartModalButton').on('click', function () {
    cart_modal_items.html('');
    const pds = tryParseJSONObject(localStorage.getItem('pds'));
    if ( !pds || Object.keys(pds).length == 0 ) {
      cart_submit_btn.hide();
      cart_hr.hide();
    } else {
      cart_submit_btn.show();
      cart_hr.show();
      $.each(pds, function (key, v) {
        try {
          v = pds[key];
        cart_modal_items.append(`<div dir="rtl" id="cartModal${key}" class="position-relative flex-nowrap text-nowrap hstack p-2 border-t1 rounded-3 mt-2"><a href="${v.url}" class="d-block text-decoration-none p-0 btn flex-grow-1 img-smaller-wrapper"><img class="img-cover w-100 h-100" src="${v.image1}" alt="${v.title}"></a><div class="ps-2 col-8 col-sm-8 text-gray2 bold f-small pe-3"><a href="${v.url}" class="d-block text-gray8 text-decoration-none p-0 text-truncate py-1">${v.title}</a><div class="hstack"><div class="input-group w-8r rounded-3 border-t1 mt-2" dir="ltr"><button data-id="${key}" type="button" class="rounded-3 btn px-3 input-group-text border-0" data-type="minus" data-field="quantity"><svg width="5" height="2" viewBox="0 0 5 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.659891 0.00199968H4.67789V1.78H0.659891V0.00199968Z" fill="#C22020"/></svg></button><input autocomplete="off" data-id="${key}" dir="rtl" type="text" name="quantity" value="${v.quantity}" class="cart-input border-0 rounded-3 text-center form-control" value="1"><button type="button" data-id="${key}" class="rounded-3 btn px-3 input-group-text border-0" data-type="plus" data-field="quantity"><svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.05945 3.568H7.60745V5.136H5.05945V8.006H3.36545V5.136H0.803453V3.568H3.36545V0.753999H5.05945V3.568Z" fill="#2E961D"/></svg></button></div><div data-id="spin${key}" class="spin me-2 text-success spinner-border spinner-border-sm" role="status"></div></div></div><button type="button" data-id="${key}" class="me-auto flex-grow-0 cart-close text-start p-0 btn align-self-start border-0 rounded-circle"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="22" height="22" rx="8" fill="#9291AE"/><path d="M15 7L7 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 7L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`);
        } catch (error) {
          
        }
      });
    }
    localStorage.setItem('see', false)
    dotGreen.addClass('d-none');
  })

  cart_submit_btn.click(function () {
    $('#profModalButton').trigger('click');
    const myEl = $(`<div class="toast bg-warning text-dark rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-width="1.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.5V11.5V15.5Z" fill="#363853" fill-opacity="0.15"/><path d="M12 15.5V11.5" stroke="#363853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="9" r="0.5" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-linecap="round" stroke-linejoin="round"/></svg><span id="toast-text" class="mx-2">برای تکمیل خرید لطفا وارد حساب خود شوید.</span><button type="button" class="btn-close float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
    new bootstrap.Toast(myEl).show();
  })


  const search_modal_input = $('#searchModalInput');
  const search_modal_result1 = $('#searchModalResult1');
  const search_modal_result2 = $('#searchModalResult2');
  const search_modal_result1_label = $('#searchModalResult1Label');
  const search_modal_result2_label = $('#searchModalResult2Label');
  const search_modal_url = search_modal_input.data('url');
  const search_clear_btn = $('#clearSearch');
  const search_modal_show_all = $('#serachModalShowAll');
  search_modal_show_all.hide();

  search_clear_btn.on('click', function (){
    search_modal_input.val('');
    search_modal_input.trigger('input');
    search_clear_btn.fadeOut();
  })

  const search_modal_spin = $('#searchModalSpin');
  let val;
  let t2;
  search_modal_input.on('input', function () {
    search_modal_spin.show();
    clearTimeout(t2);
    t2 = setTimeout(()=>{
      val = search_modal_input.val();
      if (val.length < 1 ) {
        search_clear_btn.fadeOut();
        search_modal_result1.html('');
        search_modal_result2.html('');
        search_modal_show_all.hide();
        search_modal_result1_label.addClass('d-none');
        search_modal_result2_label.addClass('d-none');
        search_modal_spin.fadeOut();
        return;
      }
      search_clear_btn.fadeIn();
      $.get({
        url: search_modal_url,
        data: {
          q: val
        },
        success: function (res) {
          search_modal_result1.html('');
          search_modal_result2.html('');
          if (res.cats?.length > 0) {
            $.each(res.cats, function (k, v) {
              const item = $(`<a href="${v.url}" class="btn border-0 f-smaller my-2 text-decoration-none bg-light1 mx-1 text-gray2 p-0 rounded-3 px-1">${v.name}</a>`);
              search_modal_result1.append(item);
            })
            search_modal_result1_label.removeClass('d-none');
          } else {
            search_modal_result1_label.addClass('d-none');
          }
          if (res.posts?.length > 0) {
            $.each(res.posts, function (k, v) {
              const item = $(`<a dir="rtl" href="${v.url}" class="text-decoration-none btn text-end p-0 border-0 position-relative hstack rounded-4 mt-2 py-2 px-3 border-t1 bg-white"><div class="col-3 col-sm-2 col-lg-4 img-small-wrapper img-small-wrapper-e"><img class="img-cover w-100 h-100 rounded-4" src="${v.image1}" alt="${v.title}" /></div><div class="col-9 col-sm-10 col-lg-8 pe-3"><h2 class="bold f-small text-truncate">${v.title}</h2><p class="d-none d-lg-block elipsis elipsis-white light f-smalle mt-3">${v.desc_short}</p></div>${v.off ? '<div class="text-nowrap position-absolute bottom-0 start-0 mx-2 my-1 text-2 bold f-small">% ' + v.off + ' تخفیف</div>' : ''}</a>`);
              search_modal_result2.append(item);
            })
            search_modal_show_all.show().attr('href', `/search?q=${val}`);
            search_modal_result2_label.removeClass('d-none');
          } else {
            search_modal_show_all.hide();
            search_modal_result2_label.addClass('d-none');
          }
        },
        error: function () {
          const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">متاسفیم، خطای سرور</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
        }
      })
      search_modal_spin.fadeOut();
    }, 400);
    
  })


  $('#searchModal').on('shown.bs.modal', function () {
    $(this).find('[name=q]').focus();
  })

  window.makeTimer = function (date, day, hour, minute, second) {
    
    let endTime = new Date(date * 1000);
    endTime = (Date.parse(endTime) / 1000);

    let now = new Date();
    now = Date.parse(now) / 1000;

    const timeLeft = endTime - now;

    let days = Math.floor(timeLeft / 86400);
    let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
    let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

    if (days < 10) { days = "0" + days; }
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    
    day.text(' : ' + days);
    hour.text(' : ' + hours);
    minute.text(' : ' + minutes);
    second.text(seconds);

    setInterval(() => {
      if (seconds == 0) {
          seconds = 60;
          if (minutes == 0) {
            minutes = 60;
            if (hours == 0) {
              hours = 24;
              days -= 1;
              if (days < 10) { days = "0" + days; }
              day.text(' : ' + days);
            }                
            hours -= 1;
            if (hours < 10) { hours = "0" + hours; }
            hour.text(' : ' + hours);
          }
        minutes -= 1
        if (minutes < 10) { minutes = "0" + minutes; }
        minute.text(' : ' + minutes);
      }
      seconds -= 1;
      if (seconds < 10) { seconds = "0" + seconds; }
      second.text(seconds);
        
    }, 1000);

  }

  $.each($('.countdown'), function (k, v) {
    const countdown_item = $(v);
    const day = countdown_item.find('.day');
    const hour = countdown_item.find('.hour');
    const minute = countdown_item.find('.minute');
    const second = countdown_item.find('.second');
    makeTimer(countdown_item.data('date'), day, hour, minute, second);
  })

  const otp_request_form = $('#authForm');
  const otp_request_url = otp_request_form.data('url');
  const otp_verify_url = otp_request_form.data('url2');
  const otp_request_method = otp_request_form.attr('method');


  const auth_modal = $('#authModal');
  const auth_modal_close_btn = $('#authModalCloseBtn');
  auth_modal.on('shown.bs.modal', function () {
    otp_request_form.find('[name=phone]').focus();
    otp_request_form.find('[name=code]').focus();
  })
  
  otp_request_form.on('keydown', '[name=phone]', function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      $('#authFormCodeButton').trigger('click');
    }
  })

  function checkPhone(phone) {
    return phone.match(/^09\d{9}$/); 
  }
  function checkCode(code) {
    return code.match(/^\d{4}$/); 
  }

  let btns1 = null;
  let btns2 = null;
  otp_request_form.on('click', '#authFormCodeButton', function () {

    const phone = otp_request_form.find('[name=phone]').val();

    if (!checkPhone(phone)) {
      const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">لطفا شماره تلفن را صحیح وارد نمایید</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
      return;
    }

    localStorage.setItem('phone', phone);
    const data = otp_request_form.serialize();

    $.ajax({
      data: data,
      url: otp_request_url,
      method: otp_request_method,
      success: function (res, status, xhr) {
        if (xhr.status === 200) {
          const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
        } else {
          const myEl = $(`<div class="toast bg-warning text-dark rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-width="1.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.5V11.5V15.5Z" fill="#363853" fill-opacity="0.15"/><path d="M12 15.5V11.5" stroke="#363853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="9" r="0.5" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-linecap="round" stroke-linejoin="round"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
        }

        btns1 = $(`
          <button disabled id="authFormRepeatButton" type="button" class="order-1 btn bg-gray6 p-2">ارسال مجدد کد<span class="me-2 rounded-nw2 text-white bg-red1">${res.ttl}</span></button>
          <button id="authFormBackButton" type="button" class="order-1 btn bg-gray1 text-light p-2">ویرایش</button>
        `)
        btns2 = $(`
          <div class="d-flex justify-content-evenly">
            <button disabled id="authFormRepeatButton" type="button" class="btn bg-gray6 mt-3 p-2">ارسال مجدد کد<span class="me-2 rounded-nw2 text-white bg-red1">${res.ttl}</span></button>
            <button id="authFormBackButton" type="button" class="btn bg-gray1 text-light mt-3 p-2">ویرایش</button>
          </div>
        `)
        const form = $(`
          <input type="hidden" name="csrfmiddlewaretoken" value="${csrftoken}">
          <h2 class="authmodalH2 bold h4 text-gray1 text-center">ورود به پنل کاربری</h2>
          <div class="mt-4 text-gray3">لطفا کد ارسال شده را وارد کنید.</div>
          <input autocomplete="off" type="text" class="f-heading1 h-44 form-control mt-4 w-100 border-0 bg-gray5 rounded-3 text-center h5 h-44 ls-1" placeholder="----" name="code">
        `)
        
        otp_request_form.html(form);
        otp_request_form.find('[name=code]').focus();
        
        $(window).width() < 576 ? btns1.insertBefore(auth_modal_close_btn) : otp_request_form.append(btns2);

        const otp_request_repeat_btn = $('#authFormRepeatButton');
        const otp_request_repeat_btn_counter = otp_request_repeat_btn.find('span');

        let ttl = res.ttl;
        const x = setInterval(function () {

          ttl -= 1;
          otp_request_repeat_btn_counter.text(ttl.toString())

          if (ttl < 1) {
            clearInterval(x);
            otp_request_repeat_btn_counter.addClass('d-none')
            otp_request_repeat_btn.removeAttr('disabled');
          }
        }, 1000);

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
        const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      }
    })

  })
  $(document).on('click', '#authFormBackButton', function () {
    btns1.remove();
    btns2.remove();
    otp_request_form.html(`<input type="hidden" name="csrfmiddlewaretoken" value="${csrftoken}"><h2 class="authmodalH2 bold h4 text-gray1 text-center">ورود به پنل کاربری</h2><div class="mt-4 text-gray3">شماره تلفن خود را وارد کنید</div><input autocomplete="off" type="text" class="text-end f-heading1 h-44 form-control mt-4 w-100 border-0 bg-gray5 rounded-3" placeholder="شماره همراه" name="phone" dir="ltr"><p class="mt-3 text-gray1 f-small">با عضویت در سایت، قوانین و مقررات گل فروشی هوزان را می‌پذیرم.</p><button id="authFormCodeButton" type="button" class="btn bg-red1 text-light w-100 text-center py-2">ورود</button>`)
    otp_request_form.find('[name=phone]').focus();
  })

  const spin3 = $(`<h2 class="d-block mx-auto spin3 text-gray1 text-center spinner-border"></h2>`);
  let allow_code = true;
  let prev_code;
  otp_request_form.on('input', '[name=code]', function (e){
    const th = $(this);
    const val = th.val();
    if (!val.match((/^[\d]*$/)) || val.length > 4 || !allow_code) {
      th.val(prev_code);
      return;
    }
    prev_code = val;
    if (val.length == 4){
      allow_code = false;
      otp_request_form.trigger('submit', val);
    }
  })


  let prev_phone;
  otp_request_form.on('input', '[name=phone]', function (e){
    const th = $(this);
    const val = th.val();
    if (!val.match((/^[\d]*$/))) {
      th.val(prev_phone);
      return;
    }
    prev_phone = val;
    if (val.length == 0){
      th.addClass('text-end');
    } else {
      if (th.hasClass('text-end')) 
        th.removeClass('text-end')
    }
  })

  otp_request_form.on('submit', function (e, code) {
    e.preventDefault();
     
    if ( !code )
      return;
      
    if (!checkCode(code)) {
      const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">لطفا کد را صحیح وارد نمایید</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
      allow_code = true;
      return;
    }

    const phone = localStorage.getItem('phone');

    if (!checkPhone(phone)) {
      const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">لطفا شماره تلفن را صحیح وارد نمایید</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
      allow_code = true;
      return;
    }

    const h2 = otp_request_form.find('h2');
    h2.replaceWith(spin3);

    $.ajax({
      data: {
        phone: phone,
        code: code,
        ls_items: localStorage.getItem('pds'),
        csrfmiddlewaretoken: csrftoken,
      },
      url: otp_verify_url,
      method: otp_request_method,
      success: function (res) {

        localStorage.clear();

        localStorage.setItem('login', true);
        location.reload();

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
        const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
        allow_code = true;
        spin3.replaceWith(h2);
      }
    })
  })

  otp_request_form.on('click', '#authFormRepeatButton', function () {

    const phone = localStorage.getItem('phone')

    if (!checkPhone(phone)) {
      const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">لطفا شماره تلفن را صحیح وارد نمایید</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
      return;
    }

    $.ajax({
      data: {
        phone: phone,
        csrfmiddlewaretoken: csrftoken,
      },
      url: otp_request_url,
      method: otp_request_method,
      success: function (res, status, xhr) {
        if (xhr.status === 200) {
          var myEl = $(`<div id="toastSuccess" class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer');
          new bootstrap.Toast(myEl).show();
        } else {
          var myEl = $(`<div class="toast bg-warning text-dark rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-width="1.5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.5V11.5V15.5Z" fill="#363853" fill-opacity="0.15"/><path d="M12 15.5V11.5" stroke="#363853" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="9" r="0.5" fill="#363853" fill-opacity="0.15" stroke="#363853" stroke-linecap="round" stroke-linejoin="round"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer');
          new bootstrap.Toast(myEl).show();
        }

        otp_request_form.find('[name=code]').focus();

        const otp_request_repeat_btn = $('#authFormRepeatButton');
        const otp_request_repeat_btn_counter = otp_request_repeat_btn.find('span');

        let ttl = res.ttl;

        otp_request_repeat_btn.attr('disabled', 'disabled');
        otp_request_repeat_btn_counter.removeClass('d-none');
        otp_request_repeat_btn_counter.text(ttl.toString())

        clearInterval(x);

        var x = setInterval(function () {

          ttl -= 1;
          otp_request_repeat_btn_counter.text(ttl.toString())

          if (ttl < 1) {
            clearInterval(x);
            otp_request_repeat_btn_counter.addClass('d-none')
            otp_request_repeat_btn.removeAttr('disabled');
          }
        }, 1000);

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
        const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      }
    })
  })

  const logout_btn = $('#logoutButton');
  const logout_url = logout_btn.data('url');

  logout_btn.click(function () {
    $.ajax({
      data: {
        csrfmiddlewaretoken: csrftoken,
      },
      url: logout_url,
      method: 'POST',
      success: function (res) {

        localStorage.clear();
        localStorage.setItem('logout', true)
        
        location.reload();

      },
      error: function (err) {
        let msg;
        switch (err.status) {
          case 403:
            msg = 'لطفا مجدد وارد سایت شوید';
            break;
          default:
            msg = 'متاسفیم، خطای سرور';
            break;
        }
        const myEl = $(`<div class="toast bg-danger text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM10.7139 9.90158C10.4896 9.67727 10.1259 9.67727 9.90158 9.90158C9.67727 10.1259 9.67727 10.4896 9.90158 10.7139L11.1877 12L9.90158 13.2861C9.67727 13.5104 9.67727 13.8741 9.90158 14.0984C10.1259 14.3227 10.4896 14.3227 10.7139 14.0984L12 12.8123L13.2861 14.0984C13.5104 14.3227 13.8741 14.3227 14.0984 14.0984C14.3227 13.8741 14.3227 13.5104 14.0984 13.2861L12.8123 12L14.0984 10.7139C14.3227 10.4896 14.3227 10.1259 14.0984 9.90158C13.8741 9.67727 13.5104 9.67727 13.2861 9.90158L12 11.1877L10.7139 9.90158Z" fill="white"/></svg><span id="toast-text" class="mx-2">${msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo('#toastContainer').delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
      }
    })
  })

  $(window).on("beforeunload", function () {
    localStorage.removeItem('phone');
  });

});
