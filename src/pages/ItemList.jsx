import React, { useState } from 'react';
import Footer from '../components/Footer';
import '../styles/public.css';
import '../styles/index.css';
import '../styles/popup.css';

const products = [
    {
        id: 1,
        gender: '남성',
        name: '테니스 Coldwave+ 베이직 7인치 쇼츠',
        price: '79,900원',
        image: './image/item_list_coldwave_basic_shorts_white.jpg',
        colors: [
            { src: './image/item_list_coldwave_basic_shorts_white.jpg', alt: '화이트' },
            { src: './image/item_list_coldwave_basic_shorts2_black.jpg', alt: '블랙' },
            { src: './image/item_list_coldwave_basic_shorts3_sora.jpg', alt: '소라' },
        ],
        sizes: ['M(085)', 'L(090)', 'XL(095)', '2XL(100)'],
    },
    {
        id: 2,
        gender: '남성',
        name: '테니스 Coldwave 카라티',
        price: '109,000원',
        image: './image/item_list_coldwave_tshirt_white.jpg',
        colors: [
            { src: './image/item_list_coldwave_tshirt_white.jpg', alt: '화이트' },
        ],
        sizes: ['M(085)', 'L(090)', 'XL(095)', '2XL(100)'],
    },
    {
        id: 3,
        gender: '남성',
        name: '휠라 몬도 포르자 T7 2.0',
        price: '139,000원',
        image: './image/item_list_mondo_porza_white.jpg',
        colors: [
            { src: './image/item_list_mondo_porza_white.jpg', alt: '화이트' },
            { src: './image/item_list_mondo_porza_black.jpg', alt: '블랙' },
        ],
        sizes: ['230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280', '285', '290'],
    },
    {
        id: 4,
        gender: '남성',
        name: '휠라 몬도 포르자 T7 2.0',
        price: '139,000원',
        image: './image/item_list_mondo_porza_black.jpg',
        colors: [
            { src: './image/item_list_mondo_porza_black.jpg', alt: '블랙' },
            { src: './image/item_list_mondo_porza_white.jpg', alt: '화이트' },
        ],
        sizes: ['230', '235', '240', '245', '250', '255', '260', '265', '270', '275', '280', '285', '290'],
    },
    {
        id: 5,
        gender: '여성',
        name: '테니스 여성 골지 크롭 카라 반팔티',
        price: '69,900원',
        image: './image/item_list_crop_tshirt_white.jpg',
        colors: [
            { src: './image/item_list_crop_tshirt_white.jpg', alt: '화이트' },
            { src: './image/item_list_crop_tshirt_navy.jpg', alt: '네이비' },
        ],
        sizes: ['WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 6,
        gender: '여성',
        name: '테니스 여성 골지 크롭 카라 반팔티',
        price: '69,900원',
        image: './image/item_list_crop_tshirt_navy.jpg',
        colors: [
            { src: './image/item_list_crop_tshirt_navy.jpg', alt: '네이비' },
            { src: './image/item_list_crop_tshirt_white.jpg', alt: '화이트' },
        ],
        sizes: ['WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 7,
        gender: '여성',
        name: '테니스 소로나 카라 원피스',
        price: '109,000원',
        image: './image/item_list_sorona_onepiece_navy.jpg',
        colors: [
            { src: './image/item_list_sorona_onepiece_navy.jpg', alt: '네이비' },
            { src: './image/item_list_sorona_onepiece_white.jpg', alt: '화이트' },
        ],
        sizes: ['WXS(W80)', 'WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 8,
        gender: '여성',
        name: '테니스 소로나 카라 원피스',
        price: '109,000원',
        image: './image/item_list_sorona_onepiece_white.jpg',
        colors: [
            { src: './image/item_list_sorona_onepiece_white.jpg', alt: '화이트' },
            { src: './image/item_list_sorona_onepiece_navy.jpg', alt: '네이비' },
        ],
        sizes: ['WXS(W80)', 'WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 9,
        gender: '여성',
        name: '테니스 파워넷 게더 원피스',
        price: '139,000원',
        image: './image/item_list_powernet_onepiece_black.jpg',
        colors: [
            { src: './image/item_list_powernet_onepiece_black.jpg', alt: '블랙' },
            { src: './image/item_list_powernet_onepiece_white.jpg', alt: '화이트' },
        ],
        sizes: ['WXS(W80)', 'WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 10,
        gender: '여성',
        name: '테니스 파워넷 게더 원피스',
        price: '139,000원',
        image: './image/item_list_powernet_onepiece_white.jpg',
        colors: [
            { src: './image/item_list_powernet_onepiece_white.jpg', alt: '화이트' },
            { src: './image/item_list_powernet_onepiece_black.jpg', alt: '블랙' },
        ],
        sizes: ['WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 11,
        gender: '공용',
        name: '테니스 Drywave 클럽매치 자카드 카라티',
        price: '99,900원',
        image: './image/item_list_drywave_tshirt_black.jpg',
        colors: [
            { src: './image/item_list_drywave_tshirt_black.jpg', alt: '블랙' },
            { src: './image/item_list_drywave_tshirt_white.jpg', alt: '화이트' },
        ],
        sizes: ['M(085)', 'L(090)', 'XL(095)', '2XL(100)'],
    },
    {
        id: 12,
        gender: '공용',
        name: '테니스 Drywave 클럽매치 자카드 카라티',
        price: '99,900원',
        image: './image/item_list_drywave_tshirt_white.jpg',
        colors: [
            { src: './image/item_list_drywave_tshirt_white.jpg', alt: '화이트' },
            { src: './image/item_list_drywave_tshirt_black.jpg', alt: '블랙' },
        ],
        sizes: ['M(085)', 'L(090)', 'XL(095)', '2XL(100)'],
    },
    {
        id: 13,
        gender: '여성',
        name: '테니스 여성 Drywave 클럽매치 자카드 카라티',
        price: '109,000원',
        image: './image/item_list_drywave_tshirt_woman_sora.jpg',
        colors: [
            { src: './image/item_list_drywave_tshirt_woman_sora.jpg', alt: '소라' },
            { src: './image/item_list_drywave_tshirt_black.jpg', alt: '블랙' },
            { src: './image/item_list_drywave_tshirt_white.jpg', alt: '화이트' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
    {
        id: 14,
        gender: '여성',
        name: '테니스 CASA 플리츠 스커트',
        price: '109,000원',
        image: './image/item_list_casa_skirt_sora.jpg',
        colors: [
            { src: './image/item_list_casa_skirt_sora.jpg', alt: '소라' },
            { src: './image/item_list_casa_skirt_white.jpg', alt: '화이트' },
            { src: './image/item_list_casa_skirt_navy.jpg', alt: '네이비' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
    {
        id: 15,
        gender: '여성',
        name: '테니스 CASA 플리츠 스커트',
        price: '109,000원',
        image: './image/item_list_casa_skirt_white.jpg',
        colors: [
            { src: './image/item_list_casa_skirt_white.jpg', alt: '화이트' },
            { src: './image/item_list_casa_skirt_navy.jpg', alt: '네이비' },
            { src: './image/item_list_casa_skirt_sora.jpg', alt: '소라' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
    {
        id: 16,
        gender: '여성',
        name: '테니스 CASA 플리츠 스커트',
        price: '109,000원',
        image: './image/item_list_casa_skirt_navy.jpg',
        colors: [
            { src: './image/item_list_casa_skirt_navy.jpg', alt: '네이비' },
            { src: './image/item_list_casa_skirt_white.jpg', alt: '화이트' },
            { src: './image/item_list_casa_skirt_sora.jpg', alt: '소라' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
    {
        id: 17,
        gender: '여성',
        name: '테니스 크롭 카라 탱크탑',
        price: '79,900원',
        image: './image/item_list_crop_tanktop_white.jpg',
        colors: [
            { src: './image/item_list_crop_tanktop_white.jpg', alt: '화이트' },
            { src: './image/item_list_crop_tanktop_pink.jpg', alt: '핑크' },
        ],
        sizes: ['WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 18,
        gender: '여성',
        name: '테니스 크롭 카라 탱크탑',
        price: '79,900원',
        image: './image/item_list_crop_tanktop_pink.jpg',
        colors: [
            { src: './image/item_list_crop_tanktop_pink.jpg', alt: '핑크' },
            { src: './image/item_list_crop_tanktop_white.jpg', alt: '화이트' },
        ],
        sizes: ['WS(W85)', 'WM(W90)', 'WL(W95)'],
    },
    {
        id: 19,
        gender: '여성',
        name: '테니스 파워넷 게더 스커트',
        price: '109,000원',
        image: './image/item_list_powernet_skirt_navy.jpg',
        colors: [
            { src: './image/item_list_powernet_skirt_navy.jpg', alt: '네이비' },
            { src: './image/item_list_powernet_skirt_pink.jpg', alt: '핑크' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
    {
        id: 20,
        gender: '여성',
        name: '테니스 파워넷 게더 스커트',
        price: '109,000원',
        image: './image/item_list_powernet_skirt_pink.jpg',
        colors: [
            { src: './image/item_list_powernet_skirt_pink.jpg', alt: '핑크' },
            { src: './image/item_list_powernet_skirt_navy.jpg', alt: '네이비' },
        ],
        sizes: ['WS(W75)', 'WM(W80)', 'WL(W85)'],
    },
];

const ITEMS_PER_PAGE = 20;
const TOTAL_PAGES = 5;

function ProductCard({ product, onClick }) {
    const [hovered, setHovered] = useState(false);
    const [mainImage, setMainImage] = useState(product.image);

    return (
        <div
            className="item_list_container"
            onClick={() => onClick(product)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setMainImage(product.image);
            }}
            style={{ cursor: 'pointer' }}
        >
            <div className="item_list_detail">
                {/* 이미지 영역 */}
                <div className="image_box">
                    <img src={mainImage} alt="상품 이미지" />

                    {/* QUICK ADD 오버레이 */}
                    <div className={`quick_add${hovered ? ' visible' : ''}`}>
                        <div className="quick_add_header">
                            <span>QUICK ADD</span>
                            <i className="fa-solid fa-cart-plus" />
                        </div>
                        <div className="quick_add_size">
                            {product.sizes.map((size) => (
                                <a
                                    key={size}
                                    href="#"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {size}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 색상 스와치 */}
                <div className="item_color">
                    {product.colors.map((color) => (
                        <img
                            key={color.src}
                            src={color.src}
                            alt={color.alt}
                            onMouseEnter={() => setMainImage(color.src)}
                            onClick={(e) => {
                                e.stopPropagation();
                                setMainImage(color.src);
                            }}
                        />
                    ))}
                </div>

                {/* 상품 정보 */}
                <div className="item_info">
                    <span>{product.gender}</span>
                    <p>{product.name}</p>
                    <strong>{product.price}</strong>
                </div>
            </div>
        </div>
    );
}

function ItemList({ setCurrentPage }) {
    const [activePage, setActivePage] = useState(1);

    const handlePageChange = (page) => {
        if (page < 1 || page > TOTAL_PAGES) return;
        setActivePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* 상품 리스트 헤더 */}
            <section id="item_list_header">
                <div className="item_list_title">
                    <h2>TENNIS</h2>
                    <span>100</span>
                </div>
                <div className="item_list_tag">
                    <span>여성</span>
                    <span>남성</span>
                </div>
                <div className="filter_button_container">
                    <button className="filter_button active" type="button">
                        <span>필터 보기</span>
                        <i className="fa-solid fa-sliders" />
                    </button>
                    <button className="filter_button" type="button">
                        <span>신상품 순</span>
                        <i className="fa-solid fa-angle-down" />
                    </button>
                </div>
            </section>

            {/* 상품 리스트 */}
            <section id="item_list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setCurrentPage('detail')}
                    />
                ))}
            </section>

            {/* 페이지네이션 */}
            <section id="item_list_bottom">
                <nav className="item_list_page_nav" aria-label="페이지 선택">
                    <ul className="item_list_page_button">
                        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
                            <li key={page}>
                                <a
                                    href="#"
                                    className={`page_num${activePage === page ? ' active' : ''}`}
                                    aria-current={activePage === page ? 'page' : undefined}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(page);
                                    }}
                                >
                                    {page}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a
                                href="#"
                                className="page_next"
                                aria-label="다음 페이지"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(activePage + 1);
                                }}
                                style={{
                                    opacity: activePage === TOTAL_PAGES ? 0.3 : 1,
                                    cursor: activePage === TOTAL_PAGES ? 'not-allowed' : 'pointer',
                                }}
                            >
                                <i className="fa-solid fa-angle-right" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </section>
            <Footer />
        </>
    );
}

export default ItemList;
