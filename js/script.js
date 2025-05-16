
		document.addEventListener('DOMContentLoaded', function () {
		  const toggleBtn = document.querySelector('.mobile-toggle');
		  const mainMenu = document.querySelector('.main-menu');
		  const menuItems = document.querySelectorAll('.main-menu > li');
	  
		  toggleBtn.addEventListener('click', function () {
			mainMenu.classList.toggle('active');
		  });
	  
		  menuItems.forEach(item => {
			const dropdown = item.querySelector('.dropdown');
			const mainLink = item.querySelector('a');
	  
			if (dropdown && window.innerWidth <= 768) {
			  mainLink.addEventListener('click', function (e) {
				e.preventDefault();
	  
				// Đóng các dropdown khác
				menuItems.forEach(otherItem => {
				  if (otherItem !== item) {
					const otherDropdown = otherItem.querySelector('.dropdown');
					if (otherDropdown) otherDropdown.classList.remove('active');
				  }
				});
	  
				dropdown.classList.toggle('active');
			  });
			}
		  });
		});
	  

	// <!--MENU SIDEBAR-- >
        
        let menuManuallyClosed = false;
        let initialLoadComplete = false;
        
        const toggleMenu = () => {
            const menu = document.getElementById('floatingMenu');
            
            if (menu.classList.contains('visible')) {
                menuManuallyClosed = true;
                menu.classList.remove('visible');
            } else {
                menu.classList.add('visible');
            }
        };
        
        document.getElementById('menuToggle').addEventListener('click', toggleMenu);
        
        window.addEventListener('scroll', () => {
            const menu = document.getElementById('floatingMenu');
            
            if (window.scrollY > 100) {
                if (!menuManuallyClosed && !initialLoadComplete) {
                    menu.classList.add('visible');
                    initialLoadComplete = true;
                }
            } else {
                if (initialLoadComplete && !menuManuallyClosed) {
                    initialLoadComplete = false;
                }
            }
        });


		const tabButtons = document.querySelectorAll('.tab-btn');
		const tabContents = document.querySelectorAll('.tab-content');

		tabButtons.forEach(button => {
			button.addEventListener('click', () => {
				tabButtons.forEach(btn => btn.classList.remove('bg-bgNameMenu', 'bg-contain', 'bg-no-repeat', 'bg-center', 'text-white'));
				tabButtons.forEach(btn => btn.classList.add('text-yellow-500', 'border-transparent'));

				tabContents.forEach(content => content.classList.add('hidden'));

				button.classList.add('bg-bgNameMenu', 'bg-contain', 'bg-no-repeat', 'bg-center', 'text-white');
				button.classList.remove('text-white', 'border-transparent');
				document.getElementById(button.getAttribute('data-tab')).classList.remove('hidden');
			});
		});


		var swiper = new Swiper(".swiper1", {
			slidesPerView: 1,
			loop: true,
			// autoplay: {
			// 	delay: 1000,
			// 	disableOnInteraction: false
			// },
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
		});


		var swiper = new Swiper(".swiper2", {
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: 1.2,
			coverflowEffect: {
				rotate: 0,
				stretch: 0,
				depth: 100,
				modifier: 4,
				slideShadows: true
			},
			// autoplay: {
			// 	delay: 2500,
			// 	disableOnInteraction: false
			// },	
			keyboard: {
				enabled: true
			},
			// mousewheel: {
			// 	thresholdDelta: 70
			// },
			loop: true,
			pagination: {
				el: ".swiper-pagination",
				clickable: true
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			},
			breakpoints: {
				640: {
					slidesPerView: 2
				},
				768: {
					slidesPerView: 2
				},
				1024: {
					slidesPerView: 2
				},
				1560: {
					slidesPerView: 2
				}
			}
		});


		const slides = document.querySelectorAll('.slide');
		const buttons = document.querySelectorAll('.nav-btn');
		let currentIndex = 0;
		let isAnimating = false;

		function setupSlide(slide) {
			const parts = slide.querySelectorAll('.part');
			gsap.set(parts, {
				opacity: 0,
				x: function (index) {
					if (index === 0) return -200;
					if (index === 1) return -200; 
					if (index === 2) return 200;
				},
				y: 0 
			});
		}

		// Hàm chạy animation cho từng phần tử trong slide
		function animateInParts(slide) {
			const parts = slide.querySelectorAll('.part');
			const tl = gsap.timeline();

			tl.to(parts[2], {
				x: 0,
				opacity: 1,
				duration: 0.5
			});

			tl.to(parts[0], {
				x: 0,
				opacity: 1,
				duration: 0.5
			});

			tl.to(parts[1], {
				x: 0,
				opacity: 1,
				duration: 0.5
			});

			return tl;
		}

		function changeSlide(index) {
			if (index === currentIndex || isAnimating) return;

			isAnimating = true;
			const currentSlide = slides[currentIndex];
			const nextSlide = slides[index];

			setupSlide(nextSlide);
			nextSlide.classList.add('active');

			const masterTimeline = gsap.timeline();

			masterTimeline.to(currentSlide, {
				opacity: 0,
				duration: 0.4
			});

			masterTimeline.to(nextSlide, {
				opacity: 1,
				duration: 0.3
			}).add(() => {
				// Cho phép bấm tiếp ngay sau khi hiển thị slide mới
				currentSlide.classList.remove('active');
				currentIndex = index;
				isAnimating = false;
			}, "+=0");

			// Chạy animation của phần tử trong slide song song
			masterTimeline.add(animateInParts(nextSlide), "-=0.2");
		}


		buttons.forEach(btn => {
			btn.addEventListener('click', () => {
				const index = parseInt(btn.getAttribute('data-index'));
				changeSlide(index);

				buttons.forEach(b => b.classList.remove('active'));
				btn.classList.add('active');
			});
		});

		// Slide đầu tiên khi load
		window.addEventListener('DOMContentLoaded', () => {
			setupSlide(slides[0]);
			animateInParts(slides[0]);

			buttons[0].classList.add('active');
		});