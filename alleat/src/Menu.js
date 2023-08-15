import React, { useState, useEffect } from 'react';
import { Button, Modal, Card, Typography, Badge, message } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import stores from './stores';
import './Menu.css';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Menu() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const { storeId, tableNum, customerNum } = location.state
  const store = stores[storeId];
  const menu_data = store.menu;

  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  const initialMenuData = menu_data.reduce((data, menuItem) => {
    data[menuItem.menu_name] = { price: menuItem.price, count: 0 };
    return data;
  }, {});

  const [menuData, setMenuData] = useState(initialMenuData);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setVisible(true);
    setCount(menuData[item.menu_name]?.count);
  };

  const setMenuCount = () => {
    // Update the quantity for the selected item
    setMenuData((prevData) => ({
      ...prevData,
      [selectedItem.menu_name]: {
        ...prevData[selectedItem.menu_name],
        count: count,
      },
    }));
    setVisible(false);
    setCount(0);
    setShowMessage(true);
  };

  const totalCount = Object.values(menuData).reduce((total, item) => total + item.count, 0);

  return (
    <div className="container">
      <div className="header">
        <Title level={3}>{stores[storeId].name}</Title>
        <div className="header-text">
          <Text>테이블 번호: {tableNum}</Text>
          <Text>인원수: {customerNum}</Text>
        </div>
      </div>
      <div className="menuContainer">
        {menu_data.map((item, index) => (
          <Card
            key={index}
            className="menuCard"
            onClick={() => handleCardPress(item)}
            hoverable
            cover={<img alt={item.menu_name} src={item.image} className="menuImage" />}
          >
            <div className="menuContent">
              <Title level={5}>{item.menu_name}</Title>
              <Text>{item.price.toLocaleString()}원</Text>
            </div>
          </Card>
        ))}
      </div>
      {!!totalCount && (
        <div className="footer">
          <Button
            type="primary"
            onClick={() =>
              navigate('/cart', {state: {
                storeId: storeId,
                tableNum: tableNum,
                customerNum: customerNum,
                menuData: menuData,
              }})
            }
            disabled={!totalCount}
            className="cartButton"
          >
            장바구니 확인 후 결제하기
          </Button>
          <Badge count={totalCount} className="badge" />
        </div>
      )}
      <Modal
        title={selectedItem?.menu_name}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            취소
          </Button>,
          <Button key="confirm" type="primary" onClick={setMenuCount}>
            담기
          </Button>,
        ]}
      >
        <div className="modalContent">
          <Title level={5}>{selectedItem?.menu_name}</Title>
          <Text>{selectedItem?.price}원</Text>
          <div className="counter">
            <Button icon={<MinusOutlined />} onClick={decreaseCount} />
            <Text>{count}</Text>
            <Button icon={<PlusOutlined />} onClick={increaseCount} />
          </div>
        </div>
      </Modal>
      {showMessage && (
        <div className="message">
          <Text>메뉴가 장바구니에 담겼습니다</Text>
        </div>
      )}
    </div>
  );
};