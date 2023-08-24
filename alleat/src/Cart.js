import React, { useState } from 'react';
import { Typography, Button, Image } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores';
import Navigation from './Navigation';
import './Cart.css';
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function Cart() {
  const location = useLocation();
  const navigate = useNavigate();
  const { storeId, menuData } = location.state;
  const store = stores[storeId];
  const [menuCountData, setMenuCountData] = useState(menuData);

  const handleContinueButtonClick = () => {
    // Update the menu data in localStorage
    localStorage.setItem('menuData', JSON.stringify(menuCountData));
    navigate(-1); // Go back to the previous page
  };

  const handleIncrease = (menuName) => {
    setMenuCount(menuName, menuCountData[menuName].count + 1);
  };

  const handleDecrease = (menuName) => {
    if (menuCountData[menuName].count > 1) {
      setMenuCount(menuName, menuCountData[menuName].count - 1);
    }
  };
  
  const handleRemove = (menuName) => {
    const updatedMenuCountData = {
      ...menuCountData,
      [menuName]: {
        ...menuCountData[menuName],
        count: 0,
      },
    };
    setMenuCountData(updatedMenuCountData);
  };

  const setMenuCount = (menuName, count) => {
    const updatedMenuCountData = {
      ...menuCountData,
      [menuName]: {
        ...menuCountData[menuName],
        count: count,
      },
    };
    setMenuCountData(updatedMenuCountData);
  };

  const renderCartItems = () => {
    return Object.keys(menuCountData).map((menuName, index) => (
      menuCountData[menuName].count > 0 && (
        <div className="menu-cell" key={index}>
          <span className='menu-cancel' onClick={() => handleRemove(menuName)}>X</span>
          <Title className="menu-name" level={4} style={{ fontSize: '18px', marginTop: 10 }}>{menuName}</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text className="menu-price">{menuCountData[menuName].price}원</Text>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => handleDecrease(menuName)}/>
              <Text className='menu-count'>{menuCountData[menuName].count}</Text>
              <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={() => handleIncrease(menuName)}/>
            </div>
          </div>
        </div>
      )
    ));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    Object.keys(menuCountData).forEach((menuName) => {
      totalPrice += menuCountData[menuName].price * menuCountData[menuName].count;
    });
    return totalPrice;
  };

  return (
    <div className="container">
      <Navigation />
      <div className="store-info">
        <div className="store-cell">
          <div className="store-description">
            <Image style={{width: '70px', height: '70px', marginRight: '10px', borderRadius: '7px'}} src={store.image}/>
            <div>
              <div className="store-name">{store.name}</div>
              <div className="store-tag">{store.tag}</div>
              <div className="store-location">{store.location}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="menu-list-container">
        <div className="menu-list">
          {renderCartItems()}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
            <Text style={{ fontSize: '20px', fontWeight: '600', marginRight: '10%'}}>총 주문금액</Text>
            <Text style={{ fontSize: '20px' }}>{calculateTotalPrice()}원</Text>
          </div>
        </div>
      </div>

      <div className="footer">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 5 }}>
          <div className='button-container'>
            <Button 
              type="default" 
              size="large" 
              onClick={handleContinueButtonClick}
            >
              메뉴 추가하기
            </Button>
          </div>
          <Button 
            type="primary" 
            size="large" 
            onClick={() => navigate('/seat', {state: {
              storeId: storeId, totalPrice: calculateTotalPrice(), menuCountData: menuCountData}})}
          >
            좌석 선택하기
          </Button>
        </div>
      </div>
    </div>
  );
}

