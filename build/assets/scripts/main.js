$(document).ready(function () {

	$('.main-cards-item-wrap .main-cards-item').height(function(){
		var hgCard = $('.main-cards-item-wrap .main-cards-item').width() * 1.29257641921;
		return hgCard;
	});

	$('.share-label').click(function(){
		$('.share-label-svg3').toggleClass('share-label-svg-none');
		$('.share-label-svg1').toggleClass('share-label-svg-none');
		$('.share-label-svg2').toggleClass('share-label-svg-none');
		$('.share-label-svg1').toggleClass('active-share');
		$('.share-label-svg2').toggleClass('active-share');
	});

	if(document.title == 'Главная' || document.title == 'Карта'){
		$(document).find('.breadcrumbs').attr('style', 'display: none;');
	}

	if(document.title == 'Каталог'){
		$(document).find('.breadcrumbs').addClass('catalog-breadcrumbs');
	}

	if(document.title == 'Статья' || document.title == 'О компании'){
		$(document).find('.breadcrumbs').addClass('white-breadcrumbs');
		$(document).find('.breadcrumbs').addClass('ban-breadcrumbs');
	}

	$(document).find('.main-banner').slick({
		arrows: true,
		dots: true,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false
				}
			}
		]
	});

	let goodSlider = $(document).find('.good-top-slider').slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		verticalSwiping: true,
		lazyLoad: 'progressive',
		responsive: [
			{
				breakpoint: 767,
				settings: {
					vertical: false,
					verticalSwiping: false,
					dots: false
				}
			}
		]
	});
	goodSlider.on('wheel', (function(e) {
		if(screen.width > 767){
			e.preventDefault();
			if (e.originalEvent.deltaY < 0) {
				$(this).slick('slickPrev');
			} else {
				$(this).slick('slickNext');
			}
		}
	}));

	var slickClone = '.good-top-slider .slick-slide:not(.slick-cloned) a';
	// Init fancybox, skip cloned elements
	$().fancybox({
		selector : slickClone,
		backFocus : false,
		animationEffect : "fade",
		loop : true
	});

	var goodTabContainers = $('div.good-tabs > div');
	goodTabContainers.hide().filter(':first').show();
	$(document).find('div.good-tabs ul.good-tabs-navigation a').eq(0).addClass('selected');
	$('div.good-tabs ul.good-tabs-navigation a').click(function () {
		goodTabContainers.hide();
		goodTabContainers.filter(this.hash).show();
		$('div.good-tabs ul.good-tabs-navigation a').removeClass('selected');
		$(this).addClass('selected');
		var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 80
    }, 400);
		return false;
	});

	$(document).find('.pagenews-content-slider').slick({
		centerMode: true,
		variableWidth: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
		]
	});

	$(document).find('[name="tel"]').inputmask({
		mask: "+7 (999) 999-99-99",
		showMaskOnHover: false,
		showMaskOnFocus: true
	});
	$(document).find('[name="email"]').inputmask({ 
		alias: "email",
		showMaskOnHover: false,
		showMaskOnFocus: true
	});

	resizewindow();
	$(window).resize(function(e){
		resizewindow();
	});

});

$(document).on('click', '.header-right-info a:first-child, .header-popupmenu-item-bot a:first-child', function (e) {
	if (screen.width > 1365)
		e.preventDefault();
});

$(document).on('click', '.header-menu-btn', function (e) {
	$(document).find('.header-popupmenu').addClass('active fadeInDown animated');
	if ($(this).hasClass('active')) {
		$(document).find('.header-popupmenu').removeClass('fadeInDown');
		$(document).find('.header-popupmenu').addClass('fadeOutUp');
	} else {
		$(document).find('.header-popupmenu').removeClass('fadeOutUp');
	}
	$(this).toggleClass('active');
});
$(document).on('click touchstart', function (e) {
	var div = $('.header-popupmenu');
	if ( div.hasClass('fadeInDown') && !div.is(e.target) && div.has(e.target).length === 0 && !$('.header-menu-btn span').is(e.target) && !$('.header-menu-btn').is(e.target) ) {
		div.removeClass('fadeInDown');
		div.addClass('fadeOutUp');
		$(document).find('.header-menu-btn').removeClass('active');
	}
});

$(document).on('click', '.header-right-search', function (e) {
	$(this).closest('.header-right').addClass('active');
	$(this).find('input').focus();
	$(document).find('.header-menu').addClass('active');
});
$(document).on('click touchstart', function (e) {
	if ( $('.header-right').hasClass('active') && !$('.header-right-search').is(e.target) && !$('.header-right-search svg').is(e.target) && !$('.header-right-search input').is(e.target) && !$('.header-right-search button').is(e.target) && !$('.header-right-search path').is(e.target) ) {
		$(document).find('.header-right').removeClass('active');
		$(document).find('.header-menu').removeClass('active');
	}
});

$(document).on('click', '.catalog-filter-item__title', function(){
	$(this).toggleClass('out');
	$(this).next().slideToggle();
	$('.catalog-filter-item__title').not(this).removeClass('out').next().slideUp();
});

$(window).scroll(function() {
	if (screen.width > 1023) {
		let navigation = $(document).find('.catalog-filter-wrap'),
			contentDiv = $(document).find('.catalog-main')[0],
			contentNode = $(document).find('.catalog-main');
		if (contentDiv && contentNode){
			if ( (contentDiv.offsetTop - 100 <= $(this).scrollTop()) && (contentDiv.offsetTop + contentNode.height() - 130 - navigation.height() > $(this).scrollTop()) ) {
				navigation.removeClass('fixed-bottom');
				navigation.addClass('fixed');
			} else if ( contentDiv.offsetTop + contentNode.height() - 130 - navigation.height() <= $(this).scrollTop() ) {
				navigation.removeClass('fixed');
				navigation.addClass('fixed-bottom');
			} else if ( contentDiv.offsetTop - 100 > $(this).scrollTop() ){
				navigation.removeClass('fixed');
				navigation.removeClass('fixed-bottom');
			}
		}
	}
});

function resizewindow() {
	let hideItemFilter = $(document).find('.catalog-filter-item-radios');
	for (let i = 0; i < hideItemFilter.length; i++) {
		if (i == 0) {
			$(this).toggleClass('out');
			hideItemFilter.eq(i).slideDown();
			hideItemFilter.eq(i).siblings('.catalog-filter-item__title').addClass('out');
		} else {
			hideItemFilter.eq(i).prev().removeClass('out');
			hideItemFilter.eq(i).slideUp();
		}
	}
	if (screen.width > 767) {
		$(document).find('.pagenews-top-banner').css('height', $(document).find('.pagenews-top-banner').width() * 0.2777 + 'px');
		$(document).find('.about__banner').css('height', $(document).find('.about__banner').width() * 0.2777 + 'px');
	} else {
		$(document).find('.pagenews-top-banner').css('height', '');
		$(document).find('.about__banner').css('height', '');
	}
	if (screen.width < 768) {
		$(document).find('.white-breadcrumbs').removeClass('white-breadcrumbs');
	} else{
		$(document).find('.ban-breadcrumbs').addClass('white-breadcrumbs');
	}

	$('.main-cards-item-wrap .main-cards-item').height(function(){
		var hgCard = $('.main-cards-item-wrap .main-cards-item').width() * 1.29257641921;
		return hgCard;
	});

};


$(document).ready(function(){
	var hgFilter = $('.catalog-filter').innerHeight();
	if ($(document).width() < 1024) {
		$(document).on('click', '.catalog-filter-item__title', function (e){
			hgFilter = $('.catalog-filter').innerHeight();
			$(".wrapper").css({"height": (hgFilter - 300)});
		});
	}

	$(document).on('click', '.catalog-filter__btnClose', function (e){
		$(".wrapper").css({
			
			
			"height": "100%"
		});
		$('.catalog-filter').hide();
	});
	$(document).on('click', '.catalog-main__btnFilter', function (e){
		
		$(".wrapper").css({
			"height": (hgFilter - 300),
			"overflow": "hidden"
		});
		$('.catalog-filter').show();
	});
});