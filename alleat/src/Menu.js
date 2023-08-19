import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Card, Typography, Badge, message, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
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
      <div className="header" style={{ margin: 15 }}>
        <Title level={3}>{stores[storeId].name}</Title>
        <div className="header-text" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '400',}}>테이블 번호: {tableNum}</Text>
          <Text style={{ fontSize: 20, fontWeight: '400',}}>인원수: {customerNum}</Text>
        </div>
      </div>
      <Row gutter={[16, 16]}>
  {menu_data.map((item, index) => (
    <Col key={index} xs={8} sm={8} md={6} lg={4}>
      <Card
        className="menuCard"
        onClick={() => handleCardPress(item)}
        hoverable
        cover={<img alt={item.menu_name} src={item.image} className="menuImage" />}
        style={{ width: '100%' }}
      >
        <div className="menuContent">
          <Title level={5}>{item.menu_name}</Title>
          <Text>{item.price.toLocaleString()}원</Text>
        </div>
      </Card>
    </Col>
  ))}
</Row>
      {showMessage && (
        <div className="message" style={{ position: 'fixed', bottom: '100px', width: '100%', textAlign: 'center' }}>
          <Text>메뉴가 장바구니에 담겼습니다</Text>
        </div>
      )}
      {!!totalCount && (
        <div className="footer" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
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
          <Text style={{ fontSize: 16 }}>{selectedItem?.price}원</Text>
          <div className="counter" style={{ marginTop: 10 }}>
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={decreaseCount} />
            <InputNumber style={{ marginLeft: 10, marginRight: 10 }} controls={false} value={count} onChange={value => setCount(value)} min={0}/>
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={increaseCount}/>
          </div>
        </div>
      </Modal>
    </div>
  );
};