import React, { useEffect, useState } from 'react';
import { Typography, Button, InputNumber, Input, Radio, Space } from 'antd';

const { Title, Text } = Typography;

export default function Pay(effect, deps) {
    const [payment, setPayment] = useState(1);

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
            buyer_name: '홍길동',
            buyer_tel: '01012345678',
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
            <Radio.Group onChange={onChangeRadio} value={payment}>
                <Space direction="vertical" align='start'>
                <Radio value={1}>신용카드</Radio>
                <Radio value={2}>카카오페이</Radio>
                <Radio value={3}>네이버페이</Radio>
                </Space>
            </Radio.Group>

            <div style={{ position: 'fixed', bottom: 0, width: '100%'}}>
                <Button type="primary" onClick={onClickPayment}>결제하기</Button>
            </div>
        </div>
    );
};