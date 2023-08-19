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
  const { storeId, tableNum, customerNum, menuData } = location.state;
  const store = stores[storeId];
  const [menuCountData, setMenuCountData] = useState(menuData);

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
          <Title className="menu-name" level={4} style={{ marginTop: 10 }}>{menuName}</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        </div>
      </div>

      <div className="footer">
        <div style={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
          <div style={{ flex: 7, display: 'flex', justifyContent: 'center'}}>
          <p style={{ fontSize: '20px', fontWeight: '600', marginRight: '10%'}}>총 주문금액</p>
          <p style={{ fontSize: '20px' }}>{calculateTotalPrice()}원</p>
          </div>
          <div style={{ flex: 3, justifyContent: 'flex-end', padding: 5 }}>
          <Button 
            type="primary" 
            size="large" 
            onClick={() => navigate('/pay', { totalPrice: calculateTotalPrice() })}
          >
            결제하기
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

