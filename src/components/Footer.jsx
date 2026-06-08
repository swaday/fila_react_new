import React from 'react';
import { footerData } from '../data/footerData';

function Footer() {
    return (
        <footer>
            <div>
                {/* 1. 상단 내비게이션 영역 */}
                <section className="site_nav">
                    {Object.entries(footerData).map(([title, links]) => (
                        <div key={title}>
                            <h4>{title.charAt(0).toUpperCase() + title.slice(1)}</h4>
                            <ul>
                                {links.map((link) => (
                                    <li key={link}><a href="#" onClick={(e) => e.preventDefault()}>{link}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                {/* 2. SNS 및 연락처 영역 */}
                <div>
                    <section className="sns_nav">
                        <nav>
                            <ul>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="#" onClick={(e) => e.preventDefault()}><i className="fa-brands fa-youtube"></i></a></li>
                            </ul>
                        </nav>
                    </section>

                    <section className="me_information">
                        <div>딩동댕</div>
                        <div>dingdongdang@naver.com</div>
                        <div>평일 월 - 금 : 09시 - 18시 (공휴일 제외)</div>
                    </section>
                </div>
            </div>

            <hr />

            {/* 3. 기업 정보 및 고지사항 영역 */}
            <div>
                <section className="corp_information">
                    <div>
                        <div>
                            <span>미스토코리아(주) 대표이사 : 김지헌</span>
                            <span>서울특별시 성북구 보문로 35</span>
                            <span>사업자등록번호 : 716-81-01573 사업자정보확인</span>
                        </div>
                        <div>
                            <span>통신판매업신고 : 제 2024-서울성북-0914 호</span>
                            <span>개인정보 보호책임자 : 이학우</span>
                        </div>
                    </div>
                </section>
                <section className="site_information">
                    <div>본 사이트는 실제로 동작하는 사이트가 아닙니다.</div>
                    <div>본 사이트의 상품이미지 저작권은 미스토코리아(주)에 있으며, 사이트의 내용은 법적 효력이 없습니다.</div>
                </section>
            </div>
        </footer>
    );
}

export default Footer;
