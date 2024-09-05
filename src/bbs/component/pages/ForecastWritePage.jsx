import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import api from '../api/axios';
import Button from "../ui/Button";
import TextInput from "../ui/TextInput";
import ForecastViewPage from "./ForecastViewPage";

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Container = styled.div`
    width: 100%;
    max-width: 720px;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function ForecastWritePage(props) {
    const navigate = useNavigate();

    const [baseTime, setBaseTime] = useState('');
    const [baseDate, setBaseDate] = useState('');
    const [beachNum, setBeachNum] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const [forecasts, setForecasts] = useState([]);
    const [text, setText] = useState('');



    const baseTimeHandler = (e) => {
        setBaseTime(e.target.value);
    }

    const baseDateHandler = (e) => {
        setBaseDate(e.target.value);
    }

    const beachNumHandler = (e) => {
        setBeachNum(e.target.value);
    }

    const cancelHandler = () => {
        alert("입력을 취소하고 홈으로 이동합니다.");
        navigate('/');
    }

    // const inputForecast = async () => {
    //     navigate('/forecast-view',{state: { baseTime, baseDate, beachNum }});

    // }
    const inputForecast = async (baseTime, baseDate, beachNum) => {
        setText("불러올 수 있는 데이터가 없습니다!");
        const data = {
            base_time: baseTime,
            base_date: baseDate,
            beach_num: beachNum
        }
        console.log(data);
        try {
            const response = await api.post('api/validate/forecast', data );
            console.log("debug >>> post response data :"+response.data);
            console.log("debug >>> post response status :"+response.status);
            if(response.status==400){
                setBaseTime(response.data.base_time);
                setBaseDate(response.data.base_date);
                setBeachNum(response.data.beach_num);
            }
            // console.log("debug >>> axiois post response data, ", response);
            setForecasts([...response.data]);
        } catch (err) {
            console.log("debug >>> post response data :"+err.response.data);
            console.log("debug >>> post response status :"+err.response.status);
            setBaseDate(err.response.data.base_date);
            setBaseTime(err.response.data.base_time);
            setBeachNum(err.response.data.beach_num);

            console.log(err);
        }
        
    }

    useEffect (() => {
        if(forecasts.length > 0){
            setIsVisible(true);
        }else{
            setIsVisible(false);
        }
    },[forecasts])

    return (
        <Wrapper>
            <h2>해수욕장 날씨 조회 서비스</h2><br /><br />
            <Container>
                <label>
                    발표시각
                    <TextInput
                        height={20}
                        value={baseTime}
                        onChange={baseTimeHandler} />
                </label>
                <br /><br />
                <label>
                    발표일자
                    <TextInput
                        height={20}
                        value={baseDate}
                        onChange={baseDateHandler} />
                </label><br /><br />
                <label>
                    해변코드 번호
                    <TextInput
                        height={20}
                        value={beachNum}
                        onChange={beachNumHandler} />
                </label><br /><br />

                <div align="right">
                    <Button title='입력완료' onClick={(e) => inputForecast(baseTime, baseDate, beachNum)} />
                    &nbsp;&nbsp;&nbsp;
                    <Button title='입력취소' onClick={cancelHandler} />
                </div>
            </Container>
         

            {isVisible ? (
                <ForecastViewPage data={forecasts} />
            ) :
                <p>{text}</p>}
        </Wrapper>

    );
}

export default ForecastWritePage;