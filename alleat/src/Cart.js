import React, { useState } from 'react';
import { Typography, Button, InputNumber } from 'antd';
import stores from './stores';
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Cart() {
    const location = useLocation();
    const navigate = useNavigate();
    const { storeId, tableNum, customerNum, menuData } = location.state
  const [menuCountData, setMenuCountData] = useState(menuData);

  const handleDecrease = (menuName) => {
    if (menuCountData[menuName].count > 0) {
      setMenuCount(menuName, menuCountData[menuName].count - 1);
    }
  };

  const handleIncrease = (menuName) => {
    setMenuCount(menuName, menuCountData[menuName].count + 1);
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
        <div key={index} style={styles.menuCell}>
          <Title level={4}>{menuName}</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={styles.menuPrice}>{menuCountData[menuName].price}원</p>
            <div style={{ display: 'flex' }}>
              <Button onClick={() => handleDecrease(menuName)}>-</Button>
              <p style={styles.menuCount}>{menuCountData[menuName].count}</p>
              <Button onClick={() => handleIncrease(menuName)}>+</Button>
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
    <div style={styles.container}>
      <div style={styles.header}>
        <Title level={3}>{stores[storeId].name}</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={styles.headerText}>테이블 번호: {tableNum}</p>
          <p style={styles.headerText}>인원수: {customerNum}</p>
        </div>
      </div>
      <div style={styles.menuList}>
        {renderCartItems()}
      </div>
      <div style={styles.footer}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px' }}>
          <p style={{ flex: 7, fontSize: '20px', fontWeight: '600' }}>총 주문금액</p>
          <p style={{ flex: 3, fontSize: '20px', textAlign: 'right' }}>{calculateTotalPrice()}원</p>
        </div>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => navigate('/pay', { totalPrice: calculateTotalPrice() })}
        >
          결제하기
        </Button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: '10%',
    padding: '10px',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: '20px',
    fontWeight: '400',
  },
  menuList: {
    margin: '10px 0',
    backgroundColor: 'white',
  },
  menuCell: {
    borderBottom: '1px solid #DEDEDE',
    padding: '5px',
  },
  menuPrice: {
    fontSize: '20px',
  },
  menuCount: {
    fontSize: '20px',
    margin: '0 20px',
  },
  footer: {
    position: 'relative',
    padding: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};
