import React, { useState } from 'react';
import TabButtons from './TabButtons';
import ProductCard from './ProductCard';

// 탭별 상품 데이터
const tabData = [
    {
        label: '마이티셔츠',
        products: [
            { img: './image/tshirt1.webp', tag: '공용', title: '<우즈 착용>마이티셔츠 유니 세미오버핏', price: '49,900원' },
            { img: './image/tshirt2.webp', tag: '여성', title: '<한소희 착용>마이티셔츠 여성 오버핏', price: '49,900원' },
            { img: './image/tshirt3.webp', tag: '여성', title: '<아일릿 착용>마이티셔츠 여성 스탠다드', price: '49,900원' },
            { img: './image/tshirt4.webp', tag: '공용', title: '마이티셔츠 유니 세미오버핏', price: '49,900원' },
            { img: './image/tshirt5.webp', tag: '여성', title: '마이티셔츠 유니 오버핏', price: '49,900원' },
        ]
    },
    {
        label: '글리오',
        products: [
            { img: './image/trending_glio_silvermoon', tag: '라이프스타일 | 여성', title: '휠라 글리오 실버문', price: '109,000원' },
            { img: './image/trending_glio_cream', tag: '라이프스타일 | 여성', title: '휠라 글리오 크림', price: '109,000원' },
            { img: './image/trending_glio_pink', tag: '라이프스타일 | 여성', title: '휠라 글리오 핑크', price: '109,000원' },
            { img: './image/trending_glio_mary_jane.webp', tag: '라이프스타일 | 여성', title: '흴라 글리오 메리제인', price: '99,900원' },
            { img: './image/trending_glio_mary_jane_black.webp', tag: '라이프스타일 | 여성', title: '흴라 글리오 메리제인', price: '99,900원' },
        ]
    },
    {
        label: '샌들',
        products: [
            { img: './image/trending_slick_wavy', tag: '공용', title: '슬릭 웨이비 샌들 v3', price: '99,900원' },
            { img: './image/trending_slick_wavy_black', tag: '공용', title: '슬릭 웨이비 샌들 v3', price: '99,900원' },
            { img: './image/trending_peito_cream', tag: '공용', title: '페이토 샌들 v2', price: '89,900원' },
            { img: './image/trending_peito_grey', tag: '공용', title: '페이토 샌들 v2', price: '89,900원' },
            { img: './image/trending_peito_pink', tag: '공용', title: '페이토 샌들 v2', price: '89,900원' },
        ]
    },
    {
        label: '테니스',
        products: [
            { img: './image/tennis_crop_cara', tag: '여성 | 테니스', title: '테니스 여성 골지 크롭 카라 반팔티', price: '69,900원' },
            { img: './image/tennis_sorona_cara_onepiece', tag: '여성 | 테니스', title: '테니스 소로나 카라 원피스', price: '109,000원' },
            { img: './image/tennis_sorona_cara_onepiece_sora', tag: '공용 | 테니스', title: '테니스 Drywave 클럽매치 자카드 카라티', price: '99,900원' },
            { img: './image/tennis_drywave_henryneck', tag: '남성 | 테니스', title: '테니스 헨리넥 자카드 반팔티', price: '79,900원' },
            { img: './image/tennis_sliding_shorts', tag: '남성 | 테니스', title: '테니스 슬라이딩 5인치 쇼츠', price: '99,900원' },
        ]
    },
    {
        label: '냉감티셔츠',
        products: [
            { img: './image/cooling_coldwave_essential', tag: '공용', title: 'Coldwave 에센셜 기능성 반팔티', price: '39,900원' },
            { img: './image/cooling_coldwave_essential_black', tag: '공용', title: 'Coldwave 에센셜 기능성 반팔티', price: '39,900원' },
            { img: './image/cooling_coldwave_essential_pink', tag: '여성', title: '여성 Coldwave 에센셜 기능성 반팔티', price: '39,900원' },
            { img: './image/cooling_coldwave_essential_sorona', tag: '공용', title: 'Coldwave 에센셜 소로나 반팔티', price: '39,900원' },
            { img: './image/cooling_coldwave_essential_sorona_sora', tag: '공용', title: 'Coldwave 에센셜 소로나 반팔티', price: '39,900원' },
        ]
    },
    {
        label: '에샤페',
        products: [
            { img: './image/trending_silvermoon', tag: '공용 | 라이프스타일', title: '<우즈 착용>휠라 에샤페 실버문', price: '109,000원' },
            { img: './image/trending_silver_v2', tag: '공용 | 라이프스타일', title: '<차정원 착용>휠라 에샤페 v2 실버', price: '119,000원' },
            { img: './image/trending_blue_lx', tag: '공용 | 라이프스타일', title: '<김나영 착용>휠라 에샤페 LX 블루', price: '119,000원' },
            { img: './image/trending_cream_lx', tag: '공용 | 라이프스타일', title: '<한소희 착용>휠라 에샤페 LX 크림', price: '119,000원' },
            { img: './image/trending_choco_lx', tag: '공용 | 라이프스타일', title: '<한소희 착용>휠라 에샤페 LX 초코', price: '119,000원' },
        ]
    },
    {
        label: 'F.H.C',
        products: [
            { img: './image/trending_fhc_gelato', tag: '공용', title: 'FHC 젤라또 그래픽 박시 반팔티', price: '59,900원' },
            { img: './image/trending_fhc_gelato_navy', tag: '공용', title: 'FHC 젤라또 그래픽 박시 반팔티', price: '59,900원' },
            { img: './image/trending_bounce', tag: '공용', title: 'FHC 바운스 그래픽 반팔티', price: '59,900원' },
            { img: './image/trending_bounce_purple', tag: '공용', title: 'FHC 바운스 그래픽 반팔티', price: '59,900원' },
            { img: './image/trending_bounce_sora', tag: '공용', title: 'FHC 바운스 그래픽 반팔티', price: '59,900원' },
        ]
    },
];

// 메인 상품 리스트 섹션 (탭 7개 + 탭별 상품 카드)
function TrendingSection({ setCurrentPage }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section className="trending_section">
            <h2>Trending Now!!</h2>

            <TabButtons
                tabs={tabData}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {tabData.map((tab, i) => (
                <ul key={i} className={`product_list${activeTab === i ? ' active' : ''}`}>
                    {tab.products.map((product, j) => (
                        <ProductCard
                            key={j}
                            product={product}
                            onClick={() => setCurrentPage('detail')}
                        />
                    ))}
                </ul>
            ))}
        </section>
    );
}

export default TrendingSection;
