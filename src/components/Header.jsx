import React, { useState } from 'react';

function Header({ setCurrentPage, cartCount }) {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <header onMouseLeave={() => setActiveMenu(null)}>
            <a className="home_btn" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}>
                <img src="/image/logo/logo.svg" alt="헤더로고" />
            </a>

            <ul className="main_menu">
                <li onMouseEnter={() => setActiveMenu('women')}>
                    <a href="#" className="menu_link" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Women</a>
                    {activeMenu === 'women' && (
                        <div className="submenu_container active">
                            <div className="submenu_item">
                                <b className="submenu_title">의류</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>반팔</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>바람막이/집업</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>맨투맨/후디</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>긴팔</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>쇼츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>팬츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>브라탑</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>스커트/원피스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>트레이닝 셋업</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Heritage Collection</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">신발</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>라이프스타일</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>샌들/슬리퍼</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>에샤페</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>글리오</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>인터런</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">용품</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>피클볼</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>백팩</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>숄더/토트백</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>메신저/크로스백</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>슬링백/힙색</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>모자</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>양말</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>기타</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">언더웨어</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>BEST</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>다영 X 쿨웨이브</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>브라+팬티 SET</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>컬렉션</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>버터소프트</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>와이어브라</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>노와이어브라</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>브라탑</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>팬티</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>사각드로즈</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>파자마</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>이지웨어</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Accessories</a></li>

                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">스포츠</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>피트니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>트레이닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>워터</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>피클볼</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </li>
                <li onMouseEnter={() => setActiveMenu('men')}>
                    <a href="#" className="menu_link" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Men</a>
                    {activeMenu === 'men' && (
                        <div className="submenu_container active">
                            <div className="submenu_item">
                                <b className="submenu_title">의류</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>반팔</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>바람막이/집업</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>맨투맨/후디</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>긴팔</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>쇼츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>팬츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>트레이닝 셋업</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Heritage Collection</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">신발</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>라이프스타일</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>샌들/슬리퍼</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>에샤페</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>인터런</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">용품</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>피클볼</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>백팩</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>숄더/토트백</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>메신저/크로스백</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>슬링백/힙색</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>모자</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>양말</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>기타</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">언더웨어</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>BEST</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>패키지</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>쿨웨이브</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>스포르트/스포츠웨어</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>드로즈</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>트렁크</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>스포츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>파자마</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>이지웨어</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Accessories</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">스포츠</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>테니스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>러닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>트레이닝</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>피클볼</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </li>
                <li onMouseEnter={() => setActiveMenu('kids')}>
                    <a href="#" className="menu_link" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Kids</a>
                    {activeMenu === 'kids' && (
                        <div className="submenu_container active">
                            <div className="submenu_item">
                                <b className="submenu_title">의류</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>FILA KIDS</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>상하의 셋업</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>티셔츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>쇼츠</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>팬츠/레깅스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>바람막이/집업/자켓</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>후드티/맨투맨</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>스커트</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>원피스</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>스윔웨어</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">신발</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>전체보기</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>어반크릭샌들</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>리틀에샤페</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>레인저/레인저코어</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>인터런 키즈</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>휠라꾸미</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>샌들</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>운동화(130~160mm)</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>운동화(170~240mm)</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>레인부츠</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </li>
                <li onMouseEnter={() => setActiveMenu('tennis')}>
                    <a href="#" className="menu_link" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Tennis</a>
                    {activeMenu === 'tennis' && (
                        <div className="submenu_container active">
                            <div className="submenu_item">
                                <b className="submenu_title">New & Featured</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>The Court Is Yours</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Jaqueline Cristian</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>AXILUS 3 T9</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>Tennis Shoes Guide</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">여성</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>의류</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>신발</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>용품</a></li>
                                </ul>
                            </div>
                            <div className="submenu_item">
                                <b className="submenu_title">남성</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>의류</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>신발</a></li>
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>용품</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </li>
                <li onMouseEnter={() => setActiveMenu('f.h.c')}>
                    <a href="#" className="menu_link" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>F.H.C</a>
                    {activeMenu === 'f.h.c' && (
                        <div className="submenu_container active">
                            <div className="submenu_item">
                                <b className="submenu_title">FILA Heritage Collection</b>
                                <ul className="submenu">
                                    <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('list'); }}>SS26</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                </li>
            </ul>

            <nav>
                <ul>
                    <li><a className="header_icon" href="#" onClick={(e) => e.preventDefault()}><i className="fa-solid fa-magnifying-glass"></i></a></li>
                    <li><a className="header_icon" href="#" onClick={(e) => e.preventDefault()}><i className="fa-regular fa-user"></i></a></li>
                    <li>
                        <a className="header_icon" href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('cart'); }} style={{ position: 'relative', display: 'inline-block' }}>
                            <i className="fa-solid fa-bag-shopping"></i>
                            {cartCount > 0 && (
                                <span style={{ position: 'absolute', top: '-7px', right: '-9px', background: '#ff4d4f', color: 'white', borderRadius: '50%', padding: '1px 5px', fontSize: '10px', fontWeight: 'bold' }}>
                                    {cartCount}
                                </span>
                            )}
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
