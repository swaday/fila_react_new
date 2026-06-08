import React from 'react';

// 탭 네비게이션 (탭 버튼 목록 + 좌우 화살표)
function TabButtons({ tabs, activeTab, onTabChange }) {
    return (
        <div className="trending_section_items">
            <ul>
                {tabs.map((tab, i) => (
                    <li key={i}>
                        <button
                            type="button"
                            className={activeTab === i ? 'active' : ''}
                            onClick={() => onTabChange(i)}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="arrow_button_container">
                <button type="button" className="arrow_button">
                    <i className="fa-solid fa-caret-left"></i>
                </button>
                <button type="button" className="arrow_button">
                    <i className="fa-solid fa-caret-right"></i>
                </button>
            </div>
        </div>
    );
}

export default TabButtons;
