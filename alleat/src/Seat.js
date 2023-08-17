import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from "./graphql/queries";
import { updateRestaurant } from "./graphql/mutations";
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant } from "./models"
import { Image, Modal, Button, Typography, Row, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores.js';
import './Seat.css';
import './bootstrap.css';

const { Text } = Typography;

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

    const fetchData = async() => {
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
      fetchData();

      //데이터 변경사항을 구독하여 화면 업데이트
      const subscription = DataStore.observe(Restaurant).subscribe((msg) => {
        console.log(msg.model, msg.opType, msg.element);
        fetchData();
      });
      return () => subscription.unsubscribe();
    }, [storeId]);

    const reserveTable = async() => {
      await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: false} }))
        .then(result => {
          console.log('Restaurant updated:', result.data.updateRestaurant);
          // fetchData();
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
          // fetchData();
        })
        .catch(error => {
          console.error('Error updating restaurant:', error);
        });
    }
    
    const getTables = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {tables.map((tableRow, row) => (
            <div key={row} style={{ display: 'flex', flexDirection: 'row' }}>
              {tableRow.map((table, col) => (
                <div
                  key={row * 100 + col}
                  style={{
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '5px',
                    border: table && '1px solid gray',
                    borderRadius: '7px',
                    backgroundColor: table ? (getAvailability(table) ? 'white' : '#616161') : '#fff'
                  }}
                  onClick={() => {
                    if (table) {
                      if (getAvailability(table)) {
                        setTableItem(restaurants.find(item => item.tableNumber === table));
                        setModalVisible(!modalVisible);
                      } else {
                        setTableItem(restaurants.find(item => item.tableNumber === table));
                      }
                    }
                  }}
                >
                  {table ? `좌석${table}` : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    return (
    <div className="container">
      <div className="StoreCell">
        <div className="StoreDescription">
          <Image style={{width: '60px', height: '60px', marginRight: '10px', borderRadius: '7px'}} src={store.image}/>
          <div>
            <div className="StoreName">{store.name}</div>
            <div className="StoreTag">{store.tag}</div>
            <div className="StoreLocation">{store.location}</div>
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
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{ marginRight: '10px' }}>성인</Text>
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setAdultCount(pre => Math.max(0, pre - 1))}/>
            <InputNumber style={{ margin: 10 }} value={adultCount} controls={false} onChange={value => setAdultCount(value)} min={0} />
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setAdultCount(pre => pre + 1)}/>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{ marginRight: '10px' }}>유아</Text>
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setChildCount(pre => Math.max(0, pre - 1))}/>
            <InputNumber style={{ margin: 10 }} value={childCount} controls={false} onChange={value => setChildCount(value)} min={0} />
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setChildCount(pre => pre + 1)}/>
          </Row>
      </Modal>
    </div>
  );
}
