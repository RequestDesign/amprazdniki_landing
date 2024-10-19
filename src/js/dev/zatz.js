import $ from 'jquery'
import Form from '../utils/Form'
import Inputmask from 'inputmask'
import Swiper from 'swiper';
import { Navigation, Pagination, Grid, Autoplay, EffectFade } from 'swiper/modules';


$(function () {

    initSwipers()
    dropDowns()

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
                new Inputmask('+375 (999) 999-99-99').mask(phone);
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

function initSwichers() {
    /*   const basketDelivery = document.querySelector('.switcher-delivery')
      if (basketDelivery) {
          new Switcher(basketDelivery, 0)
      } */
}