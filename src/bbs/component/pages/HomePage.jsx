import styled from 'styled-components';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import BbsList from '../list/BbsList';
import { useEffect, useState } from 'react';
// import axios from "axios";
import api from '../api/axios';

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



function HomePage() {

    const navigate = useNavigate();
    const [bbses, setBbses] = useState([]);

    // const getBbses = async () => {
    //     try {
    //         const response = await api.get('bbs');
    //         console.log("debug >>> response, ", response.data);
    //         setBbses(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const getBbses = async () => {
        try {
            const response = await api.get('bbs/index');
            setBbses(response.data);
            console.log("debug >>> response, ", response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBbses();
    }, []);


   

    return (
        <Wrapper>
            <Container>
                <div align='right'>
                    <Button
                        title='글 작성하기'
                        onClick={() => {
                            navigate('bbs-write');
                        }}
                    ></Button>
                    
                </div>
                <br />

                <BbsList bbses={bbses}/>
                
            </Container>
        </Wrapper>
    );
}

export default HomePage;