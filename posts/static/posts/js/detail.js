
let t;

const add_button = $('.addToBtn').first();

const q_input = $('[name="quantity"]');
const image1 = q_input.data('image1');
const title = q_input.data('title');
const url = q_input.data('url');

let redir = false;

function changeRed() {
  add_button.text('حذف از سبد');
  add_button.removeClass('bg-purple1').addClass('bg-red1');
  q_input.removeClass('q-di2').addClass('q-di');
}
function changePurple() {
  q_input.val('1');
  add_button.text('افزودن به سبد خرید');
  add_button.removeClass('bg-red1').addClass('bg-purple1');
  q_input.removeClass('q-di1').addClass('q-di2');
}



const d = setInterval(() => {
  if ( typeof(tryParseJSONObject) != 'undefined') {

    clearInterval(d);
    let seen = tryParseJSONObject(localStorage.getItem('seen'))
    if ( !seen )
      seen = {}

    if ( !seen[id] ) {
  
      seen[id] = id;
      localStorage.setItem('seen', JSON.stringify(seen));
      $.ajax({
        url: hit_count_url,
        data: {
          id: id 
        },
        method: 'GET',
      })
      
    }

    if (!auth) {

      window.changeState = function (q_val, temp_id) {
        if (id == temp_id) {
          if (parseInt(q_val) < 1) {
            const pds = tryParseJSONObject(localStorage.getItem('pds'))
            try {
              delete pds[id]
            } catch (error) {
              
            }
            localStorage.setItem('pds', JSON.stringify(pds))
            changePurple();
          }
          else {
            if ( !checkVal(q_val) )
              return;
            redir = true;
            q_input.val(q_val);
          }
        }
      }
    
      const pds = tryParseJSONObject(localStorage.getItem('pds'))
      if (pds) {
        if (pds[id]) {
          let val = pds[id].quantity;
          q_input.val(val);
          changeRed();
        }
      }
    }
  }
}, 1);




// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


$('[data-type="plus"]').on('click', function () {
  if ( !tmp_addto )
    return;
  val = parseInt(q_input.val())
  q_input.val(val + 1);
  q_input.trigger('input');
})
$('[data-type="minus"]').on('click', function (e) {
  if ( !tmp_addto )
    return;
  val = parseInt(q_input.val())
  if ( val > 1 ) {
    q_input.val(val - 1);
    q_input.trigger('input');
  } 
})

let tmp_addto = true;
let tmp_addto2 = true;
let q_input_prev = q_input.val();
const spin = $('#d-spin');
q_input.on('input', function () {

  
  if ( !tmp_addto ) {
    q_input.val(q_input_prev);
    return;
  }
  tmp_addto2 = false;

  spin.fadeIn();
  clearTimeout(t);
  t = setTimeout(()=>{
    
    let val = q_input.val();

    if (!checkVal(val)) {
      spin.fadeOut();
      q_input.val(q_input_prev);
      return;
    }

      
    q_input_prev = val;

    if (auth) {
  
      $.ajax({
        url: basketAddUrl,
        data: {
          'id': id,
          'quantity': val,
          csrfmiddlewaretoken: csrftoken,
        },
        method: 'POST',
        success: function (res) {
          const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo(toastContainer).delay(2500).queue(function (){$(this).remove()});
          new bootstrap.Toast(myEl).show();
          changeRed();
          setCounter2(res.count);
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
      if (!redir) {
  
        const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${val} عدد از این محصول در سبد خرید !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo(toastContainer).delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
        const data = {
          'image1': image1,
          'title': title,
          'url': url,
          'quantity': parseInt(val)
        }
        localStorage.setItem('see', true);
        dotGreen.removeClass('d-none');
        pds = tryParseJSONObject(localStorage.getItem('pds'))
        if ( !pds )
          pds = {}
        pds[id] = data
        localStorage.setItem('pds', JSON.stringify(pds));
        redir = false;
        setCounter1();
        changeRed();
      }
    }
    spin.fadeOut();
    tmp_addto2 = true;
  }, 1000);

})


const spin2 = $(`<div class="spinner-grow spinner-grow-sm text-light" role="status"></div>`);


$('.addToBtn').on('click', function () {
  const th = $(this);
  
  if ( !tmp_addto || !tmp_addto2 )
    return;
  tmp_addto = false;

  if (auth) {

    let val = q_input.val();
      if (!checkVal(val))
        return;

    const cont = th.text();

    $.ajax({
      url: addrmbasket_url,
      data: {
        'id': id,
        'quantity': val,
        csrfmiddlewaretoken: csrftoken,
      },
      method: 'POST',
      beforeSend: function (){
        th.html(spin2.fadeIn());
      },
      complete: function (){
        tmp_addto = true;
        spin2.fadeOut();
      },
      success: function (res, status, xhr) {
        const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">${res.msg}</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo(toastContainer).delay(2500).queue(function (){$(this).remove()});
        new bootstrap.Toast(myEl).show();
        if ( xhr.status == 201 ) changeRed();
        else changePurple();
        setCounter2(res.count);
      },
      error: function (err) {
        let msg;
        th.html(cont);
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
      const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">با موفقیت حذف شد !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo(toastContainer).delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();
      delete pds[id];
      localStorage.setItem('pds', JSON.stringify(pds));
      changePurple();
    } else {
      const myEl = $(`<div class="toast bg-success text-light rounded-sm-3" role="toast" data-bs-delay="1500"><div class="toast-body"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.7916 4.00549 19.9945 6.20842 20.6563 9.02975C21.1146 10.9834 21.1146 13.0166 20.6563 14.9703C19.9945 17.7916 17.7916 19.9945 14.9703 20.6563C13.0166 21.1146 10.9834 21.1146 9.02975 20.6563C6.20842 19.9945 4.0055 17.7916 3.3437 14.9703C2.88543 13.0166 2.88543 10.9834 3.3437 9.02974C4.0055 6.20841 6.20842 4.00549 9.02975 3.3437ZM15.0524 10.4773C15.2689 10.2454 15.2563 9.88195 15.0244 9.6655C14.7925 9.44906 14.4291 9.46159 14.2126 9.6935L11.2678 12.8487L9.77358 11.3545C9.54927 11.1302 9.1856 11.1302 8.9613 11.3545C8.73699 11.5788 8.73699 11.9425 8.9613 12.1668L10.8759 14.0814C10.986 14.1915 11.1362 14.2522 11.2919 14.2495C11.4477 14.2468 11.5956 14.181 11.7019 14.0671L15.0524 10.4773Z" fill="white"/></svg><span id="toast-text" class="mx-2">محصول به سبد خرید شما اضافه شد !</span><button type="button" class="btn-close btn-close-white float-start" data-bs-dismiss="toast"></button></div></div>`).appendTo(toastContainer).delay(2500).queue(function (){$(this).remove()});
      new bootstrap.Toast(myEl).show();

      let val = q_input.val();
      if (!checkVal(val))
        return;

      const data = {
        'image1': image1,
        'title': title,
        'url': url,
        'quantity': parseInt(val)
      }
      pds[id] = data;
      localStorage.setItem('pds', JSON.stringify(pds));
      changeRed();
    }

    const pds2 = tryParseJSONObject(localStorage.getItem('pds2'))
    temp_counter = pds2 ? Object.keys(pds2).length : 0;

    if ( temp_counter > 0 ) {
      localStorage.setItem('see', true);
      dotGreen.removeClass('d-none');
    } else {
      localStorage.setItem('see', false);
      dotGreen.addClass('d-none');
    }
    setCounter1();
    tmp_addto = true;
    
  }
})

$('img').loadScroll(500);
$('body').removeClass('invisible');