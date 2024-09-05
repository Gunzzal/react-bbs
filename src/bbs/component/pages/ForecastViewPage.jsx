import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import api from '../api/axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
    background-color:white;
`;
const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;
const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

function ForecastViewPage(props){
    
    

    // const location = useLocation();
    // const { baseTime, baseDate, beachNum } = location.state || {};
    // const { data } = props;

    // const navigate = useNavigate();

    // const getForecast = async () => {
        
    //     const params = {
    //         base_time: baseTime,
    //         base_date: baseDate,
    //         beach_num: beachNum
    //     };
    //     try {
            
    //         const response = await api.get('/api/forecast', { params });
    //         console.log(response);
    //         setForecastInfo([...response.data]);
    //         console.log(forecastInfo);
    //         if(response.data.length > 0){
    //             if(response.status == 200){
    //                 // alert("데이터를 불러왔습니다.");
    //                 // navigate('/forecast-view');
    //             }else{
    //                 alert("데이터를 불러오지 못했습니다.");
    //             }
    //         }else{
    //             alert("데이터를 불러오지 못했습니다.");
    //             navigate('/forecast-write');
    //         }
            
    //     } catch (error) {
    //         console.error(error);
    //         alert("데이터를 불러오지 못했습니다.");
    //     }
    // }

    // useEffect(() => {
    //     getForecast();
    // }, []);

    return(
        <Wrapper>
            
            <Container>
                {/* <div align='right'>
                    <Button
                        title='뒤로가기'
                        onClick={() => {
                            navigate('/forecast-write');
                        }}
                    ></Button></div><br /> */}
                <div >
                <PostContainer>
                   
                         
                        { 
                        
                        props.data.map((info, index) => {
                            return(
                                <ContentText key={index}>{info.categoryName} : {info.fcstValue}</ContentText>
                            )
                        })
                    }


                </PostContainer><br />
                </div>
            </Container>
          
        </Wrapper>
    );
}

export default ForecastViewPage;