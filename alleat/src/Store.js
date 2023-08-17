import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Image, Button } from "antd";
import stores from './stores.js';
import './Store.css';
import './bootstrap.css';

export default function StoreList() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const filteredStores = Object.values(stores).filter((store) =>
      store.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
      <div className="Container">
        <div className="TitleContainer">
          <div className="TitleName">올잇.</div>
        </div>
        <Input 
          placeholder="가게 이름 검색" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '80%', margin: '10px'}}
          size="large"
        />
        <div className="StoreList">
          {filteredStores.map((store) => (
            <div className="StoreCell">
              <div className="StoreDescription">
                <Image style={{width: '70px', height: '70px', marginRight: '5px', borderRadius: '7px'}} src={store.image}/>
                <div>
                  <div className="StoreName">{store.name}</div>
                  <div className="StoreTag">{store.tag}</div>
                  <div className="StoreLocation">{store.location}</div>
                </div>
              </div>
              <Button onClick={() => navigate('seat', { state: { storeId: store.id } })} type="primary"
              className="Button">잔여좌석 확인</Button>
            </div>
          ))}
        </div>
      </div>
    );
}