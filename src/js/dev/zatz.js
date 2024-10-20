import $ from 'jquery'
import Form from '../utils/Form'
import Inputmask from 'inputmask'
import Swiper from 'swiper';
import { rem } from '../utils/constants'
import { Navigation, Pagination, Grid, Autoplay, EffectCreative, EffectFade } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";

$(function () {

    initSwipers()
    dropDowns()
    initForms()
    initFancybox()
    modalsHandler()
})

function initForms() {
    function formSubmit(inputData) {
        console.log(inputData);
    }
    const forms = document.querySelectorAll('.form')
    if (forms) {
        forms.forEach((e) => {
            new Form(e, formSubmit)
            const phone = $(e).find('input[name="phone"]')
            if (phone) {
                new Inputmask('+7 (999) 999-99-99').mask(phone);
            }

        })
    }
}
function dropDowns() {
    const ddBtn = $('.drop-down-target')
    if (!ddBtn) return

    ddBtn.on('click', (e) => {
        e.preventDefault()
        e.currentTarget.classList.toggle('_opened')
        e.currentTarget.closest('.drop-down-container')
            .classList.toggle('_opened')
    })

}
function initSwipers() {
    const heading = document.querySelector('.heading')
    if (heading) {
        const target = new Swiper(heading.querySelector('.swiper'), {
            modules: [Pagination, EffectFade, Autoplay],
            loop: false,
            slidesPerView: 1,
            slidesPerGroup: 1,
            effect: 'fade',
            autoplay: { delay: 3000 },
            pagination: {
                el: heading.querySelector('.swiper-pagination'),
                clickable: true
            },
        })
        const counter = heading.querySelector('.swiper-counter')
        if (counter) {
            counter.querySelector('.swiper-counter-all').textContent = `0${target.slides.length}`
            const counterCurr = counter.querySelector('.swiper-counter-current');
            target.on('slideChange', function (e) {
                counterCurr.textContent = `0${target.activeIndex + 1}`
            });
        }


    }

    const prices = document.querySelector('.prices')
    if (prices) {
        new Swiper(prices.querySelector('.swiper'), {
            loop: false,
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: rem(4),
            autoHeight: true,
            breakpoints: {
                768: {
                    slidesPerView: 3
                }
            }

        })

    }

    const sliders = document.querySelectorAll('.slider')
    if (sliders) {
        sliders.forEach((slider) => {
            const counter = slider.querySelector('.swiper-counter')
            const counterCurr = counter.querySelector('.swiper-counter-current');
            const target = new Swiper(slider.querySelector('.swiper'), {
                modules: [Pagination, EffectCreative, Navigation],
                loop: false,
                speed: 1000,
                initialSlide: 1,
                slideToClickedSlide: true,
                effect: window.innerWidth < 769 ? "slide" : "creative",
                slidesPerView: "auto",
                spaceBetween: rem(4),

                breakpoints: {
                    769: {
                        slidesPerView: 3,
                        creativeEffect: {
                            prev: {
                                shadow: true,
                                translate: ["-125%", 30, -300],
                            },
                            next: {
                                shadow: true,
                                translate: ["125%", 30, -300],
                            },
                        },
                        spaceBetween: 0,
                        centeredSlides: true,
                    },
                },
                pagination: {
                    el: slider.querySelector('.swiper-pagination'),
                    clickable: true
                },
                navigation: {
                    nextEl: slider.querySelector('.slider__aside-btn')
                },
                on: {
                    init: function (swiper) {
                        counter.querySelector('.swiper-counter-all').textContent = `0${swiper.slides.length}`
                    },
                    slideChange: function (swiper) {
                        counterCurr.textContent = `0${swiper.activeIndex + 1}`
                    },
                }

            })


            window.addEventListener("load", () => {
                if (window.innerWidth < 769) {
                    target.params.effect = "slide";
                } else {
                    target.params.effect = "creative";
                }
            });

        })


    }

    const reviews = document.querySelector('.reviews')
    if (reviews) {
        const counter = reviews.querySelector('.swiper-counter')
        const counterCurr = counter.querySelector('.swiper-counter-current');
        new Swiper(reviews.querySelector('.swiper'), {
            modules: [Navigation, Pagination],
            /*     speed: 2000, */
            /* slidesPerView: 5, */
            loop: true,
            /*  slideToClickedSlide: true, */
            // mousewheel: true,
            spaceBetween: rem(2.5),
            breakpoints: {
                769: {
                    slidesPerView: 'auto',
                },
            },
            pagination: {
                el: reviews.querySelector('.swiper-pagination'),
                clickable: true
            },
            navigation: {
                prevEl: reviews.querySelector('.swiper-btn-prev'),
                nextEl: reviews.querySelector('.swiper-btn-next')
            },
            on: {
                init: function (swiper) {
                    counter.querySelector('.swiper-counter-all').textContent = swiper.slides.length.toString().padStart(2, '0')
                },
                slideChange: function (swiper) {
                    counterCurr.textContent = (swiper.realIndex + 1).toString().padStart(2, '0')
                },
                
            }
        });
    }

}
function initFancybox() {
    const anytarget = document.querySelector('[data-fancybox]')
    if (!anytarget) return

    Fancybox.bind('[data-fancybox]', {
        Thumbs: false,
        Toolbar: {
            display: {
                left: [],
                middle: [
                    "infobar",
                    "zoomIn",
                    "zoomOut",
                ],
                right: ["close"],
            },
        },
    })
}



function modalsHandler() {


    const modalOpeners = $('.modal-opener'),
        modalClosers = $('.modal-closer'),
        html = $('html')


    if (!modalOpeners || !modalClosers) return

    modalOpeners.on('click', (ev) => {
        const { modal } = ev.currentTarget.dataset

        $(`.modal-${modal}`)
            .fadeIn()
            .addClass('_opened')
        /*  html.addClass('lock') */
    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

        }
        /* html.removeClass('lock') */
    })
}

