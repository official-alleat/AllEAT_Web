import React, { useEffect, useState } from 'react';
import { Typography, Button, InputNumber, Input, Radio, Space } from 'antd';
import Navigation from './Navigation';
import './Pay.css';

const { Title, Text } = Typography;

export default function Pay(effect, deps) {
    const [payment, setPayment] = useState(1);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

    const checkPhoneNumber = (value) => {
        // '-' 입력 시
        var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        // 숫자만 입력시
        var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
        // 형식에 맞는 경우 true 리턴
        return regExp.test(value) || regExp2.test(value);
    };
    
    const handleNameChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue);
        setIsNameValid(inputValue !== '');
    };

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;
        setPhoneNumber(inputValue);
        setIsPhoneNumberValid(checkPhoneNumber(inputValue));
    };

    const onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        setPayment(e.target.value);
    };

    useEffect(() => {
        const jquery = document.createElement('script');
        jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
        const iamport = document.createElement('script');
        iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const onClickPayment = () => {
        if (name === '' || !isPhoneNumberValid) {
            return;
        }

        const { IMP } = window;
        IMP.init('imp55141717');

        const data = {
            pg: 'kakaopay', // kakaopay html5_inicis
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: '결제 테스트 올잇',
            amount: '1000',
            custom_data: {
                name: '부가정보',
                desc: '우동 셋 라면 둘',
            },
            buyer_name: name,
            buyer_tel: phoneNumber,
            buyer_email: '14279625@gmail.com',
            buyer_addr: '구천면로 000-00',
            buyer_postalcode: '01234',
        };

        IMP.request_pay(data, callback);
    };

    const callback = response => {
        const { success, error_msg, imp_uid, merchant_uid, pay_method, paid_amount, status } = response;

        if (success) {
            alert('결제 성공');
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    };

    return (
        <div className='container' style={{flex: 1}}>
            <Navigation />

            <div className="customer-info">
                <div className='customer'>
                    <div className='info-cell'>
                        <Text className='customer-title'>이름</Text>
                        <Input
                            placeholder="(필수)이름"
                            value={name}
                            onChange={handleNameChange}
                            style={{ marginBottom: '10px' }}
                            className={!isNameValid ? 'invalid-input' : ''}
                        />
                        {!isNameValid && <p className="error-message">이름을 입력해주세요.</p>}
                    </div>
                    <div className='info-cell'>
                        <Text className='customer-title'>휴대전화번호</Text>
                        <Input
                            placeholder="(필수)휴대전화번호 예)01099990000"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            style={{ marginBottom: '10px' }}
                            className={!isPhoneNumberValid ? 'invalid-input' : ''}
                        />
                        {!isPhoneNumberValid && <p className="error-message">휴대전화번호를 입력해주세요.</p>}
                    </div>
                </div>
            </div>
            <div>
                <Text> 계좌번호 010-9999-9999</Text>
                <Text> 송금 확인 후 예약 확정 문자 전송됩니다.</Text>
            </div>
            {/* <Radio.Group onChange={onChangeRadio} value={payment}>
                <Space direction="vertical" align='start'>
                <Radio value={1}>신용카드</Radio>
                <Radio value={2}>카카오페이</Radio>
                <Radio value={3}>네이버페이</Radio>
                </Space>
            </Radio.Group> */}
            <div className="footer">
                <div style={{ margin: 5 }}>
                    <Button type="primary" size='large' onClick={onClickPayment}>결제하기</Button>
                </div>
            </div>
        </div>
    );
};