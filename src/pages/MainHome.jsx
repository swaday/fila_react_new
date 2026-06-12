import React, { useEffect, useRef, useState } from 'react';
import EmblaCarousel from 'embla-carousel';

import TrendingSection from '../components/TrendingSection';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/public.css';
import '../styles/index.css';
import '../styles/popup.css';



function MainHome({ setCurrentPage }) {
    const emblaViewportRef = useRef(null);
    const emblaPrevRef = useRef(null);
    const emblaNextRef = useRef(null);
    const shopSliderRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);


    // Embla 캐러셀 + Shop the Look 드래그 슬라이더
    useEffect(() => {
        let emblaApi = null;
        const prevBtn = emblaPrevRef.current;
        const nextBtn = emblaNextRef.current;

        const scrollPrev = () => { if (emblaApi) emblaApi.scrollPrev(); };
        const scrollNext = () => { if (emblaApi) emblaApi.scrollNext(); };

        if (emblaViewportRef.current) {
            try {
                emblaApi = EmblaCarousel(emblaViewportRef.current, { loop: true });
                if (prevBtn) prevBtn.addEventListener('click', scrollPrev);
                if (nextBtn) nextBtn.addEventListener('click', scrollNext);
            } catch (error) {
                console.error('Embla Carousel 초기화 에러:', error);
            }
        }

        // Shop the Look 드래그 슬라이더 + 자동 흐름
        const slider = shopSliderRef.current;
        if (!slider) {
            return () => {
                if (emblaApi) emblaApi.destroy();
                if (prevBtn) prevBtn.removeEventListener('click', scrollPrev);
                if (nextBtn) nextBtn.removeEventListener('click', scrollNext);
            };
        }

        let isDown = false;
        let startX;
        let scrollLeft;
        let isPaused = false;
        const scrollSpeed = 1;
        let animationId;

        function autoPlay() {
            if (!isDown && !isPaused) {
                const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
                if (slider.scrollLeft >= maxScrollLeft - 1) {
                    slider.scrollLeft = 0;
                } else {
                    slider.scrollLeft += scrollSpeed;
                }
            }
            animationId = requestAnimationFrame(autoPlay);
        }
        autoPlay();

        const onMouseEnter = () => { isPaused = true; };
        const onMouseLeave = () => { isPaused = false; };
        const onDragStart = (e) => e.preventDefault();
        const onMouseDown = (e) => {
            if (e.button !== 0) return;
            isDown = true;
            slider.classList.add('active');
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.scrollBehavior = 'auto';
        };
        const onMouseUpOrLeave = () => {
            if (!isDown) return;
            isDown = false;
            slider.classList.remove('active');
            slider.style.cursor = 'grab';
            slider.style.scrollBehavior = 'smooth';
        };
        const onMouseMove = (e) => {
            if (e.buttons === 0 && isDown) {
                isDown = false;
                slider.classList.remove('active');
                slider.style.cursor = 'grab';
                return;
            }
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        };

        slider.addEventListener('mouseenter', onMouseEnter);
        slider.addEventListener('mouseleave', onMouseLeave);
        slider.addEventListener('dragstart', onDragStart);
        slider.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUpOrLeave);
        window.addEventListener('blur', onMouseUpOrLeave);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            if (emblaApi) emblaApi.destroy();
            if (prevBtn) prevBtn.removeEventListener('click', scrollPrev);
            if (nextBtn) nextBtn.removeEventListener('click', scrollNext);
            cancelAnimationFrame(animationId);
            slider.removeEventListener('mouseenter', onMouseEnter);
            slider.removeEventListener('mouseleave', onMouseLeave);
            slider.removeEventListener('dragstart', onDragStart);
            slider.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUpOrLeave);
            window.removeEventListener('blur', onMouseUpOrLeave);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);


    return (
        <div id="container">

            <main>
                {/* 3. 히어로 섹션 (Embla 캐러셀 - 비디오 3개) */}
                <div className="embla">
                    <div className="embla__viewport" ref={emblaViewportRef}>
                        <div className="embla__container">
                            <div className="embla__slide">
                                <video playsInline autoPlay loop muted preload="metadata">
                                    <source src="//www.fila.co.kr/cdn/shop/videos/c/vp/40ed1433d6f740edae9171f7a3066c3a/40ed1433d6f740edae9171f7a3066c3a.HD-1080p-7.2Mbps-83835070.mp4?v=0" type="video/mp4" />
                                </video>
                            </div>
                            <div className="embla__slide">
                                <video playsInline autoPlay loop muted preload="metadata">
                                    <source src="https://www.fila.co.kr/cdn/shop/videos/c/vp/2d2319ff42ad47578bfdc01800606d5f/2d2319ff42ad47578bfdc01800606d5f.HD-1080p-7.2Mbps-84613462.mp4?v=0" type="video/mp4" />
                                </video>
                            </div>
                            <div className="embla__slide">
                                <video playsInline autoPlay loop muted preload="metadata">
                                    <source src="https://www.fila.co.kr/cdn/shop/videos/c/vp/c3aa65635a1d4ef3b623ce94cf4b9d36/c3aa65635a1d4ef3b623ce94cf4b9d36.HD-1080p-7.2Mbps-83547078.mp4?v=0" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="embla__prev" ref={emblaPrevRef}>
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    <button type="button" className="embla__next" ref={emblaNextRef}>
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>

                {/* 4. 메인 상품 리스트 섹션 (탭 7개) */}
                <TrendingSection setCurrentPage={setCurrentPage} />

                {/* 5. 광고 배너 섹션 1 (Fila Edit) */}
                <section className="edit_section">
                    <h2>Fila Edit</h2>
                    <div className="image_container">
                        <img className="main" src="./image/banner1.webp" height="961" width="797" alt="banner_main" />
                        <img className="sub" src="./image/banner1_2.jpg" height="530" width="503" alt="banner_sub" />
                    </div>
                    <div className="label_container">
                        {['아일릿1','ARC','쿨링반팔','SEOUL','테니스','Speed-Serve 2.0','클럽매치','Windbreaker','슬릭 실루엣','Heritage','썸머 슈즈'].map((label, i) => (
                            <a key={i} href="#" onClick={(e) => e.preventDefault()}>{label}</a>
                        ))}
                    </div>
                </section>

                {/* 6. 광고 배너 섹션 2 (The beginning of FILA) */}
                <section className="informational_section">
                    <h2>The beginning of FILA<br />1911 &amp; Everyday</h2>
                    <div>
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ backgroundImage: "url('./image/banner_half_1.webp')" }}>
                            <div className="information">
                                <h3>Control The Court</h3>
                                <p>코트 위 퍼포먼스를 위해 설계된<br />휠라 테니스 제품을 만나보세요</p>
                            </div>
                            <button type="button" className="arrow_button">
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </a>
                        <a href="#" onClick={(e) => e.preventDefault()} style={{ backgroundImage: "url('./image/banner_half_2.webp')" }}>
                            <div className="information">
                                <h3>Pace Your Day</h3>
                                <p>일상부터 퍼포먼스까지, 당신의 러닝을<br />완성하는 한 켤레를 만나보세요.</p>
                            </div>
                            <button type="button" className="arrow_button">
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </a>
                    </div>
                </section>

                {/* 7. 광고 배너 섹션 3 (FILA 아카이브) */}
                <section className="informational_section2">
                    <div>
                        <img className="logo" src="./image/logo/logo.svg" height="80" width="80" alt="logo" />
                        <p className="information">
                            FILA 아카이브를 기반으로 브랜드의<br /> 클래식한 정체성을 담아낸 헤리티지 컬렉션을 소개합니다.<br /> 1911 &amp; Everyday Since
                        </p>
                        <button type="button" className="arrow_button">
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                    <div>
                        <img className="informational_section2_banner_image" src="./image/banner4.webp" alt="" />
                    </div>
                </section>

                {/* 8. 광고 배너 섹션 4 (Featured Collections) */}
                <section className="collection_section">
                    <div className="collection_section_header">
                        <h2>Featured Collections</h2>
                        <div>
                            <button type="button" className="arrow_button"><i className="fa-solid fa-caret-left"></i></button>
                            <button type="button" className="arrow_button"><i className="fa-solid fa-caret-right"></i></button>
                        </div>
                    </div>
                    <div className="collection_section_wrapper">
                        <div className="collection_section_item">
                            <a href="#" onClick={(e) => e.preventDefault()} style={{ backgroundImage: "url('./image/collection1.jpg')" }}>
                                <div><h3>26SS<br />The Court Is Yours</h3><p>Tennis Collection : 코트 위 당신의 무대</p></div>
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()} className="active" style={{ backgroundImage: "url('./image/collection2.jpg')" }}>
                                <div><h3>ILLIT's Cozy Prep</h3><p>아일릿만의 코지한 프레피 스타일</p></div>
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()} style={{ backgroundImage: "url('./image/collection3.jpg')" }}>
                                <div><h3>Cool<br />Windbreaker</h3><p>투명한 텍스처로 완성하는 쿨한 스타일링</p></div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* 9. 광고 배너 섹션 5 (Shop the Look - 자동 드래그 슬라이더) */}
                <section className="informational_section3">
                    <div className="informational_section3_header">
                        <h2>Shop the Look</h2>
                        <button type="button" className="arrow_button">
                            <span>더보기</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                    </div>
                    <ul className="slide_container" ref={shopSliderRef} style={{ cursor: 'grab' }}>
                        {['shop1','shop2','shop3','shop4','shop5','shop6','shop7','shop8','shop9'].map((name, i) => (
                            <li key={i} role="button" onClick={() => setIsModalOpen(true)}>
                                <img src={`./image/${name}.webp`} alt="" />
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 10. 헤리티지 단락 섹션 */}
                <section className="paragraph_section">
                    <div>
                        <b>과감한 컬러 미학으로 휠라만의 헤리티지를 쌓아온 115년</b>
                        <br /><br />
                        <p>
                            휠라의 스테디셀러 에샤페 역시, 감각적인 컬러 팔레트로<br />
                            다양한 라인업을 선보이며 꾸준히 사랑 받고 있습니다.
                        </p>
                    </div>
                    <div className="paragraph_img_container">
                        <img src="https://www.fila.co.kr/cdn/shop/files/26SS_tennis_20_800x.jpg?v=1778636026" alt="image_tennis1" />
                        <img src="./image/image1.webp" alt="image_tennis2" />
                    </div>
                </section>
            </main>

            {/* 11. 푸터 */}
            <Footer />

            {/* 12. 플로팅 모달 (Shop the Look 클릭 시) */}
            <div
                className={`modal_container${isModalOpen ? ' active' : ''}`}
                onClick={(e) => { if (e.target.classList.contains('modal_container')) setIsModalOpen(false); }}
            >

                <div className="modal">
                    <section className="image_section">
                        <img src="./image/banner_half_2.webp" alt="#" />
                    </section>
                    <section className="form_section">
                        <div className="select_container">
                            <div>
                                <input type="checkbox" id="select_all" />
                                <label htmlFor="select_all">전체선택</label>
                            </div>
                            <button type="button" className="close_btn" onClick={() => setIsModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="product_container">
                            <ul>
                                <li>
                                    <div className="product_item">
                                        <input type="checkbox" id="product1" />
                                        <label htmlFor="product1">
                                            <img src="./image/item1.webp" alt="에샤페 벨크로 메리제인 초코" />
                                            <b>에샤페 벨크로 메리제인 초코</b>
                                            <span>BROWN,BROWN,BROWN</span>
                                            <strong>99,900원</strong>
                                        </label>
                                    </div>
                                    <div className="product_size" role="button">
                                        <span>사이즈 선택</span>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </li>
                                <li>
                                    <div className="product_item">
                                        <input type="checkbox" id="product2" />
                                        <label htmlFor="product2">
                                            <img src="./image/item2.webp" alt="에샤페 실버문" />
                                            <b>에샤페 실버문</b>
                                            <span>Grey, White, White</span>
                                            <strong>109,000원</strong>
                                        </label>
                                    </div>
                                    <div className="product_size" role="button">
                                        <span>사이즈 선택</span>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </li>
                                <li>
                                    <div className="product_item">
                                        <input type="checkbox" id="product3" />
                                        <label htmlFor="product3">
                                            <img src="./image/item3.webp" alt="에샤페 LX 크림" />
                                            <b>에샤페 LX 크림</b>
                                            <span>WHITE,BROWN,WHITE</span>
                                            <strong>119,000원</strong>
                                        </label>
                                    </div>
                                    <div className="product_size" role="button">
                                        <span>사이즈 선택</span>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="total_price_container">
                            <b>주문금액</b>
                            <b>1,000,000원</b>
                        </div>
                        <div className="submit_container">
                            <button type="button">장바구니 담기</button>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    );
}

export default MainHome;
