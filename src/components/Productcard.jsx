import React from 'react';

// 단일 상품 카드 (이미지 / 태그 / 제목 / 가격, 클릭 시 상세페이지 진입)
function ProductCard({ product, onClick }) {
    const { img, tag, title, price } = product;

    return (
        <li onClick={onClick} style={{ cursor: 'pointer' }}>
            <a onClick={(e) => e.preventDefault()}>
                <div className="image_container">
                    <img src={img} alt={title} />
                </div>
                <span className="tag">{tag}</span>
                <b className="title">{title}</b>
                <strong className="price">{price}</strong>
            </a>
        </li>
    );
}

export default ProductCard;
