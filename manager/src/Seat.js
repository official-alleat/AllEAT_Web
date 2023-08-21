import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
// import { listRestaurants, getRestaurant } from "./graphql/queries";
// import { updateRestaurant } from "./graphql/mutations";
import { Image, Modal, Button, Typography, Row, InputNumber, Spin } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import stores from './stores.js';
import Navigation from './Navigation';
import './Seat.css';

const { Text } = Typography;

export default function Seat() {
    return (
    <div className="container">
        <Navigation />
        <div>좌석 개발 중..</div>
    </div>)
//     const location = useLocation();
//     const navigate = useNavigate();

//     const storeId = location.state? location.state.storeId: localStorage.getItem('storeId');
//     useEffect(() => {
//       localStorage.setItem('storeId', storeId);
//     }, [storeId]);
//     const store = stores[storeId];
//     const tables = store.tables;

//     const [modalVisible, setModalVisible] = useState(false);
//     const [chooseOtherSeatVisible, setchooseOtherSeatVisible] = useState(false);
//     const [tableItem, setTableItem] = useState({});
//     const [restaurants, setRestaurants] = useState([]);
//     const [refreshing, setRefreshing] = useState(false);
//     const [isMoving, setIsMoving] = useState(false);
//     const [adminModalvisible, setAdminModalvisible] = useState(false);
//     const [fillSeatModalVisible, setFillSeatModalVisible] = useState(false);

//     const fetchData = async() => {
//       try {
//         setRefreshing(true);
//         const restaurant = await API.graphql(graphqlOperation(listRestaurants, {
//           filter: {
//             storeId: {
//               eq: storeId
//             }
//           }
//         }));
//         setRestaurants(restaurant.data.listRestaurants.items);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setRefreshing(false);
//       }
//       const restaurant = await API.graphql(graphqlOperation(listRestaurants, {
//         filter: {
//           storeId: {
//             eq: storeId
//           }
//         }
//       }));
//       setRestaurants(restaurant.data.listRestaurants.items);
//     }

//     useEffect(() => {
//       fetchData();
//       const interval = setInterval(() => {
//         fetchData();
//       }, 10000); // Fetch data every 10 seconds
  
//       return () => clearInterval(interval);
//     }, []);

//     // useEffect(() => {
//     //   fetchData();

//     //   //데이터 변경사항을 구독하여 화면 업데이트
//     //   const subscription = DataStore.observe(Restaurant).subscribe(msg => {
//     //     console.log(msg.model, msg.opType, msg.element);
//     //     fetchData();
//     //   });
//     //   return () => subscription.unsubscribe();
//     // }, [storeId]);
    
//     const showChooseOhterSeatModal = () => {
//       setchooseOtherSeatVisible(true);
      
//       // 2초 후에 모달 닫기
//       setTimeout(() => {
//         setchooseOtherSeatVisible(false);
//       }, 2000);
//     };

//     const isRealTimeEmptyTable = async(tableItem) => {
//       const realtimeTable = await API.graphql(graphqlOperation(getRestaurant, {
//         id: tableItem.id
//       }));
//       console.log(realtimeTable);
//       return realtimeTable.data.getRestaurant.available
//     }

//     const reserveTable = async() => {
//       const isEmpty = await isRealTimeEmptyTable(tableItem)
//       if (isEmpty === true){
//         //move to 결제 page
//         console.log('결제하면 됨!')
//         await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: false} }))
//         .then(result => {
//           console.log('Restaurant updated:', result.data.updateRestaurant);
//           fetchData();
//         })
//         .catch(error => {
//           console.error('Error updating restaurant:', error);
//         });

//       }
//       else {
//         //다른 좌석을 선택해주세요! 띄우기
//         showChooseOhterSeatModal();
//         fetchData();
//       }
//     }

//     const getAvailability = (target_table) => {
//       const table = restaurants.find(item => item.tableNumber === target_table);
//       return table ? table.available : null;
//     }

//     const releaseTable = async () => {
//       await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: true} }))
//         .then(result => {
//           console.log('Restaurant updated:', result.data.updateRestaurant);
//           fetchData();
//         })
//         .catch(error => {
//           console.error('Error updating restaurant:', error);
//         });
//     }

//     const prepareMoveSeat = () => {
//         setIsMoving(true)
//         setAdminModalvisible(false)
//       }
  
//       const moveSeat = async(newTableItem) => {
//         const isEmpty = await isRealTimeEmptyTable(newTableItem)
//         if (isEmpty === true){
//             //move table
//             console.log('테이블 이동!')
//             await API.graphql(graphqlOperation(updateRestaurant, { input: {id: tableItem.id, tableNumber: tableItem.tableNumber, storeId: storeId, available: false} }))
//             .then(result => {
//             console.log('Restaurant updated:', result.data.updateRestaurant);
//             fetchData();
//             })
//             .catch(error => {
//             console.error('Error updating restaurant:', error);
//             });
//             releaseTable();
//             setIsMoving(false);

//         }
//         else {
//             //다른 좌석을 선택해주세요! 띄우기
//             showChooseOhterSeatModal();
//             fetchData();
//         }
//         }
    
//     const getTables = () => {
//       return (
//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           {tables.map((tableRow, row) => (
//             <div key={row} style={{ display: 'flex', flexDirection: 'row' }}>
//               {tableRow.map((table, col) => (
//                 <div
//                   key={row * 100 + col}
//                   style={{
//                     width: '50px',
//                     height: '50px',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     margin: '5px',
//                     border: table && '1px solid gray',
//                     borderRadius: '7px',
//                     backgroundColor: table ? (getAvailability(table) ? 'white' : '#616161') : '#fff'
//                   }}
//                   onClick={() => {
//                     if (table) {
//                       if (getAvailability(table)) {
//                         if (isMoving) {moveSeat(restaurants.find(item => item.tableNumber === table))} else {setTableItem(restaurants.find(item => item.tableNumber === table)); setFillSeatModalVisible(true);}
//                       } else {
//                         if (isMoving) {} else {setTableItem(restaurants.find(item => item.tableNumber === table)); setAdminModalvisible(true);}}
                        
//                       }
//                     }
//                   }
//                 >
//                   {table ? `좌석${table}` : null}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       );
//     };

//     // if (refreshing){
//     //   return (
//     //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//     //       <Spin tip="Refreshing">
//     //         <div className="content" />
//     //       </Spin>
//     //     </div>
//     //   )
//     // }

//     return (
//     <div className="container">
//       <Navigation />
//       <div className="store-info">
//         <div className="store-cell">
//           <div className="store-description">
//             <Image style={{width: '70px', height: '70px', marginRight: '10px', borderRadius: '7px'}} src={store.image}/>
//             <div>
//               <div className="store-name">{store.name}</div>
//               <div className="store-tag">{store.tag}</div>
//               <div className="store-location">{store.location}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="table-info">
//         <div className="table-grid">
//           {getTables()}
//           {isMoving && <>
//               <Text>옮길 자리를 선택하세요</Text>
//               <Button title="자리 옮기기 취소" onPress={() => setIsMoving(false)}/>
//             </>}
//           <Button onClick={() => reserveTable()}>예약하기</Button>
//           <Button onClick={() => releaseTable()}>취소하기</Button>
//         </div>
//       </div>
//       <Modal
//         title="인원 선택"
//         open={chooseOtherSeatVisible}
//         onCancel={() => setchooseOtherSeatVisible(false)}>
//         <Text>이미 선택된 좌석입니다. 다른 좌석을 골라주세요.</Text>
//       </Modal>
//       <Modal open={adminModalvisible} onCancel={() => setAdminModalvisible(false)} title={`${tableItem.tableNumber}번 테이블`}>
//         <Button title="자리 비우기" onClick={() => releaseTable()}/>
//         <Button title="자리 옮기기" onClick={() => prepareMoveSeat()}/>
//       </Modal>
//         <Modal open={fillSeatModalVisible} onCancel={() => setFillSeatModalVisible(false)}>
//             <Text>{tableItem.tableNumer}번 테이블을 채우시겠습니까?</Text>
//             <Button title="예" onClick={() => reserveTable()}/>
//             <Button title="아니오" onClick={() => setFillSeatModalVisible(false)}/>
//         </Modal>
//     </div>
//   );
}
