import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../styles/public.css';
import '../styles/detail.css';
import '../styles/index.css';
import Footer from "../components/Footer.jsx";

/* ------------------------------------------------------------------
 * 별점(1~5)에 대응하는 평가 라벨
 * ------------------------------------------------------------------ */
const RATING_LABELS = {
    5: '아주 좋아요',
    4: '맘에 들어요',
    3: '보통이에요',
    2: '그냥 그래요',
    1: '별로에요',
};

const formatToday = () => {
    const d = new Date();
    return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}.`;
};

/* ------------------------------------------------------------------
 * 부모 문서의 스타일시트를 새 창으로 복사 (CSS / FontAwesome 적용)
 * ------------------------------------------------------------------ */
const copyStyles = (source, target) => {
    Array.from(
        source.querySelectorAll('link[rel="stylesheet"], style')
    ).forEach((node) => target.head.appendChild(node.cloneNode(true)));
};

/* ------------------------------------------------------------------
 * NewWindow : window.open + Portal 로 자식을 실제 새 창에 렌더링
 * ------------------------------------------------------------------ */
function NewWindow({ title = '', features = 'width=620,height=760', onClose, children }) {
    const [container, setContainer] = useState(null);
    const winRef = useRef(null);

    useEffect(() => {
        const win = window.open('', '', features);
        if (!win) {
            // 브라우저 팝업 차단 시
            alert('팝업이 차단되었습니다. 브라우저 팝업 허용 후 다시 시도해주세요.');
            onClose?.();
            return;
        }
        winRef.current = win;
        win.document.title = title;
        copyStyles(window.document, win.document);

        const div = win.document.createElement('div');
        win.document.body.appendChild(div);
        setContainer(div);

        // 사용자가 새 창을 직접 닫는 경우
        const handleBeforeUnload = () => onClose?.();
        win.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            win.removeEventListener('beforeunload', handleBeforeUnload);
            win.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!container) return null;
    return createPortal(children, container);
}

/* ------------------------------------------------------------------
 * ReviewForm : 새 창 내부 리뷰 작성/수정 폼 (자체 인라인 스타일)
 * ------------------------------------------------------------------ */
function ReviewForm({ initialData, onSubmit, onCancel }) {
    const isEdit = Boolean(initialData);
    const [author, setAuthor] = useState(initialData?.author ?? '');
    const [option, setOption] = useState(initialData?.option ?? '');
    const [rating, setRating] = useState(initialData?.rating ?? 5);
    const [content, setContent] = useState(initialData?.content ?? '');

    const handleSubmit = () => {
        if (!author.trim() || !content.trim()) {
            alert('작성자와 리뷰 내용을 입력해주세요.');
            return;
        }
        onSubmit({
            author: author.trim(),
            option: option.trim(),
            rating,
            content: content.trim(),
        });
    };

    const s = {
        wrap: { boxSizing: 'border-box', maxWidth: 560, margin: '0 auto', padding: 24, fontFamily: 'inherit' },
        h2: { fontSize: 22, fontWeight: 700, marginBottom: 20 },
        label: { display: 'block', fontSize: 14, fontWeight: 600, margin: '16px 0 6px' },
        input: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14 },
        textarea: { width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6, fontSize: 14, minHeight: 140, resize: 'vertical' },
        stars: { display: 'flex', gap: 6, fontSize: 26, cursor: 'pointer' },
        btnRow: { display: 'flex', gap: 10, marginTop: 28 },
        submit: { flex: 1, padding: '12px 0', border: 'none', borderRadius: 6, background: '#111', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' },
        cancel: { flex: 1, padding: '12px 0', border: '1px solid #ccc', borderRadius: 6, background: '#fff', color: '#333', fontSize: 15, fontWeight: 600, cursor: 'pointer' },
    };

    return (
        <div style={s.wrap}>
            <h2 style={s.h2}>{isEdit ? '리뷰 수정' : '리뷰 작성하기'}</h2>

            <label style={s.label}>작성자</label>
            <input
                style={s.input}
                type="text"
                value={author}
                placeholder="작성자명을 입력하세요"
                onChange={(e) => setAuthor(e.target.value)}
            />

            <label style={s.label}>상품 옵션</label>
            <input
                style={s.input}
                type="text"
                value={option}
                placeholder="예) L(90)"
                onChange={(e) => setOption(e.target.value)}
            />

            <label style={s.label}>별점</label>
            <div style={s.stars}>
                {[1, 2, 3, 4, 5].map((n) => (
                    <i
                        key={n}
                        className="fa-solid fa-star"
                        style={{ color: n <= rating ? '#FFB200' : '#ddd' }}
                        onClick={() => setRating(n)}
                    />
                ))}
                <span style={{ fontSize: 14, alignSelf: 'center', marginLeft: 6, color: '#666' }}>
                    {RATING_LABELS[rating]}
                </span>
            </div>

            <label style={s.label}>리뷰 내용</label>
            <textarea
                style={s.textarea}
                value={content}
                placeholder="상품에 대한 솔직한 리뷰를 작성해주세요."
                onChange={(e) => setContent(e.target.value)}
            />

            <div style={s.btnRow}>
                <button type="button" style={s.cancel} onClick={onCancel}>취소</button>
                <button type="button" style={s.submit} onClick={handleSubmit}>
                    {isEdit ? '수정 완료' : '등록'}
                </button>
            </div>
        </div>
    );
}

function ProductDetail({ setCurrentPage, onAddToCart }) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [accordionOpen, setAccordionOpen] = useState({
        size: false,
        membership: false,
        productInfo: false,
        fitSpec: false,
    });

    /* ----------------------- 리뷰 CRUD 상태 ----------------------- */
    const [reviews, setReviews] = useState([
        {
            id: 1,
            author: '휠라 스타필드고양점',
            option: 'L(90)',
            rating: 5,
            content: '길이감 적당하고, 흰색 쇼츠 색감이 좋아서 구매.',
            date: '2026. 3. 20.',
        },
    ]);
    const [isReviewWindowOpen, setIsReviewWindowOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);

    const toggleAccordion = (key) => {
        setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    /* ----------------------- CRUD 핸들러 ----------------------- */
    const openCreateWindow = () => {
        setEditingReview(null);
        setIsReviewWindowOpen(true);
    };

    const openEditWindow = (review) => {
        setEditingReview(review);
        setIsReviewWindowOpen(true);
    };

    const closeReviewWindow = () => {
        setIsReviewWindowOpen(false);
        setEditingReview(null);
    };

    const handleSubmitReview = (data) => {
        if (editingReview) {
            // Update
            setReviews((prev) =>
                prev.map((r) => (r.id === editingReview.id ? { ...r, ...data } : r))
            );
        } else {
            // Create
            setReviews((prev) => [
                { id: Date.now(), date: formatToday(), ...data },
                ...prev,
            ]);
        }
        closeReviewWindow();
    };

    const handleDeleteReview = (id) => {
        if (window.confirm('리뷰를 삭제하시겠습니까?')) {
            setReviews((prev) => prev.filter((r) => r.id !== id));
        }
    };

    /* ----------------------- 리뷰 요약 계산 ----------------------- */
    const total = reviews.length;
    const average = total
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
        : '0.0';

    const counts = [5, 4, 3, 2, 1].map((star) => ({
        star,
        label: RATING_LABELS[star],
        count: reviews.filter((r) => r.rating === star).length,
    }));
    const topBucket = counts.reduce((a, b) => (b.count > a.count ? b : a), counts[0]);
    const topPercent = total ? Math.round((topBucket.count / total) * 100) : 0;

    return (
        <>
            <h1 style={{ color: 'red', fontSize: '50px' }}>ProductDetail 렌더링 확인</h1>

            {/* 메인 상단: 상품 기본 정보 및 구매 영역 */}
            <section id="main">
                <div>
                    <img src="/image/detail_shorts1.webp" alt="상품 메인 이미지" />
                </div>
                <div>
                    <div className="information">
                        <div className="header">
                            <div>
                                <span className="tag">남성</span>
                                <span className="tag">의류</span>
                            </div>
                            <button type="button" className="share">
                                <i className="fa-solid fa-share-nodes"></i>
                            </button>
                        </div>

                        <div className="title">
                            <span>테니스 Coldwave+ 베이직 7인치 쇼츠</span>
                        </div>

                        <div className="group">
                            <ul>
                                <li><a href="#" className="active" onClick={(e) => e.preventDefault()}><img src="/image/detail_shorts1.jpg" alt="썸네일 1" /></a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><img src="/image/detail_shorts2.webp" alt="썸네일 2" /></a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><img src="/image/detail_shorts3.webp" alt="썸네일 3" /></a></li>
                            </ul>
                        </div>

                        {/* 사이즈 선택 아코디언 */}
                        <div className={`accordion_size${accordionOpen.size ? ' active' : ''}`}>
                            <div className="head" onClick={() => toggleAccordion('size')}>
                                <span>사이즈 선택</span>
                                <i className="fa-solid fa-caret-down" style={{ transform: accordionOpen.size ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}></i>
                            </div>
                            {accordionOpen.size && (
                                <div className="body">
                                    {['M(085)', 'L(090)', 'XL(095)', '2XL(100)'].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            className={`size${selectedSize === size ? ' selected' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="cart">
                            <button type="button" onClick={() => {
                                if (!selectedSize) {
                                    alert('사이즈를 선택해주세요.');
                                    return;
                                }
                                onAddToCart({
                                    id: Date.now(),
                                    brand: 'FILA',
                                    name: '테니스 Coldwave+ 베이직 7인치 쇼츠',
                                    price: 79900,
                                    option: selectedSize,
                                    image: '/image/detail_shorts1.webp',
                                    quantity: 1,
                                    checked: true,
                                });
                                alert('장바구니에 추가되었습니다.');
                            }}>
                                <b>카트에 추가</b>
                                <strong>79,900원</strong>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 상품 스펙 및 상세 설명 영역 */}
            <section id="spec">
                <div className="item_detail">
                    <div className="image_container">
                        <img src="/image/checkpoint1.webp" alt="상세 이미지 1" />
                        <img src="/image/checkpoint2.webp" alt="상세 이미지 2" />
                        <img src="/image/checkpoint4.webp" alt="상세 이미지 3" />
                        <img src="/image/checkpoint3.webp" alt="상세 이미지 4" />
                    </div>

                    <div className="information">
                        <div className="item_detail_info">
                            <p>냉감 기능의 COLDWAVE+ 소재를 적용하여 착용 시 즉각적인 시원함을 제공합니다. 자외선을 효과적으로 차단하는 UV CUT 기능으로 야외 활동에서도 피부를 보호할 수 있습니다. 뛰어난 통기성과 쾌적한 착용감을 유지해 장시간 활동에도 편안함이 지속됩니다. 오비 스트링을 앞·뒤 어디서나 조절할 수 있도록 설계하여 편의성을 높였습니다. 양쪽 사이드에 트임 디테일이 있어 역동적인 움직임에도 불편함이 없습니다. 활동성 중심의 설계로 경기 중에도 안정적인 착용감을 제공하며 퍼포먼스를 지원합니다. 휠라 아카이브의 상징인 7-스트라이프를 라벨 디테일에 적용해 브랜드 아이덴티티를 강조했습니다. 심플한 실루엣 속에서도 클래식한 감성을 전달하며 고급스러운 포인트 역할을 합니다. 작은 디테일 하나로도 헤리티지를 느낄 수 있는 차별화된 디자인입니다.</p>
                            <i className="fa-solid fa-circle"></i>
                            <span className="text">색상: WHITE/OFF WHITE</span><br />
                            <i className="fa-solid fa-circle"></i>
                            <span className="text">상품코드: 1100FS262TR11M008191</span>
                        </div>

                        <div className="accordion_container">
                            {/* 멤버십 혜택 아코디언 */}
                            <div className={`accordion${accordionOpen.membership ? ' active' : ''}`}>
                                <div className="head" onClick={() => toggleAccordion('membership')}>
                                    <b>멤버쉽 혜택</b>
                                    <button className="accordion_button" onClick={(e) => e.stopPropagation()}>
                                        <i className="fa-solid fa-caret-down" style={{ transform: accordionOpen.membership ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}></i>
                                    </button>
                                </div>
                                {accordionOpen.membership && (
                                    <div className="body membership">
                                        <ul>
                                            <li><i className="fa-solid fa-check"></i> <span>신규회원 10,000원 할인 쿠폰</span></li>
                                            <li><i className="fa-solid fa-check"></i> <span>첫 구매 30일 후 10,000원 재구매 쿠폰</span></li>
                                            <li><i className="fa-solid fa-check"></i> <span>카카오톡 채널 추가 시 10% 할인 쿠폰</span></li>
                                            <li><i className="fa-solid fa-check"></i> <span>리뷰 작성 시 최대 30,000P 적립</span></li>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* 제품 상세 아코디언 */}
                            <div className={`accordion${accordionOpen.productInfo ? ' active' : ''}`}>
                                <div className="head" onClick={() => toggleAccordion('productInfo')}>
                                    <b>제품 상세</b>
                                    <button className="accordion_button" onClick={(e) => e.stopPropagation()}>
                                        <i className="fa-solid fa-caret-down" style={{ transform: accordionOpen.productInfo ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}></i>
                                    </button>
                                </div>
                                {accordionOpen.productInfo && (
                                    <div className="body product_information">
                                        {[
                                            ['제품소재', '겉감1: 면 65%, 나일론 35%, 겉감2: 면 65%, 나일론 35%'],
                                            ['사이즈', 'M(085), L(090), XL(095), 2XL(100)'],
                                            ['제조자', '미스토코리아(주)'],
                                            ['제조국', '베트남'],
                                            ['제조년월', '202601'],
                                            ['세탁방법', '상세 취급방법 제품라벨 참조'],
                                        ].map(([label, value]) => (
                                            <div className="info_row" key={label}>
                                                <span>{label}</span>
                                                <span>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 핏 & 스펙 가이드 아코디언 */}
                            <div className={`accordion${accordionOpen.fitSpec ? ' active' : ''}`}>
                                <div className="head" onClick={() => toggleAccordion('fitSpec')}>
                                    <b>핏 &amp; 스펙 가이드</b>
                                    <button className="accordion_button" onClick={(e) => e.stopPropagation()}>
                                        <i className="fa-solid fa-caret-down" style={{ transform: accordionOpen.fitSpec ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}></i>
                                    </button>
                                </div>
                                {accordionOpen.fitSpec && (
                                    <div className="body fit_spec_guide">
                                        <div className="fit_container">
                                            {[
                                                ['SLIM', '부담스럽지 않게 날씬해 보이는 효과를 주는 핏'],
                                                ['STANDARD', '가장 기본적이고 깔끔한, 조금 여유있는 실루엣의 핏'],
                                                ['SEMI-OVER', '편안하고 루즈한 실루엣의 핏'],
                                                ['OVER', '자연스러운 스트릿무드의 전체적으로 넉넉한 핏'],
                                            ].map(([style, desc]) => (
                                                <div className="fit_item" key={style}>
                                                    <span className="fit_style">{style}</span>
                                                    <p>{desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="spec_container">
                                            {[
                                                { label: '신축성', width: '50%', labels: ['없음', '보통', '좋음'] },
                                                { label: '두께감', width: '30%', labels: ['얇음', '보통', '두꺼움'] },
                                                { label: '계절감', width: '100%', labels: ['봄·가을', '여름', '겨울', '사계절'] },
                                            ].map(({ label, width, labels }) => (
                                                <div className="spec" key={label}>
                                                    <b>{label}</b>
                                                    <div className="progress_container">
                                                        <div className="progress parent">
                                                            <div className="progress child" style={{ width }}></div>
                                                        </div>
                                                        <div className="progress_labels">
                                                            {labels.map((l) => <span key={l}>{l}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 체크포인트 영역 */}
            <section id="checkpoint">
                <div className="checkpoint_header">
                    <h2>체크포인트</h2>
                    <div className="arrow_button_container">
                        <button type="button" className="arrow_button"><i className="fa-solid fa-caret-left"></i></button>
                        <button type="button" className="arrow_button"><i className="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
                <div className="checkpoint_card_container">
                    {[
                        { img: '/image/checkpoint1.webp', title: 'CLODWAVE+ 냉감 기능성 소재', desc: '냉감 기능의 COLDWAVE+ 소재를 적용해 착용 즉시 시원한 촉감을 제공하며, 여름철 운동 시 열감과 불쾌감을 효과적으로 줄여줍니다.' },
                        { img: '/image/checkpoint2.webp', title: '사이드 트임 디테일', desc: '양쪽 사이드 트임 디테일이 다리 움직임을 자연스럽게 도와주어 역동적인 플레이에도 불편함 없이 퍼포먼스를 지원합니다.' },
                        { img: '/image/checkpoint3.webp', title: '7-스트라이프 라벨 포인트', desc: '휠라 아카이브의 상징인 7-스트라이프를 라벨 디테일에 적용해 브랜드 아이덴티티를 강조했습니다. 심플한 실루엣 속에서도 클래식한 감성을 전달하는 고급스러운 포인트가 됩니다.' },
                        { img: '/image/checkpoint4.webp', title: '스트링 조절 설계', desc: '허리 오비 스트링을 앞·뒤 어디서나 조절할 수 있도록 설계해 착용 편의성을 높이고, 체형에 맞는 안정적인 핏을 완성합니다.' },
                    ].map(({ img, title, desc }) => (
                        <div className="card_container" key={title}>
                            <div className="card">
                                <div className="image_container"><img src={img} alt={title} /></div>
                                <div className="card_content"><h3>{title}</h3><p>{desc}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 모델컷 영역 */}
            <section id="modelcut">
                <div className="modelcut_header">
                    <div className="modelcut_header_content">
                        <h2>모델컷</h2>
                        <p>(남) 188cm / 착용 사이즈 : XL</p>
                        <p>* 모델 착용 이미지보다 제품컷 이미지의 컬러가 정확합니다.</p>
                    </div>
                    <div className="arrow_button_container">
                        <button type="button" className="arrow_button"><i className="fa-solid fa-caret-left"></i></button>
                        <button type="button" className="arrow_button"><i className="fa-solid fa-caret-right"></i></button>
                    </div>
                </div>
                <div className="modelcut_image">
                    {['modelcut1.jpg', 'modelcut2.jpg', 'modelcut3.jpg', 'modelcut4.jpg'].map((img, i) => (
                        <img key={i} src={`/image/${img}`} alt={`모델컷 ${i + 1}`} />
                    ))}
                </div>
            </section>

            {/* 리뷰 영역 */}
            <section id="review">
                <h2>REVIEW</h2>
                <button type="button" className="review_write_button" onClick={openCreateWindow}>
                    내 리뷰 작성하기
                </button>

                <div className="photo_review_container">
                    <div className="photo_review_title">
                        <h3>포토&amp;동영상</h3>
                        <a href="#" onClick={(e) => e.preventDefault()}>전체보기 <i className="fa-solid fa-angle-right"></i></a>
                    </div>
                    <div className="photo_review_img_container">
                        {[1, 2, 3].map((i) => (
                            <div className="review_item" key={i}>
                                <img src="/image/item_list_coldwave_basic_shorts_white.jpg" alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="review_gauge_container">
                    <div className="review_grade">
                        <div className="review_grade_star">
                            <i className="fa-solid fa-star"></i>
                            <span>{average}</span>
                        </div>
                        <p>{topPercent}%가 <b className="emp">{topBucket.label}</b> 라고 평가했습니다.</p>
                        <p>리뷰 {total}개</p>
                    </div>
                    <div className="review_guage">
                        {counts.map(({ label, count }) => (
                            <React.Fragment key={label}>
                                <span>{label}</span>
                                <div className="rating_container">
                                    <div className="progress_bar_bg">
                                        <div
                                            className="progress_bar_fill"
                                            style={{ width: total ? `${Math.round((count / total) * 100)}%` : '0%' }}
                                        ></div>
                                    </div>
                                    <span className="rating_text">{count}</span>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <hr />

                <div className="review_filter">
                    <div className="review_filter_container">
                        <a href="#" onClick={(e) => e.preventDefault()}>최신순</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>AI 추천순</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>별점순</a>
                    </div>
                    <div className="review_search_box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="리뷰 키워드 검색" />
                    </div>
                </div>

                <hr />

                <div className="review_detail_filter">
                    {['별점', '사이즈 어때요?', '키', '몸무게', '성별'].map((label) => (
                        <div className="review_filter_button_container" key={label}>
                            <button type="button">{label} <i className="fa-solid fa-angle-down"></i></button>
                        </div>
                    ))}
                </div>

                <hr />

                {/* 리뷰 목록 (Read) */}
                {total === 0 && (
                    <p style={{ padding: '24px 0', color: '#888' }}>등록된 리뷰가 없습니다.</p>
                )}

                {reviews.map((review) => (
                    <div className="review_container" key={review.id}>
                        <div className="review">
                            <span>{review.author}</span>
                            <p className="option">상품 옵션 {review.option}</p>
                            <div className="review_star">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <i
                                        key={i}
                                        className="fa-solid fa-star"
                                        style={{ color: i <= review.rating ? undefined : '#ddd' }}
                                    ></i>
                                ))}
                            </div>
                            <p>{review.content}</p>
                            <button type="button" className="warning">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                <span>신고 및 차단</span>
                            </button>
                            <div className="review_button">
                                <button type="button"><i className="fa-regular fa-thumbs-up"></i><span>도움돼요</span></button>
                                <button type="button"><i className="fa-regular fa-thumbs-down"></i><span>도움안돼요</span></button>
                                <button type="button"><span>댓글</span><i className="fa-solid fa-angle-down"></i></button>
                                {/* 수정 / 삭제 (Update / Delete) */}
                                <button type="button" onClick={() => openEditWindow(review)}>
                                    <i className="fa-solid fa-pen"></i><span>수정</span>
                                </button>
                                <button type="button" onClick={() => handleDeleteReview(review.id)}>
                                    <i className="fa-solid fa-trash"></i><span>삭제</span>
                                </button>
                            </div>
                        </div>
                        <div className="review_writer">
                            <span className="id">{review.author}</span><br />
                            <b>작성자 등급</b><span className="group">회원</span><br />
                            <span className="date">{review.date}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* 새 창 리뷰 작성/수정 폼 */}
            {isReviewWindowOpen && (
                <NewWindow
                    title={editingReview ? '리뷰 수정' : '리뷰 작성하기'}
                    onClose={closeReviewWindow}
                >
                    <ReviewForm
                        initialData={editingReview}
                        onSubmit={handleSubmitReview}
                        onCancel={closeReviewWindow}
                    />
                </NewWindow>
            )}
            <Footer/>
        </>
    );
}

export default ProductDetail;
