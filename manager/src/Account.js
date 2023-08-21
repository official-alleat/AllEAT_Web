import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Image, Button } from "antd";
import stores from './stores.js';
import Navigation from './Navigation';
import './Store.css';

export default function Account() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({name: '', password: ''});
    const [error, setError] = useState('');

    const onChangeText = (prop) => (value) => {
        setAccount({
          ...account,
          [prop]: value,
        });
        setError('')
    };

    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        setAccount({
            ...account,
            name: inputValue,
          });
          setError('')
    };
    const handlePassWordChange = (e) => {
        const inputValue = e.target.value;
        setAccount({
            ...account,
            password: inputValue,
          });
          setError('')
    };

    const login = (account) => {
        for (const id in stores){
            const store = stores[id]
            if (store.name === account.name) {
                if (store.password === account.password) {
                    return id
                }
                else {
                    setError('비밀번호가 일치하지 않습니다')
                    return undefined
                }
            }
        }
        setError('가게가 존재하지 않습니다')
        return undefined
    }
    

    const handleSubmit = () => {
        if (! account.name) {
            return setError('가게 이름을 입력하세요')
        }
        if (!account.password){
            return setError('비밀번호를 입력하세요')
        }

        const storeId = login(account)
        if (storeId) {
            return navigate('/seat', {state: { storeId: storeId }})
        }
    }

  return (
    <div className="container">
      <Navigation />
      <div>가게 이름</div>
      <Input label="가게이름" onChange={handleNameChange}/>
      <div>비밀번호</div>
      <Input label="비밀번호" onChange={handlePassWordChange}/>
      <div style={{color: 'red'}}>{error}</div>
      <Button onClick={handleSubmit} style={{borderRadius: 5}}>로그인</Button>
    </div>
  );
}