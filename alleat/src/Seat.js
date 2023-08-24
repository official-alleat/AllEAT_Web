import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants, getRestaurant } from "./graphql/queries";
import { updateRestaurant } from "./graphql/mutations";
import { Image, Modal, Button, Typography, Row, InputNumber, Spin } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores.js';
import Navigation from './Navigation';
import './Seat.css';

const { Text } = Typography;

export default function Seat() {
    const location = useLocation();
    const navigate = useNavigate();

    const storeId = location.state? location.state.storeId: localStorage.getItem('storeId');
    const totalPrice = location.state? location.state.totalPrice: localStorage.getItem('totalPrice');
    const menuCountData = location.state? location.state.menuCountData: localStorage.getItem('menuCountData');
    useEffect(() => {
      localStorage.setItem('storeId', storeId);
      localStorage.setItem('totalPrice', totalPrice);
      localStorage.setItem('menuCountData', menuCountData);
    }, [storeId, totalPrice, menuCountData]);
    const store = stores[storeId];
    const tables = store.tables;

    const [modalVisible, setModalVisible] = useState(false);
    const [chooseOtherSeatVisible, setchooseOtherSeatVisible] = useState(false);
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [tableItem, setTableItem] = useState({});
    const [restaurants, setRestaurants] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async() => {
      try {
        setRefreshing(true);
        const restaurant = await API.graphql(graphqlOperation(listRestaurants, {
          filter: {
            storeId: {
              eq: storeId
            }
          }
        }));
        setRestaurants(restaurant.data.listRestaurants.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setRefreshing(false);
      }
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
      const interval = setInterval(() => {
        fetchData();
      }, 10000); // Fetch data every 10 seconds
  
      return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //   fetchData();

    //   //데이터 변경사항을 구독하여 화면 업데이트
    //   const subscription = DataStore.observe(Restaurant).subscribe(msg => {
    //     console.log(msg.model, msg.opType, msg.element);
    //     fetchData();
    //   });
    //   return () => subscription.unsubscribe();
    // }, [storeId]);
    
    const showChooseOhterSeatModal = () => {
      setchooseOtherSeatVisible(true);
      
      // 2초 후에 모달 닫기
      setTimeout(() => {
        setchooseOtherSeatVisible(false);
      }, 2000);
    };

    const isRealTimeEmptyTable = async() => {
      const realtimeTable = await API.graphql(graphqlOperation(getRestaurant, {
        id: tableItem.id
      }));
      console.log(realtimeTable);
      return realtimeTable.data.getRestaurant.available
    }

    const reserveTable = async() => {
      const isEmpty = await isRealTimeEmptyTable()
      if (isEmpty === true){
        //move to 결제 page
        console.log('결제하면 됨!')

        await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: false} }))
        .then(result => {
          console.log('Restaurant updated:', result.data.updateRestaurant);
          fetchData();
        })
        .catch(error => {
          console.error('Error updating restaurant:', error);
        });

        // setTimeout(() => {
        //   releaseTable();
        // }, 5000); // 5초 뒤에 releaseTable 함수 호출

        navigate('/pay', {state: {
          storeId: storeId,
          tableNum: tableItem.tableNumber,
          customerNum: adultCount + childCount,
          totalPrice: totalPrice,
          menuCountData: menuCountData
        }})

      }
      else {
        //다른 좌석을 선택해주세요! 띄우기
        showChooseOhterSeatModal();
        fetchData();
      }
    }

    const getAvailability = (target_table) => {
      const table = restaurants.find(item => item.tableNumber === target_table);
      return table ? table.available : null;
    }

    const releaseTable = async () => {
      await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: true} }))
        .then(result => {
          console.log('Restaurant updated:', result.data.updateRestaurant);
          fetchData();
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

    // if (refreshing){
    //   return (
    //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    //       <Spin tip="Refreshing">
    //         <div className="content" />
    //       </Spin>
    //     </div>
    //   )
    // }

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

      <div className="table-info">
        <div className="table-grid">
          {getTables()}
        </div>
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
            type="primary"
            onClick={() => reserveTable()}
          >
            예약하기
          </Button>,
        ]}
      >
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{ marginRight: '10px' }}>성인</Text>
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setAdultCount(pre => Math.max(1, pre - 1))}/>
            <InputNumber style={{ margin: 10 }} value={adultCount} controls={false} onChange={value => setAdultCount(value)} min={1} />
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setAdultCount(pre => pre + 1)}/>
          </Row>
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text style={{ marginRight: '10px' }}>유아</Text>
            <MinusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setChildCount(pre => Math.max(0, pre - 1))}/>
            <InputNumber style={{ margin: 10 }} value={childCount} controls={false} onChange={value => setChildCount(value)} min={0} />
            <PlusCircleOutlined style={{ fontSize: '24px' }} onClick={() => setChildCount(pre => pre + 1)}/>
          </Row>
      </Modal>
      <Modal
        title="인원 선택"
        open={chooseOtherSeatVisible}
        onCancel={() => setchooseOtherSeatVisible(false)}
        okText="확인"
        cancelText="취소">
        <Text>이미 선택된 좌석입니다. 다른 좌석을 골라주세요.</Text>
      </Modal>
    </div>
  );
}
