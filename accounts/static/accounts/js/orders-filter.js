var c_items = $('#cItems');
var paginate_buttons = $('#paginateButtons');
let page = 1;

paginate_buttons.on('click', 'button', function (){
  th = $(this);
  page = th.data('page');
  const value = th.data('value');
  $(`[data-value="${value}"].orders-filter`).trigger('click');
})


$('.orders-filter').on('click', function (){

    const th = $(this);
    const value = th.data('value');
    const data = {
        value: value,
        page: page,
        csrfmiddlewaretoken: csrftoken,
    }
    $.ajax({
        url: url,
        data: data,
        method: 'POST',   

        success: function(res){
            page = 1;
            c_items.html('');
            let temp = null;
            $.each(res.page_obj, function (k,v){
              if (v.status === '1') {
                temp = `<div class="border-green1 bg-green1 col-6 col-sm-4 col-md-12 rounded-start-4 rounded-md-3 overflow-hidden position-relative d-flex flex-column justify-content-center justify-content-md-end flex-md-row row-cols-auto align-items-center text-white px-3 px-md-2 py-1 order-1 order-md-0">
                          <svg class="icon-mobile" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.01272 11.9195L0.0190286 12.0317L1.01272 11.9195C1.02538 12.0317 1.04017 12.0984 1.10073 12.3524C2.75599 19.294 8.63623 21.9135 11.1562 22.7299C11.5879 22.8698 11.6901 22.9009 12 22.9009C12.3099 22.9009 12.4121 22.8698 12.8438 22.7299C15.3638 21.9135 21.244 19.294 22.8993 12.3524C22.9598 12.0984 22.9746 12.0317 22.9873 11.9195C22.9997 11.8098 23.0002 11.7239 22.9973 11.4102C22.9533 6.70449 22.3475 4.2723 20.9089 2.9142C19.4531 1.5397 16.8733 0.999999 12 0.999999C7.1267 0.999999 4.54693 1.53969 3.09106 2.9142C1.65255 4.2723 1.04666 6.70448 1.00268 11.4102C0.999753 11.7239 1.00034 11.8098 1.01272 11.9195Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.6834 15.0976 11.3166 15.0976 11.7071 14.7071L16.7071 9.70711Z" fill="white"/>
                              </svg>
                          <span class="me-2 text-center mt-3 mt-md-0 mb-5 mb-md-0">جاری</span>
                          <span class="text-center fs-small px-2 py-1 border-0 border-md-green bg-green3 bg-md-transparent rounded-0 rounded-md-3 position-absolute bottom-0 right-0 left-0 w-100 w-md-auto position-md-static me-auto">کد سفارش : ${v.id}</span>
                        </div>`
              } else if(v.status === '2') {
                temp = `<div class="border-yellow1 bg-yellow2 col-6 col-sm-4 col-md-12 rounded-start-4 rounded-md-3 overflow-hidden position-relative d-flex flex-column justify-content-center justify-content-md-end flex-md-row row-cols-auto align-items-center text-white px-3 px-md-2 py-1 order-1 order-md-0">
                          <svg class="icon-mobile" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.01272 11.9195L0.0190286 12.0317L1.01272 11.9195C1.02538 12.0317 1.04017 12.0984 1.10073 12.3524C2.75599 19.294 8.63623 21.9135 11.1562 22.7299C11.5879 22.8698 11.6901 22.9009 12 22.9009C12.3099 22.9009 12.4121 22.8698 12.8438 22.7299C15.3638 21.9135 21.244 19.294 22.8993 12.3524C22.9598 12.0984 22.9746 12.0317 22.9873 11.9195C22.9997 11.8098 23.0002 11.7239 22.9973 11.4102C22.9533 6.70449 22.3475 4.2723 20.9089 2.9142C19.4531 1.5397 16.8733 0.999999 12 0.999999C7.1267 0.999999 4.54693 1.53969 3.09106 2.9142C1.65255 4.2723 1.04666 6.70448 1.00268 11.4102C0.999753 11.7239 1.00034 11.8098 1.01272 11.9195Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.6834 15.0976 11.3166 15.0976 11.7071 14.7071L16.7071 9.70711Z" fill="white"/>
                              </svg>
                          <span class="me-2 text-center mt-3 mt-md-0 mb-5 mb-md-0">تحویل داده شده</span>
                          <span class="text-center fs-small px-2 py-1 border-0 border-md-yellow bg-yellow3 bg-md-transparent rounded-0 rounded-md-3 position-absolute bottom-0 right-0 left-0 w-100 w-md-auto position-md-static me-auto">کد سفارش : ${v.id}</span>
                        </div>`
              } else if(v.status === '3') {
                temp = `<div class="border-red1 bg-red1 col-6 col-sm-4 col-md-12 rounded-start-4 rounded-md-3 overflow-hidden position-relative d-flex flex-column justify-content-center justify-content-md-end flex-md-row row-cols-auto align-items-center text-white px-3 px-md-2 py-1 order-1 order-md-0">
                          <svg class="icon-mobile" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.01272 11.9195L0.0190286 12.0317L1.01272 11.9195C1.02538 12.0317 1.04017 12.0984 1.10073 12.3524C2.75599 19.294 8.63623 21.9135 11.1562 22.7299C11.5879 22.8698 11.6901 22.9009 12 22.9009C12.3099 22.9009 12.4121 22.8698 12.8438 22.7299C15.3638 21.9135 21.244 19.294 22.8993 12.3524C22.9598 12.0984 22.9746 12.0317 22.9873 11.9195C22.9997 11.8098 23.0002 11.7239 22.9973 11.4102C22.9533 6.70449 22.3475 4.2723 20.9089 2.9142C19.4531 1.5397 16.8733 0.999999 12 0.999999C7.1267 0.999999 4.54693 1.53969 3.09106 2.9142C1.65255 4.2723 1.04666 6.70448 1.00268 11.4102C0.999753 11.7239 1.00034 11.8098 1.01272 11.9195Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L11 12.5858L9.70711 11.2929C9.31658 10.9024 8.68342 10.9024 8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L10.2929 14.7071C10.6834 15.0976 11.3166 15.0976 11.7071 14.7071L16.7071 9.70711Z" fill="white"/>
                              </svg>
                          <span class="me-2 text-center mt-3 mt-md-0 mb-5 mb-md-0">لغو شده</span>
                          <span class="text-center fs-small px-2 py-1 border-0 border-md-red bg-red3 bg-md-transparent rounded-0 rounded-md-3 position-absolute bottom-0 right-0 left-0 w-100 w-md-auto position-md-static me-auto">کد سفارش : ${v.id}</span>
                        </div>`
              }
              c_items.append(
                  `<article class="d-flex flex-md-column rounded-4 px-md-4 py-md-2 bg-white border-t1 bold mb-1 mt-3">
                      ${temp}
                      <div class="col-6 col-sm-8 flex-shrink-0 col-md-12 d-flex flex-column-reverse flex-md-column">
                          <div class="responsive6 px-3 pb-2" data-count="${Object.keys(v.cart_items).length}">
                              ${$.map(v.cart_items, function (vv){
                                  return (
                                      `<div class="px-2">
                                          <a href="${vv.url}" class="btn p-0 text-decoration-none position-relative overflow-hidden rounded-4 img-small-wrapper img-small-wrapper-e2 mt-3">
                                              <img class="img-cover w-100 h-100" src="${vv.image1}" alt="${vv.title}">
                                              <span class="position-absolute bottom-0 start-0 end-0 end-md-auto text-center f-smaller text-gray3 px-2 py-md-1 bg-yellow1">${vv.quantity} عدد</span>
                                          </a>
                                      </div>`
                                  )
                              }).join('')}
                          </div>
                          <div class="text-gray7 f-smaller mt-3 pe-2">${v.jpublish}</div>
                      </div>
                  </article>`
              )
          })


            if (res.page_obj.length < 1) {
              const img_404 = $(`
                <img class="d-block mx-auto img404 mt-3" src="${img404}" alt="404 not found">
                <div class="h5 semibold text-gray4 text-center mt-4">هنوز هیچ سفارشی ندادید</div>
              `).hide().fadeIn(500);
              c_items.append(img_404);
            }

            paginate_buttons.html('')

            if (res.next)
              paginate_buttons.append(`<button data-value="${value}" data-page="${res.next}" id="paginateNext" type="button" class="btn p-0 border-0 bg-blue1 text-white rounded-4 mx-2 mt-3 px-2 py-1">بعدی »</button>`)
              
            if (res.previous)
              paginate_buttons.append(`<button data-value="${value}" data-page="${res.previous}" id="paginatePrev" type="button" class="btn p-0 border-0 bg-blue1 text-white rounded-4 mx-2 mt-3 px-2 py-1">« قبلی</button>`)

            $.each($(c_items.find('.responsive6')), function (key, slider_item){
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
              
              
        }
    })
})

$('img').loadScroll(500);
$('body').removeClass('invisible');