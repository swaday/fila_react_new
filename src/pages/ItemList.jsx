import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Footer from '../components/Footer';
import '../styles/public.css';
import '../styles/index.css';
import '../styles/popup.css';

/* ------------------------------------------------------------------
 * 필터 옵션 정의
 * ------------------------------------------------------------------ */
const FILTER_OPTIONS = {
    gender: {
        label: '성별',
        options: ['남성', '여성', '공용'],
    },
    color: {
        label: '색상',
        options: [
            { value: '화이트', hex: '#FFFFFF' },
            { value: '블랙', hex: '#111111' },
            { value: '네이비', hex: '#1B2A4A' },
            { value: '소라', hex: '#7EC8D8' },
            { value: '핑크', hex: '#F4A7B4' },
        ],
    },
    price: {
        label: '가격',
        options: ['~69,900원', '79,900원~99,900원', '109,000원~'],
    },
    size: {
        label: '사이즈',
        options: ['S/WXS', 'M/WS', 'L/WM', 'XL/WL', '2XL', '230~250', '255~275', '280~'],
    },
};

/* ------------------------------------------------------------------
 * 필터 드로어 컴포넌트 (우측에서 슬라이드)
 * ------------------------------------------------------------------ */
function FilterDrawer({ open, onClose, filters, onFiltersChange, totalCount }) {
    const [localFilters, setLocalFilters] = useState(filters);
    const [expandedSections, setExpandedSections] = useState({
        gender: true,
        color: true,
        price: true,
        size: true,
    });

    // 드로어 열릴 때 현재 필터 동기화
    useEffect(() => {
        if (open) setLocalFilters(filters);
    }, [open, filters]);

    // ESC 키로 닫기
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    const toggleSection = (key) =>
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));

    const toggleOption = (category, value) => {
        setLocalFilters((prev) => {
            const current = prev[category] || [];
            return {
                ...prev,
                [category]: current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });
    };

    const totalSelected = Object.values(localFilters).flat().length;

    const handleApply = () => {
        onFiltersChange(localFilters);
        onClose();
    };

    const handleReset = () => {
        const empty = { gender: [], color: [], price: [], size: [] };
        setLocalFilters(empty);
        onFiltersChange(empty);
    };

    const drawerStyle = {
        position: 'fixed',
        top: 0,
        right: open ? 0 : '-420px',
        width: '420px',
        maxWidth: '100vw',
        height: '100%',
        background: '#fff',
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'column',
        transition: 'right 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: open ? '-8px 0 40px rgba(0,0,0,0.15)' : 'none',
    };

    return createPortal(
        <>
            {/* 딤 오버레이 */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(0,0,0,0.4)',
                    zIndex: 10000,
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none',
                    transition: 'opacity 0.35s ease',
                }}
            />

            {/* 드로어 */}
            <div style={drawerStyle}>
                {/* 헤더 */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '22px 24px 18px',
                    borderBottom: '1px solid #E8E8E8',
                    flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>필터</span>
                        {totalSelected > 0 && (
                            <span style={{
                                background: '#111', color: '#fff',
                                borderRadius: 12, fontSize: 11, fontWeight: 700,
                                padding: '2px 8px', lineHeight: 1.5,
                            }}>
                                {totalSelected}
                            </span>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#333', padding: 4 }}
                        aria-label="필터 닫기"
                    >
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>

                {/* 필터 본문 스크롤 영역 */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
                    {Object.entries(FILTER_OPTIONS).map(([key, { label, options }]) => (
                        <div key={key} style={{ borderBottom: '1px solid #F0F0F0' }}>
                            {/* 섹션 헤더 */}
                            <button
                                type="button"
                                onClick={() => toggleSection(key)}
                                style={{
                                    width: '100%', background: 'none', border: 'none',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '18px 0', cursor: 'pointer',
                                }}
                            >
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#111', letterSpacing: '-0.2px' }}>
                                    {label}
                                    {(localFilters[key]?.length > 0) && (
                                        <span style={{ color: '#888', fontWeight: 400, fontSize: 12, marginLeft: 6 }}>
                                            ({localFilters[key].length})
                                        </span>
                                    )}
                                </span>
                                <i
                                    className="fa-solid fa-angle-down"
                                    style={{
                                        fontSize: 13, color: '#888',
                                        transform: expandedSections[key] ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s',
                                    }}
                                />
                            </button>

                            {/* 섹션 내용 */}
                            {expandedSections[key] && (
                                <div style={{ paddingBottom: 18 }}>
                                    {/* 색상은 원형 스와치로 */}
                                    {key === 'color' ? (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                            {options.map(({ value, hex }) => {
                                                const selected = (localFilters.color || []).includes(value);
                                                return (
                                                    <button
                                                        key={value}
                                                        type="button"
                                                        onClick={() => toggleOption('color', value)}
                                                        title={value}
                                                        style={{
                                                            display: 'flex', flexDirection: 'column',
                                                            alignItems: 'center', gap: 5,
                                                            background: 'none', border: 'none',
                                                            cursor: 'pointer', padding: 0,
                                                        }}
                                                    >
                                                        <span style={{
                                                            width: 32, height: 32,
                                                            borderRadius: '50%',
                                                            background: hex,
                                                            border: selected ? '2.5px solid #111' : '1.5px solid #DDD',
                                                            outline: selected ? '2px solid #fff' : 'none',
                                                            outlineOffset: '-4px',
                                                            display: 'block',
                                                            transition: 'border 0.15s',
                                                            boxSizing: 'border-box',
                                                        }} />
                                                        <span style={{ fontSize: 11, color: selected ? '#111' : '#888', fontWeight: selected ? 700 : 400 }}>
                                                            {value}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        /* 나머지는 태그 버튼 */
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {options.map((opt) => {
                                                const selected = (localFilters[key] || []).includes(opt);
                                                return (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => toggleOption(key, opt)}
                                                        style={{
                                                            padding: '8px 14px',
                                                            borderRadius: 6,
                                                            border: selected ? '1.5px solid #111' : '1px solid #DDD',
                                                            background: selected ? '#111' : '#fff',
                                                            color: selected ? '#fff' : '#333',
                                                            fontSize: 13,
                                                            fontWeight: selected ? 700 : 400,
                                                            cursor: 'pointer',
                                                            transition: 'all 0.15s',
                                                            letterSpacing: '-0.1px',
                                                        }}
                                                    >
                                                        {opt}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 하단 버튼 */}
                <div style={{
                    padding: '16px 24px 24px',
                    borderTop: '1px solid #E8E8E8',
                    flexShrink: 0,
                    display: 'flex', gap: 10,
                }}>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{
                            flex: 1, padding: '14px 0',
                            border: '1px solid #CCC', borderRadius: 8,
                            background: '#fff', color: '#333',
                            fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        }}
                    >
                        초기화
                    </button>
                    <button
                        type="button"
                        onClick={handleApply}
                        style={{
                            flex: 2, padding: '14px 0',
                            border: 'none', borderRadius: 8,
                            background: '#111', color: '#fff',
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        }}
                    >
                        {totalCount}개 상품 보기
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
}

const products = [
    {
        id: 1,
        gender: '남성',
        name: '테니스 Coldwave+ 베이직 7인치 쇼츠',
        price: '79,900원',
        image: './image/item_list_coldwave_basic_shorts_white.jpg',
        colors: [
            { src: './image/item_list_coldwave_basic_shorts_white.jpg', alt: '화이트' },
            { src: './image/detail_shorts2.webp', alt: '블랙' },
            { src: './image/detail_shorts3.webp', alt: '소라' },
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

/* ------------------------------------------------------------------
 * 필터 적용 함수
 * ------------------------------------------------------------------ */
function applyFilters(products, filters) {
    return products.filter((p) => {
        // 성별 필터
        if (filters.gender?.length > 0 && !filters.gender.includes(p.gender)) return false;

        // 색상 필터: 상품 colors 배열의 alt값과 매칭
        if (filters.color?.length > 0) {
            const productColors = p.colors.map((c) => c.alt);
            if (!filters.color.some((c) => productColors.includes(c))) return false;
        }

        // 가격 필터
        if (filters.price?.length > 0) {
            const numericPrice = parseInt(p.price.replace(/[^0-9]/g, ''), 10);
            const priceMatch = filters.price.some((range) => {
                if (range === '~69,900원') return numericPrice <= 69900;
                if (range === '79,900원~99,900원') return numericPrice >= 79900 && numericPrice <= 99900;
                if (range === '109,000원~') return numericPrice >= 109000;
                return false;
            });
            if (!priceMatch) return false;
        }

        // 사이즈 필터 (범주 매핑)
        if (filters.size?.length > 0) {
            const sizeMap = {
                'S/WXS': ['S', 'WXS', 'WXS(W80)'],
                'M/WS': ['M(085)', 'WS(W75)', 'WS(W80)', 'WS(W85)'],
                'L/WM': ['L(090)', 'WM(W80)', 'WM(W90)'],
                'XL/WL': ['XL(095)', 'WL(W85)', 'WL(W95)'],
                '2XL': ['2XL(100)'],
                '230~250': ['230', '235', '240', '245', '250'],
                '255~275': ['255', '260', '265', '270', '275'],
                '280~': ['280', '285', '290'],
            };
            const allowedSizes = filters.size.flatMap((s) => sizeMap[s] || []);
            if (!p.sizes.some((s) => allowedSizes.includes(s))) return false;
        }

        return true;
    });
}

function ItemList({ setCurrentPage }) {
    const [activePage, setActivePage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ gender: [], color: [], price: [], size: [] });
    const [sortOrder, setSortOrder] = useState('newest');
    const [sortOpen, setSortOpen] = useState(false);

    const filteredProducts = applyFilters(products, filters);
    const activeFilterCount = Object.values(filters).flat().length;

    const handlePageChange = (page) => {
        if (page < 1 || page > TOTAL_PAGES) return;
        setActivePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const removeFilter = (category, value) => {
        setFilters((prev) => ({
            ...prev,
            [category]: prev[category].filter((v) => v !== value),
        }));
    };

    const SORT_LABELS = {
        newest: '신상품 순',
        priceAsc: '낮은 가격 순',
        priceDesc: '높은 가격 순',
    };

    return (
        <>
            {/* 필터 드로어 */}
            <FilterDrawer
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                filters={filters}
                onFiltersChange={setFilters}
                totalCount={filteredProducts.length}
            />

            {/* 상품 리스트 헤더 */}
            <section id="item_list_header">
                <div className="item_list_title">
                    <h2>TENNIS</h2>
                    <span>{filteredProducts.length}</span>
                </div>
                <div className="item_list_tag">
                    <span>여성</span>
                    <span>남성</span>
                </div>
                <div className="filter_button_container">
                    <button
                        className={`filter_button${activeFilterCount > 0 ? ' active' : ''}`}
                        type="button"
                        onClick={() => setFilterOpen(true)}
                    >
                        <span>필터 보기{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
                        <i className="fa-solid fa-sliders" />
                    </button>

                    {/* 정렬 드롭다운 */}
                    <div style={{ position: 'relative' }}>
                        <button
                            className="filter_button"
                            type="button"
                            onClick={() => setSortOpen((v) => !v)}
                        >
                            <span>{SORT_LABELS[sortOrder]}</span>
                            <i className="fa-solid fa-angle-down" style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                        </button>
                        {sortOpen && (
                            <div style={{
                                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                                background: '#fff', border: '1px solid #E0E0E0',
                                borderRadius: 8, overflow: 'hidden',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                                zIndex: 100, minWidth: 140,
                            }}>
                                {Object.entries(SORT_LABELS).map(([key, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => { setSortOrder(key); setSortOpen(false); }}
                                        style={{
                                            display: 'block', width: '100%', textAlign: 'left',
                                            padding: '11px 16px', background: sortOrder === key ? '#F5F5F5' : '#fff',
                                            border: 'none', fontSize: 13, cursor: 'pointer',
                                            fontWeight: sortOrder === key ? 700 : 400, color: '#111',
                                        }}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 활성 필터 태그 */}
            {activeFilterCount > 0 && (
                <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 8,
                    padding: '12px 20px 4px',
                    alignItems: 'center',
                }}>
                    {Object.entries(filters).flatMap(([category, values]) =>
                        values.map((value) => (
                            <button
                                key={`${category}-${value}`}
                                type="button"
                                onClick={() => removeFilter(category, value)}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '6px 12px',
                                    borderRadius: 20,
                                    border: '1px solid #111',
                                    background: '#111', color: '#fff',
                                    fontSize: 12, fontWeight: 600,
                                    cursor: 'pointer', whiteSpace: 'nowrap',
                                }}
                            >
                                {value}
                                <i className="fa-solid fa-xmark" style={{ fontSize: 10 }} />
                            </button>
                        ))
                    )}
                    <button
                        type="button"
                        onClick={() => setFilters({ gender: [], color: [], price: [], size: [] })}
                        style={{
                            padding: '6px 12px',
                            borderRadius: 20,
                            border: '1px solid #ccc',
                            background: '#fff', color: '#888',
                            fontSize: 12, cursor: 'pointer',
                        }}
                    >
                        전체 초기화
                    </button>
                </div>
            )}

            {/* 상품 리스트 */}
            <section id="item_list">
                {filteredProducts.length === 0 ? (
                    <div style={{
                        width: '100%', padding: '80px 0',
                        textAlign: 'center', color: '#888',
                        gridColumn: '1 / -1',
                    }}>
                        <i className="fa-solid fa-box-open" style={{ fontSize: 36, marginBottom: 16, display: 'block', color: '#CCC' }} />
                        <p style={{ fontSize: 15, marginBottom: 8 }}>선택한 필터에 맞는 상품이 없습니다.</p>
                        <button
                            type="button"
                            onClick={() => setFilters({ gender: [], color: [], price: [], size: [] })}
                            style={{ marginTop: 12, padding: '10px 20px', border: '1px solid #111', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: 13 }}
                        >
                            필터 초기화
                        </button>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => setCurrentPage('detail')}
                        />
                    ))
                )}
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
