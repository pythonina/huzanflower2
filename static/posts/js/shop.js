let avail_bool = true;
let off_bool = false;
let order_by = 1;
let types = [];
let props = [];

//scroll-laod
const shop_posts = $('#shop_posts');
let page = 2;
let flag = true;
let t;

const spin = $('#spin');

$('.prop, .type, #checkBoxOff, #checkBoxAvailable, input[name="radioBoxLatest"]').on('change', function (){
    spin.fadeIn(1000);
    const th = $(this);
    const id = th.attr('id');
    const name = th.attr('name');
    const val = th.val();

    if (id == 'checkBoxAvailable') 
        avail_bool = !avail_bool;
    else if (id == 'checkBoxOff')
        off_bool = !off_bool;
    else if (name == 'radioBoxLatest')
        order_by = val;
    else if (th.hasClass('type')) {
        if (types.includes(val))
            types = types.filter(e=>e!=val)
        else 
            types.push(val)
    }
        
    else if (th.hasClass('prop')) {
        if (props.includes(val))
            props = props.filter(e=>e!=val)
        else 
            props.push(val)
    }

    clearTimeout(t);
    t = setTimeout(() => {
        spin.fadeOut(1000);

        const data = {
            avail_bool: avail_bool,
            off_bool: off_bool,
            order_by: order_by,
            types: JSON.stringify(types),
            props: JSON.stringify(props)
        }

        $.ajax({
            url: page_url,
            data: data,
            method: 'GET',
            success: function (res){
                shop_posts.html('');
                if (res.page_obj.length > 0) {
                    $.each($(res.page_obj),function (k,post) {
                        const article = $(`
                            <article class="position-relative shop-article p-1 p-md-11">
                                <div class="arrow11"></div>
                                <div class="arrow22"></div>
                                <div class="arrow33"></div>
                                <div class="arrow44"></div>
                                ${post.avail ?
                                    `<button type="button" class="cart-button btn basket_btn2" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                    </button>` : ``
                                }
                                <div class="overflow-hidden position-relative d-flex flex-row flex-md-column align-items-center bg-white rounded-4 border-t1 px-3 px-md-2 py-2">
                                    <a href="${post.url}" class="rounded-4 overflow-hidden overflow-hidden col-5 col-md-12 position-relative d-block p-0 latest-products__img">
                                        <img class="img-cover w-100 h-100 rounded-4" src="${post.image1}" alt="${post.title}">
                                        ${post.off ? 
                                            `<div class="d-none d-md-block text-center opacity-75 bsh-1 lh-xbase rounded-top-4 position-absolute top-0 end-0 start-0 w-100 countdown text-light bg-red1 f-small" data-date="${post.off_date}">
                                                <span class="second"></span>
                                                <span class="minute"></span>
                                                <span class="hour"></span>
                                                <span class="day"></span>
                                            </div>
                                            <span class="d-none d-md-inline medium lh-1d1 f-small px-2 py-1 m-2 bg-red1 text-light rounded-toffer position-absolute bottom-0 start-0">% ${post.off}</span>
                                            ` : `` 
                                        }
                                        ${post.avail ? '' : '<div class="noavail"></div><span class="d-none d-md-block noavail2">ناموجود</span>'}
                                    </a>
                                    ${post.off ? 
                                        `<div class="d-md-none text-center f-smaller lh-lg rounded-4 position-absolute px-2 m-1 bottom-0 start-0 countdown text-light bg-red1" data-date="${post.off_date}">
                                            <span class="second"></span>
                                            <span class="minute"></span>
                                            <span class="hour"></span>
                                            <span class="day"></span>
                                        </div>` : ``
                                    }
                                    ${post.avail ? '' : '<span class="d-md-none noavail2 py-1 px-2 mb-1 ms-2 end-auto f-smaller rounded-4 start-0">ناموجود</span>'}
                                    <div class="flex-grow-1 col-7 col-md-12 pe-3 pe-md-0">
                                        <h3><a href="${post.url}" class="d-block text-decoration-none p-0 px-0 px-md-4 mt-2 text-truncate f-small bold text-gray2">${post.title}</a></h3>
                                        <p class="elipsis light f-smalle elipsis-white">${post.desc_short}</p>
                                    </div>
                                    <div class="d-none d-md-flex col-12">
                                        <a href="${post.url}" class="cart-buttontext flex-grow-1 btn p-0 text-decoration-none align-middle f-small text-light rounded-3 bg-gray1">مشخصات محصول</a>
                                        ${post.avail ?
                                            `<button type="button" class="rounded-circle me-00 px-2 cart-button btn border-0 align-middle" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                            </button>` : ``
                                        }
                                    </div>
                                </div>
                                ${post.off ? '<span class="d-md-none price-small medium f-small ps-11 h-1r pe-2 rounded-top-start-11 m-1 bg-red1 text-light rounded-bottom-end-4 position-absolute top-0 start-0">% ' + post.off + '</span>' : ''}
                            </article>`).hide().fadeIn(1000);
                        shop_posts.append(article);

                        if (post.off_date) {
                            const countdown_item = article.find('.countdown');
                            const day = countdown_item.find('.day');
                            const hour = countdown_item.find('.hour');
                            const minute = countdown_item.find('.minute');
                            const second = countdown_item.find('.second');
                            makeTimer(countdown_item.data('date'), day, hour, minute, second);
                        }
                    })
                } else {
                    flag = false;
                    const div_404 = $(`<img class="pt-5 d-block img404 mx-auto" src=${img_404} alt="404 not found"><div class="w-100 h5 semibold text-purple2 text-center mt-4">متاسفانه مطلبی یافت نشد</div>`).hide().fadeIn(1000);
                    shop_posts.append(div_404);
                }
                if (!flag2) {
                    flag = false;
                    $('body').animate({'scrollTop': va - 250}, 500, 'swing', function (){
                        num = parseInt(res.page_num);
                        flag = true;
                        page = 2;
                    });
                } else {
                    num = parseInt(res.page_num);
                    page = 2;
                    flag = true;
                }
            }
        })
    }, 1000);
})


const spinner = $('#spinner');

$('body').scroll(function () {
    if ($('body').scrollTop() > $(document).height() - $('body').height() - 500 && flag) {
        flag = false
        if (page <= num) {
            $.ajax({
                method: 'GET',
                data: {
                    page: page,
                    avail_bool: avail_bool,
                    off_bool: off_bool,
                    order_by: order_by,
                    types: types,
                    props: props
                },
                url: page_url,
                beforeSend: function (){
                    spinner.modal('show');
                },
                success: function (res) {
                    spinner.modal('hide');
                    $.each($(res.page_obj), function (k, post) {
                        const article = $(`
                            <article class="position-relative shop-article p-1 p-md-11">
                                <div class="arrow11"></div>
                                <div class="arrow22"></div>
                                <div class="arrow33"></div>
                                <div class="arrow44"></div>
                                ${post.avail ?
                                    `<button type="button" class="cart-button btn basket_btn2" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                    </button>` : ``
                                }
                                <div class="overflow-hidden position-relative d-flex flex-row flex-md-column align-items-center bg-white rounded-4 border-t1 px-3 px-md-2 py-2">
                                    <a href="${post.url}" class="rounded-4 overflow-hidden overflow-hidden col-5 col-md-12 position-relative d-block p-0 latest-products__img">
                                        <img class="img-cover w-100 h-100 rounded-4" src="${post.image1}" alt="${post.title}">
                                        ${post.off ? 
                                            `<div class="d-none d-md-block text-center opacity-75 bsh-1 lh-xbase rounded-top-4 position-absolute top-0 end-0 start-0 w-100 countdown text-light bg-red1 f-small" data-date="${post.off_date}">
                                                <span class="second"></span>
                                                <span class="minute"></span>
                                                <span class="hour"></span>
                                                <span class="day"></span>
                                            </div>
                                            <span class="d-none d-md-inline medium lh-1d1 f-small px-2 py-1 m-2 bg-red1 text-light rounded-toffer position-absolute bottom-0 start-0">% ${post.off}</span>
                                            ` : `` 
                                        }
                                        ${post.avail ? '' : '<div class="noavail"></div><span class="d-none d-md-block noavail2">ناموجود</span>'}
                                    </a>
                                    ${post.off ? 
                                        `<div class="d-md-none text-center f-smaller lh-lg rounded-4 position-absolute px-2 m-1 bottom-0 start-0 countdown text-light bg-red1" data-date="${post.off_date}">
                                            <span class="second"></span>
                                            <span class="minute"></span>
                                            <span class="hour"></span>
                                            <span class="day"></span>
                                        </div>` : ``
                                    }
                                    ${post.avail ? '' : '<span class="d-md-none noavail2 py-1 px-2 mb-1 ms-2 end-auto f-smaller rounded-4 start-0">ناموجود</span>'}
                                    <div class="flex-grow-1 col-7 col-md-12 pe-3 pe-md-0">
                                        <h3><a href="${post.url}" class="d-block text-decoration-none p-0 px-0 px-md-4 mt-2 text-truncate f-small bold text-gray2">${post.title}</a></h3>
                                        <p class="elipsis light f-smalle elipsis-white">${post.desc_short}</p>
                                    </div>
                                    <div class="d-none d-md-flex col-12">
                                        <a href="${post.url}" class="flex-grow-1 cart-buttontext btn p-0 text-decoration-none align-middle f-small text-light rounded-3 bg-gray1">مشخصات محصول</a>
                                        ${post.avail ?
                                            `<button type="button" class="me-00 rounded-circle px-2 cart-button btn border-0 align-middle" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                            </button>` : ``
                                        }
                                    </div>
                                </div>
                                ${post.off ? '<span class="d-md-none price-small medium f-small ps-11 h-1r pe-2 rounded-top-start-11 m-1 bg-red1 text-light rounded-bottom-end-4 position-absolute top-0 start-0">% ' + post.off + '</span>' : ''}
                            </article>`).hide().fadeIn(1000);
                        shop_posts.append(article);

                        if (post.off_date) {
                            const countdown_item = article.find('.countdown');
                            const day = countdown_item.find('.day');
                            const hour = countdown_item.find('.hour');
                            const minute = countdown_item.find('.minute');
                            const second = countdown_item.find('.second');
                            makeTimer(countdown_item.data('date'), day, hour, minute, second);
                        }
                    })
                    num = parseInt(res.page_num);
                    flag = true;
                    page += 1;
                }
            })
        }
    }
});



const filter_div = $('#filter');
const has_cat = filter_div.data('catname');
has_cat ? null : $(`
    <button class="col-12 text-center text-md-end tri catCollapse btn w-100 text-end px-4 py-3 rounded-top semibold bg-main navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#catNav">
    دسته بندی
    </button>
    <div class="collapse navbar-collapse text-center text-md-end" id="catNav">
        <ul class="navbar-nav p-0">
            ${ $(window).width() < 992 ? 
                $.map($('#cats-nav1').children('li'), (v,i) => {
                    if ( (child = $(v).children('a')).length ) {
                        href = child.attr('href');
                        text = child.text();
                    } else if ( (child = $(v).children('button')).length ) {
                        href = $(v).find('a').attr('href');
                        text = child.text();
                    }
                    return (`
                        <li class="nav-item ${i % 2 == 0 ? 'bg-gray10' : 'bg-gray11'}">
                            <a class="btn w-100 text-center text-md-end nav-link px-33" href="${href}">${text}</a>
                        </li>
                    `);
                }).join('') :
                $.map($('#cats-nav2').children('li').children('a').filter((i,v)=>$(v).text()!='فروش ویژه'), (v,i) => {
                    href = v.getAttribute('href');
                    text = $(v).text();
                    return (`
                        <li class="nav-item ${i % 2 == 0 ? 'bg-gray10' : 'bg-gray11'}">
                            <a class="btn w-100 text-center text-md-end nav-link px-33" href="${href}">${text}</a>
                        </li>
                    `);
                }).join('')
            }
        </ul>
    </div>
`).insertAfter(filter_div);


$('img').loadScroll(500);
$('body').removeClass('invisible');