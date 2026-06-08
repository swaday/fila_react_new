import React, { useState } from 'react';

function EventBar() {
    const [showEvent, setShowEvent] = useState(true);
    if (!showEvent) return null;

    return (
        <div className="event">
            <span>FILA 카카오 플러스친구 추가 시 10% 쿠폰 발급</span>
            <button type="button" onClick={() => setShowEvent(false)}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    );
}

export default EventBar;
