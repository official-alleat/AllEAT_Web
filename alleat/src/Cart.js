import React, { useState } from 'react';
import { Typography, Button, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores';
import { useLocation, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

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
          <Title level={4} style={{ textAlign: 'left' }}>{menuName}</Title>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={styles.menuPrice}>{menuCountData[menuName].price}원</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => handleDecrease(menuName)}/>
              <p style={styles.menuCount}>{menuCountData[menuName].count}</p>
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
    <div style={styles.container}>
      <div className="header" style={{ margin: 15 }}>
        <Title level={3}>{stores[storeId].name}</Title>
        <div className="header-text" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '400',}}>테이블 번호: {tableNum}</Text>
          <Text style={{ fontSize: 20, fontWeight: '400',}}>인원수: {customerNum}</Text>
        </div>
      </div>
      <div style={styles.menuList}>
        {renderCartItems()}
      </div>
      <div style={{ ...styles.footer, position: 'fixed', bottom: 0, width: '100%'}}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '14px' }}>
          <p style={{ fontSize: '20px', fontWeight: '600', marginRight: '10%'}}>총 주문금액</p>
          <p style={{ fontSize: '20px' }}>{calculateTotalPrice()}원</p>
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
    margin: 15,
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
    position: 'fix',
    bottom: 0,
    width: '100%',
    padding: '16px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
};
