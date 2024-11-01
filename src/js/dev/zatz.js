import $ from 'jquery'
import Form from '../utils/Form'
import Inputmask from 'inputmask'
import Swiper from 'swiper';
import { rem } from '../utils/constants'
import { Navigation, Pagination, Grid, Autoplay, EffectCreative, EffectFade } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import WOW from 'wow.js';

$(function () {
    modalsHandler()
    dropDowns()
    initForms()
    initWow()
    initFancybox()
    initSwipers()
    imagesHover()
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
  
    const sliders = document.querySelectorAll('.slider')
    if (sliders) {
        sliders.forEach((slider) => {
            new Swiper(slider.querySelector('.swiper'), {
                modules: [Navigation, Pagination, EffectCreative],
                loop: true,
                effect: window.innerWidth < 769 ? "creative" : "slide",
                slidesPerView: 1.5,
                creativeEffect: {
                    prev: {

                        translate: ["-125%", 30, -300],
                    },
                    next: {

                        translate: ["50%", 30, -400],
                    },
                    limitProgress: 2
                },
                breakpoints: {
                    769: {
                        spaceBetween: rem(2),
                        slidesPerView: 'auto',
                    },
                },
                pagination: {
                    el: slider.querySelector('.swiper-pagination'),
                    clickable: true
                },
                navigation: {
                    prevEl: slider.querySelector('.swiper-btn-prev'),
                    nextEl: slider.querySelector('.swiper-btn-next')
                },
                on: {
                    slideChange: (swiper) => {
                        swiper.slides.forEach((slide) => {
                            slide.classList.remove('_hover');
                        });
                        const nextSlide = swiper.el.querySelector('.swiper-slide-next');
                        if (nextSlide) {
                            nextSlide.classList.add('_hover');
                        }

                    }
                }

            });
        })


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
function initWow() {
    const wow = new WOW({
        boxClass: "wow",
        animateClass: "animate__animated",
        offset: 200,
        mobile: false,
        live: true,
    });
    wow.init();
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
         html.addClass('lock')
    })


    modalClosers.on('click', (ev) => {
        const { classList } = ev.target
        if (!classList.contains('modal-closer')) return

        if (classList.contains('modal')) {
            $(ev.target).fadeOut().removeClass('_opened')

        } else {
            $(ev.target.closest('.modal')).fadeOut().removeClass('_opened')

        }
        html.removeClass('lock')
    })
}

function imagesHover() {
    const containers = document.querySelectorAll('.slider._images');
    if (!containers) return

    containers.forEach((c) => {
        const slides = c.querySelectorAll('.swiper-slide'),
            hover = '_hover'


        slides.forEach((s) => {
            if (s.classList.contains('swiper-slide-next')) {
                s.classList.add('_hover')
            }
            s.addEventListener('mouseover', (ev) => {
                c.querySelector('.swiper-slide._hover').classList.remove(hover)
                ev.currentTarget.classList.add(hover)
            })
        })

    })

}

