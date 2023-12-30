const posts = $('#posts');

let page = 2;
let flag = true;

const spinner = $('#spinner');

$('body').scroll(function () {
    if ($('body').scrollTop() > $(document).height() - $('body').height() - 500 && flag) {
        flag = false
        if (page <= num) {
            $.ajax({
                method: 'GET',
                data: {
                    'page': page
                },
                url: page_url,
                beforeSend: function (){
                    spinner.modal('show');
                },
                success: function (res) {
                    spinner.modal('hide');
                    $.each(res.posts, function (key, post) {
                        let article = $(`
                            ${post.off ? '<span class="d-sm-none price-small medium f-small px-2 m-1 bg-red1 text-light rounded-bottom-end-4 position-absolute top-0 start-0">% ' + post.off + '</span>' : ''}
                            <article class="position-relative detail-article p-1 p-lg-11">
                                <div class="arrow1"></div>
                                <div class="arrow2"></div>
                                <div class="arrow3"></div>
                                <div class="arrow4"></div>
                                ${post.avail ?
                                    `<button type="button" class="cart-button btn basket_btn1" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                    </button>` : ``
                                }
                                <div class="overflow-hidden position-relative d-flex flex-row flex-lg-column align-items-center bg-white rounded-4 border-t1 px-3 px-lg-2 py-2">
                                    <a href="${post.url}" class="rounded-4 overflow-hidden col-5 col-lg-12 position-relative d-block p-0 latest-products__img">
                                        <img class="img-cover w-100 h-100 rounded-4" src="${post.image1}" alt="${post.title}">
                                        ${post.off ? 
                                            `<div class="d-none d-lg-block text-center opacity-75 bsh-1 lh-xbase rounded-top-4 position-absolute top-0 end-0 start-0 w-100 countdown text-light bg-red1 f-small" data-date="${post.off_date}">
                                                <span class="second"></span>
                                                <span class="minute"></span>
                                                <span class="hour"></span>
                                                <span class="day"></span>
                                            </div>
                                            <span class="d-none d-lg-inline medium f-small lh-1d1 px-2 py-1 m-2 bg-red1 text-light rounded-toffer position-absolute bottom-0 start-0">% ${post.off}</span>
                                            ` : ``
                                        }
                                        ${post.avail ? '' : '<div class="noavail"></div><span class="d-none d-lg-block noavail2">ناموجود</span>'}
                                    </a>
                                    ${post.off ? 
                                        `<div class="d-lg-none text-center f-smaller lh-lg rounded-4 position-absolute px-2 m-1 bottom-0 start-0 countdown text-light bg-red1" data-date="${post.off_date}">
                                            <span class="second"></span>
                                            <span class="minute"></span>
                                            <span class="hour"></span>
                                            <span class="day"></span>
                                        </div>` : ``
                                    }
                                    ${post.avail ? `` : 
                                        `<span class="d-lg-none noavail2 py-1 px-2 mb-1 ms-2 end-auto f-smaller rounded-4 start-0">ناموجود</span>`
                                    }
                                    <div class="flex-grow-1 col-7 col-lg-12 pe-3 pe-lg-0">
                                        <h3><a href="${post.url}" class="d-block text-decoration-none p-0 px-0 px-lg-4 mt-2 text-truncate f-small bold text-gray2">${post.title}</a></h3>
                                        <p class="elipsis light f-smalle elipsis-white">${post.desc_short}</p>
                                    </div>
                                    <div class="d-none d-lg-flex col-12">
                                        <a href="${post.url}" class="flex-grow-1 cart-buttontext btn p-0 text-decoration-none align-middle f-small text-light rounded-3 bg-gray1">مشخصات محصول</a>
                                        ${post.avail ?
                                            `<button type="button" class="me-00 rounded-circle px-2 cart-button btn border-0 align-middle" data-id="${post.id}" data-image1="${post.image1}" data-title="${post.title}" data-url="${post.url}">
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.99999 20C2.08927 20 -1.20723 18.9474 0.393776 10C0.45768 9.6849 0.519183 9.37901 0.578879 9.08212C2.01483 1.94056 2.40502 0 9.99999 0C17.595 0 17.9852 1.94059 19.4211 9.08228C19.4808 9.37913 19.5423 9.68495 19.6062 10C21.2073 18.9474 17.9107 20 9.99999 20ZM13.3333 5C13.3333 4.53976 13.7064 4.16667 14.1667 4.16667C14.6269 4.16667 15 4.53976 15 5C15 6.61502 14.3861 7.88752 13.4182 8.74784C12.4657 9.59453 11.2192 10 10 10C8.78077 10 7.5343 9.59453 6.58178 8.74784C5.61392 7.88752 5 6.61502 5 5C5 4.53976 5.3731 4.16667 5.83333 4.16667C6.29357 4.16667 6.66667 4.53976 6.66667 5C6.66667 6.16276 7.09441 6.97359 7.68905 7.50216C8.29903 8.04436 9.13589 8.33333 10 8.33333C10.8641 8.33333 11.701 8.04436 12.3109 7.50216C12.9056 6.97359 13.3333 6.16276 13.3333 5Z" fill="#5E2A9F"/></svg>
                                            </button>` : ``
                                        }
                                    </div>
                                </div>
                                ${post.off ? '<span class="d-lg-none price-small medium f-small ps-11 h-1r pe-2 rounded-top-start-11  m-1 bg-red1 text-light rounded-bottom-end-4 position-absolute top-0 start-0">% ' + post.off + '</span>' : ''}
                            </article>
                        `).hide().fadeIn(1000)
                        posts.append(article);
                        
                        if (post.off_date) {
                            const countdown_item = article.find('.countdown');
                            const day = countdown_item.find('.day');
                            const hour = countdown_item.find('.hour');
                            const minute = countdown_item.find('.minute');
                            const second = countdown_item.find('.second');
                            makeTimer(countdown_item.data('date'), day, hour, minute, second);
                        }
                    })
                    page += 1;
                    flag = true;
                }
            })
        }
    }
});