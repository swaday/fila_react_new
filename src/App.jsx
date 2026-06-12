import React, { useState } from 'react';
import './styles/public.css';
import './styles/index.css';
import './styles/header.css';
import './styles/cart.css';
import './styles/detail.css';
import './styles/item_list.css';
import './styles/popup.css';
import EventBar from './components/EventBar';
import Header from './components/Header';
import LayoutPopup from './components/LayoutPopup';
import MainHome from './pages/MainHome';
import ItemList from './pages/ItemList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
    const [showEvent, setShowEvent] = useState(true);
    const [currentPage, setCurrentPage] = useState('home');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            brand: 'FILA TENNIS',
            name: '테니스 Coldwave+ 베이직 7인치 쇼츠 (기본 샘플)',
            option: '화이트 / L',
            price: 49000,
            quantity: 1,
            image: './image/detail_shorts1.webp',
            checked: true
        }
    ]);

    const handleAddToCart = (newItem) => {
        setCartItems(prev => {
            const allCurrentlyChecked = prev.length > 0 && prev.every(item => item.checked);
            return [...prev, { ...newItem, checked: allCurrentlyChecked }];
        });
    };

    const handleDeleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const handleToggleCheck = (id) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    // 옵션/수량 변경 핸들러
    const handleUpdateItem = (id, updates) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, ...updates } : item
        ));
    };

    return (
        <div className="App">
            {isPopupOpen && <LayoutPopup onClose={() => setIsPopupOpen(false)} onAddToCart={handleAddToCart} />}
            <div className="HeaderWrapper">
                <EventBar showEvent={showEvent} setShowEvent={setShowEvent} />
                <Header setCurrentPage={setCurrentPage}
                        cartCount={cartItems.length}
                        isEventVisible={showEvent}
                />
            </div>
            <main>
                {currentPage === 'home' && <MainHome setCurrentPage={setCurrentPage} />}
                {currentPage === 'list' && <ItemList setCurrentPage={setCurrentPage} />}
                {currentPage === 'detail' && <ProductDetail onAddToCart={handleAddToCart} setCurrentPage={setCurrentPage} />}
                {currentPage === 'cart' && (
                    <Cart
                        items={cartItems}
                        onDelete={handleDeleteItem}
                        onToggleCheck={handleToggleCheck}
                        onUpdateItem={handleUpdateItem}
                    />
                )}
            </main>
        </div>
    );
}

export default App;
