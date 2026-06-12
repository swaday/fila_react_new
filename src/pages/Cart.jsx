import React, { useState } from 'react';

// 상품별로 사용할 수 있는 옵션 목록 (실제 프로젝트에서는 item 데이터에 포함하거나 API로 받아오세요)
const OPTION_LIST = [
    '화이트 / S',
    '화이트 / M',
    '화이트 / L',
    '화이트 / XL',
    '블랙 / S',
    '블랙 / M',
    '블랙 / L',
    '블랙 / XL',
    '네이비 / S',
    '네이비 / M',
    '네이비 / L',
    '네이비 / XL',
];

function OptionPanel({ item, onConfirm, onCancel }) {
    const [selectedOption, setSelectedOption] = useState(item.option);
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    return (
        <div className="option_panel">
            <div className="option_panel_inner">

                {/* 옵션 + 수량 2컬럼 그리드 */}
                <div className="option_panel_grid">
                    <div className="option_panel_field">
                        <label className="option_panel_label">옵션 선택</label>
                        <select
                            className="option_panel_select"
                            value={selectedOption}
                            onChange={e => setSelectedOption(e.target.value)}
                        >
                            {OPTION_LIST.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <div className="option_panel_field">
                        <label className="option_panel_label">수량</label>
                        <div className="option_quantity_control">
                            <button
                                type="button"
                                className="qty_btn"
                                onClick={() => handleQuantityChange(-1)}
                                disabled={quantity <= 1}
                            >−</button>
                            <span className="qty_value">{quantity}</span>
                            <button
                                type="button"
                                className="qty_btn"
                                onClick={() => handleQuantityChange(1)}
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="option_panel_divider" />

                {/* 선택 내역 미리보기 */}
                <div className="option_panel_preview">
                    <div className="option_panel_preview_left">
                        <span className="option_panel_preview_tag">선택 내역</span>
                        <span className="option_panel_preview_text">{selectedOption} &nbsp;·&nbsp; {quantity}개</span>
                    </div>
                    <span className="option_panel_preview_price">{(item.price * quantity).toLocaleString()}원</span>
                </div>

                {/* 버튼 */}
                <div className="option_panel_btns">
                    <button type="button" className="option_cancel_btn" onClick={onCancel}>취소</button>
                    <button
                        type="button"
                        className="option_confirm_btn"
                        onClick={() => onConfirm(selectedOption, quantity)}
                    >변경 완료</button>
                </div>

            </div>
        </div>
    );
}

function Cart({ items, onDelete, onToggleCheck, onUpdateItem }) {
    const allChecked = items.length > 0 && items.every(item => item.checked);
    const [openPanelId, setOpenPanelId] = useState(null); // 현재 열려있는 패널의 item id

    const handleAllCheck = () => {
        const next = !allChecked;
        items.forEach(item => {
            if (item.checked !== next) onToggleCheck(item.id);
        });
    };

    const handleOptionToggle = (itemId) => {
        setOpenPanelId(prev => (prev === itemId ? null : itemId));
    };

    const handleOptionConfirm = (itemId, newOption, newQuantity) => {
        onUpdateItem(itemId, { option: newOption, quantity: newQuantity });
        setOpenPanelId(null);
    };

    const checkedItems = items.filter(item => item.checked);
    const totalPrice = checkedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div id="cart-wrapper">
            <form id="cart">

                {/* 헤더 */}
                <section id="cart_header">
                    <h2>장바구니</h2>
                    <nav className="cart_header_btn" role="tablist">
                        <button className="active" type="button" role="tab">일반배송 <span className="tab_count">{items.length}</span></button>
                        <button type="button" role="tab">빠른배송 <span className="tab_count">0</span></button>
                        <button type="button" role="tab">매장픽업 <span className="tab_count">0</span></button>
                        <button type="button" role="tab">예약주문 <span className="tab_count">0</span></button>
                    </nav>
                </section>

                {/* 바디 */}
                <section id="cart_body">

                    {/* 왼쪽: 상품 목록 */}
                    <div className="cart_info_container">
                        <div className="cart_body_title_wrap">
                            <label className="check_label">
                                <input
                                    type="checkbox"
                                    className="common-checkbox"
                                    checked={allChecked}
                                    onChange={handleAllCheck} />
                                전체 선택
                            </label>
                            <button type="button" className="text_btn">선택 삭제</button>
                            <button type="button" className="delete_soldout_btn">품절상품 삭제</button>
                        </div>

                        {items.length === 0 ? (
                            <p style={{ padding: '60px 0', textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
                                장바구니 내역이 존재하지 않습니다.
                            </p>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="cart_item_wrapper">
                                    <article className={`cart_body_item${openPanelId === item.id ? ' panel_open' : ''}`}>
                                        <label className="check_label item_check">
                                            <input type="checkbox" className="common-checkbox" checked={item.checked} onChange={() => onToggleCheck(item.id)} />
                                        </label>

                                        <div className="cart_body_image_container">
                                            <img src={item.image} alt={item.name} />
                                            <span className="item_badge">할인쿠폰 2개</span>
                                        </div>

                                        <div className="cart_body_info">
                                            <p className="item_brand">{item.brand}</p>
                                            <p className="item_name_en">{item.name}</p>
                                            <p className="item_option_kor">{item.option} / {item.quantity}개</p>
                                            <div className="item_price_row">
                                                <span className="item_price">{item.price.toLocaleString()}<em>원</em></span>
                                                <button type="button" className="coupon_btn">
                                                    <i className="fa-solid fa-tag"></i>
                                                    쿠폰받기
                                                </button>
                                            </div>
                                        </div>

                                        <div className="item_action_btns">
                                            <button
                                                type="button"
                                                className={`option${openPanelId === item.id ? ' active' : ''}`}
                                                onClick={() => handleOptionToggle(item.id)}
                                            >
                                                옵션/수량 변경
                                                <i className={`fa-solid fa-chevron-${openPanelId === item.id ? 'up' : 'down'}`} style={{ marginLeft: '4px', fontSize: '10px' }}></i>
                                            </button>
                                            <button type="button" className="buy">바로구매</button>
                                        </div>

                                        <button type="button" className="close_btn" onClick={() => onDelete(item.id)} aria-label="상품 삭제">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </article>

                                    {/* 옵션/수량 변경 패널 */}
                                    {openPanelId === item.id && (
                                        <OptionPanel
                                            item={item}
                                            onConfirm={(newOption, newQty) => handleOptionConfirm(item.id, newOption, newQty)}
                                            onCancel={() => setOpenPanelId(null)}
                                        />
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* 오른쪽: 결제 정보 */}
                    <aside className="buy_info_container">
                        <div className="buy_info_title">
                            <h2>결제정보</h2>
                        </div>

                        <div className="buy_info_body">
                            <div className="buy_info_row">
                                <span>상품금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </div>
                            <div className="buy_info_row">
                                <span>배송비</span>
                                <span>무료</span>
                            </div>
                            <div className="buy_info_row">
                                <span>할인금액</span>
                                <span className="price_discount">-0원</span>
                            </div>
                            <div className="buy_info_total_discount">
                                <div className="buy_info_row sub">
                                    <span>상품할인</span>
                                    <span>-0원</span>
                                </div>
                                <div className="buy_info_row sub">
                                    <span>즉시할인</span>
                                    <span>-0원</span>
                                </div>
                            </div>
                        </div>

                        <div className="total_price">
                            <span className="total_label">총 구매 금액</span>
                            <strong>{totalPrice.toLocaleString()}원</strong>
                        </div>

                        <button type="button" className="order_btn">{checkedItems.length}건 주문하기</button>

                        <p className="order_notice">
                            주문 전 <a href="#" onClick={e => e.preventDefault()}>배송 안내</a> 및 <a href="#" onClick={e => e.preventDefault()}>반품 정책</a>을 확인해 주세요.
                        </p>
                    </aside>

                </section>
            </form>
        </div>
    );
}

export default Cart;
