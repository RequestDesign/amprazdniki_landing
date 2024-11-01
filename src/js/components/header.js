import $ from "jquery";

$(function(){


	$(window).scroll(function () {
		var scrollPosition = $(window).scrollTop()

		if(scrollPosition > 0) {
			$('.header').fadeOut()
		} else {
			$('.header').fadeIn()
		}
	})

});
