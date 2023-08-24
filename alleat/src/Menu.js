import React, { useState, useEffect } from 'react';
import { Button, message, Modal, Row, Col, Card, Typography, Badge, Image, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores';
import Navigation from './Navigation';
import './Menu.css';
import { useLocation, useNavigate} from 'react-router-dom';

const { Title, Text } = Typography;

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const storeId = location.state? location.state.storeId: localStorage.getItem('storeId');
  useEffect(() => {
      localStorage.setItem('storeId', storeId);
  }, [storeId]);

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

  useEffect(() => {
    // Check if there's stored menu data in localStorage
    const storedMenuData = JSON.parse(localStorage.getItem('menuData'));
    if (storedMenuData) {
      setMenuData(storedMenuData);
    }
  }, []);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    setMenuCount();

    message.destroy(); // Destroy any existing messages
    message.success('메뉴가 장바구니에 담겼습니다.', 2); // Show new message for 2 seconds
  };

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setVisible(true);
    setCount(menuData[item.menu_name]?.count);
  };

  const setMenuCount = () => {
    // Update the quantity for the selected item
    const updatedMenuData = {
      ...menuData,
      [selectedItem.menu_name]: {
        ...menuData[selectedItem.menu_name],
        count: count,
      },
    };
    setMenuData(updatedMenuData);
    localStorage.setItem('menuData', JSON.stringify(updatedMenuData)); // Save to localStorage
    setVisible(false);
    setCount(0);
    setShowMessage(true);
  };

  const totalCount = Object.values(menuData).reduce((total, item) => total + item.count, 0);

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

      <div className="menu-info">
        <div className="menu-grid">
          <Row gutter={[16, 16]}>
            {menu_data.map((item, index) => (
              <Col key={index} xs={12} sm={8} md={6} lg={4}>
                <Card
                  className="menu-card"
                  onClick={() => handleCardPress(item)}
                  hoverable
                  cover={<img alt={item.menu_name} src={item.image} className="menuImage" style={{ width: '100%' }}/>}
                  style={{ width: '100%', height: '100%'}}
                >
                  <div className="menu-content">
                    <Title level={5} style={{ marginTop: 5 }}>{item.menu_name}</Title>
                    <Text>{item.price.toLocaleString()}원</Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* {showMessage && (
        <div className="message" style={{ position: 'fixed', bottom: '100px', width: '100%', textAlign: 'center' }}>
          <Text>메뉴가 장바구니에 담겼습니다</Text>
        </div>
      )} */}
      {totalCount > 0 && (
        <div className="footer">
          <div style={{ margin: 5 }}>
            <Button
              type="primary"
              size="large"
              onClick={() =>
                navigate('/cart', {state: {
                  storeId: storeId,
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
          <Button key="confirm" type="primary" onClick={handleAddToCart}>
            담기
          </Button>,
        ]}
      >
        <div className="modalContent">
          <Text style={{ fontSize: 16 }}>{selectedItem?.price}원</Text>
          <div className="counter">
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={decreaseCount} />
            <InputNumber style={{ marginLeft: 10, marginRight: 10 }} controls={false} value={count} onChange={value => setCount(value)} min={0}/>
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={increaseCount}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};