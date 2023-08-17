import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from "./graphql/queries";
import { updateRestaurant } from "./graphql/mutations";
import { Image, Modal, Button, Typography, Row, Col, InputNumber } from 'antd';
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
    const [tableItem, setTableItem] = useState({});
    const [restaurants, setRestaurants] = useState([]);

    const fetchData = async(storeId) => {
      const restaurant = await API.graphql(graphqlOperation(listRestaurants, {
        filter: {
          storeId: {
            eq: storeId
          }
        }
      }));
      setRestaurants(restaurant.data.listRestaurants.items);
    }

    useEffect(() => {
      fetchData()
    }, [storeId]);

    const reserveTable = async() => {
      await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: false} }))
        .then(result => {
          console.log('Restaurant updated:', result.data.updateRestaurant);
          fetchData(storeId);
        })
        .catch(error => {
          console.error('Error updating restaurant:', error);
        });
    }

    const getAvailability = (target_table) => {
      const table = restaurants.find(item => item.tableNumber === target_table);
      return table ? table.available : null;
    }

    const releaseTable = async () => {
      await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: true} }))
        .then(result => {
          console.log('Restaurant updated:', result.data.updateRestaurant);
          fetchData(storeId);
        })
        .catch(error => {
          console.error('Error updating restaurant:', error);
        });
    }
    
    const getTables = () => {
        return (
          tables.map((tableRow, row) => (
            <Row key={row} gutter={[10, 10]} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
              {tableRow.map((table, col) => (
                <Col key={row * 100 + col}>
                  {table ?
                    getAvailability(table) ?
                      <Button
                        className="availableTable"
                        onClick={() => { setTableItem(restaurants.find(item => item.tableNumber === table)); setModalVisible(!modalVisible); }}
                      >
                        좌석{table}
                      </Button>
                      :
                      <Button
                        className="reservedTable"
                        onClick={() => { setTableItem(restaurants.find(item => item.tableNumber === table)); }}
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
        <Button onClick={() => reserveTable()}>예약하기</Button>
        <Button onClick={() => releaseTable()}>취소하기</Button>
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
                tableNum: tableItem.tableNumber,
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