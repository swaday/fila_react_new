import React, { useState } from 'react';

const PRODUCTS = [
    { id: 'product1', name: '에샤페 벨크로 메리제인 초코', color: 'BROWN,BROWN,BROWN', price: 99900, image: './image/item1.webp', alt: '에샤페 벨크로 메리제인 초코' },
    { id: 'product2', name: '에샤페 실버문', color: 'Grey, White, White', price: 109000, image: './image/item2.webp', alt: '에샤페 실버문' },
];

function LayoutPopup({ onClose, onAddToCart }) {
    const [checked, setChecked] = useState({ product1: true, product2: true });

    const allChecked = Object.values(checked).every(Boolean);

    const handleAllCheck = (e) => {
        const next = e.target.checked;
        const updated = {};
        PRODUCTS.forEach(p => { updated[p.id] = next; });
        setChecked(updated);
    };

    const handleItemCheck = (id) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const totalPrice = PRODUCTS.filter(p => checked[p.id]).reduce((sum, p) => sum + p.price, 0);

    const handleQuickAdd = () => {
        PRODUCTS.filter(p => checked[p.id]).forEach(p => {
            onAddToCart({
                id: Date.now() + Math.random(),
                brand: 'FILA HERITAGE',
                name: p.name,
                option: 'ONE SIZE',
                price: p.price,
                quantity: 1,
                image: p.image,
                checked: true,
            });
        });
        onClose();
    };

    return (
        <div className="modal_container active" onClick={(e) => { if (e.target.classList.contains('modal_container')) onClose(); }}>
            <div className="modal">
                <section className="image_section">
                    <img src="./image/banner_half_2.webp" alt="팝업 배너" />
                </section>
                <section className="form_section">
                    {/* 헤더: 전체선택 & 닫기 */}
                    <div className="select_container">
                        <label className="check_label">
                            <input
                                type="checkbox"
                                className="common-checkbox"
                                checked={allChecked}
                                onChange={handleAllCheck} />
                            전체선택
                        </label>
                        <button type="button" className="close_btn" onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    {/* 상품 목록 */}
                    <div className="product_container">
                        <ul>
                            {PRODUCTS.map(p => (
                                <li key={p.id}>
                                    <div className="product_item">
                                        {/* 체크박스를 label 안에 넣어 이중 이벤트 방지 */}
                                        <label className="product_item_label">
                                            <input
                                                type="checkbox"
                                                className="common-checkbox"
                                                checked={checked[p.id]}
                                                onChange={() => handleItemCheck(p.id)} />
                                            <img src={p.image} alt={p.alt} />
                                            <div className="product_item_info">
                                                <b>{p.name}</b>
                                                <span>{p.color}</span>
                                                <strong>{p.price.toLocaleString()}원</strong>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="product_size">
                                        <span>사이즈 선택</span>
                                        <i className="fa-solid fa-angle-down"></i>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 금액 및 버튼 */}
                    <div className="total_price_container">
                        <b>주문금액</b>
                        <b>{totalPrice.toLocaleString()}원</b>
                    </div>
                    <div className="submit_container">
                        <button type="button" onClick={handleQuickAdd} disabled={totalPrice === 0}>장바구니 담기</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LayoutPopup;
