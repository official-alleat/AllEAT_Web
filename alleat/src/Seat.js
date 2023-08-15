import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Image, Modal, Button, Typography, Row, Col, InputNumber } from 'antd';
import { w3cwebsocket} from 'websocket'
import stores from './stores.js';
import './Store.css';

const { Title, Text } = Typography;

export default function Seat() {
    const location = useLocation();
    const navigate = useNavigate();
    const storeId = location.state?.storeId;
    const store = stores[storeId];
    const tables = store.tables;

    const [modalVisible, setModalVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [tableNum, setTableNum] = useState(0);
    const [tablesStatus, setTablesStatus] = useState([]);

    useEffect(() => {
      const ws = new w3cwebsocket('ws://localhost:8080');
        ws.onopen = () => {
          console.log('Connection is open.');
          ws.send(JSON.stringify({ 'storeId': storeId, 'tableNum': -1, 'command': 'get' }));
        };
    
        ws.onmessage = (event) => {
          console.log('Received from server:', event.data);
    
          const jsonData = JSON.parse(event.data);
          const newStatus = jsonData[1]['available'];
          setTablesStatus(newStatus);
        };
    
        ws.onerror = (error) => {
          console.log('WebSocket error:', error);
        };
    
        return () => {
          ws.close();
          console.log('Connection is closed.');
        };
    }, [storeId]);

    console.log(tablesStatus)
    
    const getTables = () => {
        return (
          tables.map((tableRow, row) => (
            <Row key={row} gutter={[10, 10]} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
              {tableRow.map((table, col) => (
                <Col key={row * 100 + col}>
                  {table ?
                    tablesStatus[table] ?
                      <Button
                        className="availableTable"
                        onClick={() => { setModalVisible(!modalVisible); setTableNum(table); }}
                      >
                        좌석{table}
                      </Button>
                      :
                      <Button
                        className="reservedTable"
                        onClick={() => { setTableNum(table); }}
                      >
                        좌석{table}
                      </Button>
                    :
                    <div style={{height: '50px', width:'50px'}}></div>
                  }
                </Col>
              ))}
            </Row>
          ))
        );
    };

    return (
    <div className="container">
      <div className="storeCell">
        <div className="storeDescription">
          <Image style={{height: "200px"}} src={store.image} />
          <div>
            <Title level={4}>{store.name}</Title>
            <div>{store.tag}</div>
            <div>{store.location}</div>
          </div>
        </div>
      </div>

      <div className="tableGrid">
        {getTables()}
        {/* <Button onClick={() => ws.send(JSON.stringify({ 'storeId': storeId, 'tableNum': tableNum, 'command': 'reserve' }))}>예약하기</Button>
        <Button onClick={() => ws.send(JSON.stringify({ 'storeId': storeId, 'tableNum': tableNum, 'command': 'cancel' }))}>취소하기</Button> */}
        <Button onClick={() => console.log('예약하기')}>예약하기</Button>
        <Button onClick={() => console.log('취소하기')}>취소하기</Button>
      </div>

      <Modal
        title="인원 선택"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            취소
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() =>
              navigate('/menu', {state: {
                storeId: storeId,
                tableNum: tableNum,
                customerNum: adultCount + childCount
              }})
            }
          >
            메뉴 고르기
          </Button>,
        ]}
      >
        <Row gutter={[10, 10]} align="middle">
          <Col>
            <Text>성인</Text>
            <Button onClick={() => setAdultCount(pre => Math.max(0, pre - 1))}>-</Button>
            <InputNumber value={adultCount} onChange={value => setAdultCount(value)} min={0} />
            <Button onClick={() => setAdultCount(pre => pre + 1)}>+</Button>
          </Col>
          <Col>
            <Text>유아</Text>
            <Button onClick={() => setChildCount(pre => Math.max(0, pre - 1))}>-</Button>
            <InputNumber value={childCount} onChange={value => setChildCount(value)} min={0} />
            <Button onClick={() => setChildCount(pre => pre + 1)}>+</Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}