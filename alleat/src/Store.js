import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Image } from "antd";
import { API, graphqlOperation } from 'aws-amplify';
import { listRestaurants } from "./graphql/queries";
import stores from './stores.js';
import Navigation from './Navigation';
import './Store.css';

export default function StoreList() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [storeAvailableTableCounts, setStoreAvailableTableCounts] = useState({});

  const fetchAvailabilityData = async () => {
    try {
      const response = await API.graphql(graphqlOperation(listRestaurants));
      const restaurants = response.data.listRestaurants.items;
      const newStoreAvailableTableCounts = {};

      restaurants.forEach(restaurant => {
        const storeId = restaurant.storeId;
        if (restaurant.available) {
          if (!newStoreAvailableTableCounts[storeId]) {
            newStoreAvailableTableCounts[storeId] = 0;
          }
          newStoreAvailableTableCounts[storeId]++;
        }
      });

      setStoreAvailableTableCounts(newStoreAvailableTableCounts);

      console.log('restaurants', restaurants);
    } catch (error) {
      console.error('Error fetching availability data:', error);
    }

    console.log('counts', storeAvailableTableCounts[1]);
  };

  useEffect(() => {
    localStorage.removeItem('menuData');
    localStorage.removeItem('storeId');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('menuCountData');
  }, [])

  useEffect(() => {
    fetchAvailabilityData();

    const interval = setInterval(() => {
      fetchAvailabilityData();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredStores = Object.values(stores).filter((store) =>
    store.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <Navigation />
      <div className="banner">
        <img
          src={require('./assets/올잇배너.png')}
          alt="올잇 배너"
          className="web-banner"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        <div className="banner-text">
          <p className="banner-line1">웨이팅 없는 여의도 점심 식사!</p>
          <p></p>
          <p className="banner-line2">직장인분들의 소중한 점심시간, 올잇이 지켜줄게요.</p>
        </div>
      </div>

      <div className="search-box">
        <Input 
          placeholder="가게 이름 검색" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ margin: '10px'}}
          size="large"
        />
      </div>
      <div className="store-list">
        {filteredStores.map((store) => (
          <div 
            key={store.id}
            className="store-cell"
            onClick={() => navigate('menu', { state: { storeId: store.id } })}
          >
            <div className="store-description">
              <Image style={{width: '70px', height: '70px', marginRight: '10px', borderRadius: '7px'}} src={store.image}/>
              <div>
                <div className="store-name">{store.name}</div>
                <div className="store-tag">{store.tag}</div>
                <div className="store-location">{store.location}</div>
              </div>
            </div>
            <div className='available-seats'>
              {storeAvailableTableCounts[store.id] ? storeAvailableTableCounts[store.id] : 0} 석
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}