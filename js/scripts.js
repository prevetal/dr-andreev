// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]
OVERLAY = document.querySelector('.overlay')


document.addEventListener('DOMContentLoaded', function () {
	// Результат
	$('.results .wheelSlider-container').wheelSlider({
		controls: false,
		dots: false,
		items: 5
	})


	// Карусель ответов
	const answersSliders = [],
		answers = document.querySelectorAll('.answers .swiper')

	answers.forEach(function (el, i) {
		el.classList.add('answerss_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			centeredSlides: true,
			speed: 6000,
			autoplay: {
				delay: 1,
			},
			allowTouchMove: false,
			disableOnInteraction: true,
			slidesPerView: 'auto',
			breakpoints: {
				0: {
					spaceBetween: 24
				},
				1440: {
					spaceBetween: 35
				}
			}
		}

		answersSliders.push(new Swiper('.answerss_s' + i, options))
	})


	// Страница работы
	if ($('.work_info .slider').length) {
		const workThumbs = new Swiper('.work_info .slider .thumbs .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			slidesPerView: 'auto',
			spaceBetween: 13
		})

		new Swiper('.work_info .slider .big .swiper', {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 13,
			slidesPerView: 1,
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			thumbs: {
				swiper: workThumbs
			},
			on: {
				activeIndexChange: swiper => {
					setTimeout(() => {
						let videos = document.querySelectorAll('.work_info .slider video')

						videos.forEach(video => {
							video.pause()
							video.currentTime = 0
						})
					})
				}
			}
		})
	}


	// Coockie
	$('.cookie .btn').click(function(e) {
		e.preventDefault()

		$('.cookie').hide()
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: "Закрыть",
		NEXT: "Следующий",
		PREV: "Предыдущий",
		MODAL: "Вы можете закрыть это модальное окно нажав клавишу ESC"
	}

	Fancybox.defaults.template = {
		closeButton: '<svg><use xlink:href="images/sprite.svg#ic_close"></use></svg>',
		spinner: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="25 25 50 50" tabindex="-1"><circle cx="50" cy="50" r="20"/></svg>',
		main: null
	}


	// Всплывающие окна
	const modalBtns = document.querySelectorAll('.modal_btn')

	if (modalBtns) {
		modalBtns.forEach(el => {
			el.addEventListener('click', e => {
				e.preventDefault()

				Fancybox.close()

				Fancybox.show([{
					src: document.getElementById(el.getAttribute('data-modal')),
					type: 'inline'
				}])
			})
		})
	}

	$('.modal .close_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Увеличение картинки
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false,
		},
		Thumbs: {
			autoStart: false,
		}
	})


	// Моб. меню
	const mobMenuBtn = document.querySelector('.mob_header .mob_menu_btn'),
		mobMenu = document.querySelector('header'),
		mobMenuCloseBtn = document.querySelector('header .mob_close_btn')

	if (mobMenuBtn) {
		mobMenuBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')

			$('.overlay').fadeIn(300)
		})
	}

	if (mobMenuCloseBtn) {
		mobMenuCloseBtn.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')

			$('.overlay').fadeOut(200)
		})

		OVERLAY.addEventListener('click', e => {
			e.preventDefault()

			mobMenuBtn.classList.toggle('active')
			BODY.classList.toggle('menu_open')
			mobMenu.classList.toggle('show')

			$('.overlay').fadeOut(200)
		})
	}


	// Кнопка 'Вверх'
	let buttonUpBtn = document.querySelector('.buttonUp .btn'),
		buttonUp = document.querySelector('.buttonUp')

	if (buttonUpBtn) {
		buttonUpBtn.addEventListener('click', e => {
			e.preventDefault()

			window.scrollTo({ top: 0, behavior: 'smooth' })
		})
	}


	// Плавная прокрутка к якорю
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Отправка форм
	$('.form').submit(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})
})



window.addEventListener('scroll', function () {
	// Кнопка 'Вверх'
	let buttonUp = document.querySelector('.buttonUp')

	if (typeof WH !== 'undefined' && buttonUp) {
		window.scrollY > WH
			? $('.buttonUp').fadeIn(300)
			: $('.buttonUp').fadeOut(200)
	}
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})