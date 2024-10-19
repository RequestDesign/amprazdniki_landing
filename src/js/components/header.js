import $ from "jquery";

$(function(){
	$('.header-burger').click(function(){
		$('body').toggleClass('lock');
        $(this).parents('.header-container').toggleClass('active')
	});

	$(window).scroll(function () {
		var scrollPosition = $(window).scrollTop()

		if(scrollPosition > 0) {
			$('.header').addClass('on-top')
		} else {
			$('.header').removeClass('on-top')
		}
	})

});
