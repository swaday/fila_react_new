import React from 'react';

function LayoutPopup({ onClose, onAddToCart }) {
    const handleQuickAdd = () => {
        const popupItem = {
            id: Date.now(),
            brand: 'FILA HERITAGE',
            name: '에샤페 벨크로 컬렉션 팝업 아이템',
            option: 'CHOCO / ONE SIZE',
            price: 119000,
            quantity: 1,
            image: './image/item1.webp',
            checked: true
        };
        onAddToCart(popupItem);
        onClose();
    };

    return (
        <div className="modal_container active" onClick={(e) => { if (e.target.classList.contains('modal_container')) onClose(); }}>
            <div className="modal">
                <section className="image_section">
                    <img src="./image/banner_half_2.webp" alt="팝업 배너" />
                </section>
                <section className="form_section">
                    <div className="select_container">
                        <div>
                            <input type="checkbox" id="select_all" defaultChecked />
                            <label htmlFor="select_all">전체선택</label>
                        </div>
                        <button type="button" className="close_btn" onClick={onClose}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="product_container">
                        <ul>
                            <li>
                                <div className="product_item">
                                    <input type="checkbox" id="product1" defaultChecked />
                                    <label htmlFor="product1">
                                        <img src="./image/item1.webp" alt="에샤페 벨크로 메리제인 초코" />
                                        <b>에샤페 벨크로 메리제인 초코</b>
                                        <span>BROWN,BROWN,BROWN</span>
                                        <strong>99,900원</strong>
                                    </label>
                                </div>
                                <div className="product_size">
                                    <span>사이즈 선택</span>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </li>
                            <li>
                                <div className="product_item">
                                    <input type="checkbox" id="product2" defaultChecked />
                                    <label htmlFor="product2">
                                        <img src="./image/item2.webp" alt="에샤페 실버문" />
                                        <b>에샤페 실버문</b>
                                        <span>Grey, White, White</span>
                                        <strong>109,000원</strong>
                                    </label>
                                </div>
                                <div className="product_size">
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
                        <button type="button" onClick={handleQuickAdd}>장바구니 담기</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default LayoutPopup;
