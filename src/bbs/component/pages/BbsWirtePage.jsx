import { useState, useEffect } from "react";
import TextInput from "../ui/TextInput";
import styled from "styled-components";
import Button from "../ui/Button";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import _ from 'lodash';
// import { useParams } from 'react-router-dom';

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


function BbsWritePage(props) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bbs, setBbs] = useState([]);
    const [isFlag,setIsFlag] =useState(true);
    const [saveData, setSaveData] = useState([]);

    const titleHandler = (e) => {
        setTitle(e.target.value);
    }
    const contentHandler = (e) => {
        setContent(e.target.value);
    }

    const cancelHandler = () => {
        alert("글 작성을 취소하고 홈으로 이동합니다.");
        navigate('/');
    }

    const bbsSave = async () => {
    
        const data = {
            id: Date.now(),
            title: title,
            content: content,
        };
        try {
            if(content==='' || title===''){
                alert("제목과 내용 모두 입력해 주세요!");
                
            }else{
                const response = await axios.post('http://localhost:8000/bbs', data);
                console.log(response.data);
                alert("글 작성을 완료했습니다.");
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            alert("데이터 저장 중 오류가 발생했습니다.");
        }
    }

    // const { id } = useParams();
    const location = useLocation();
    const id = location.state?.id;

    const bbsFiexed = async (id) => {
        const data = {
            title: title,
            content: content,
        };

        try {
            if(content==='' || title===''){
                alert("제목 또는 내용을 공백으로 둘 수 없습니다!");    
            }else{
                const response = await axios.patch(`http://localhost:8000/bbs/${id}`, data);
                console.log(response.data);
                alert("글 수정을 완료했습니다.");
                navigate(`/bbs-view/${id}`);
            }
        } catch (error) {
            console.error(error);
            alert("데이터 수정 중 오류가 발생했습니다.");
        }
    }

    const fieedCancelHandler = () => {
        alert("글 수정을 취소하고 홈으로 이동합니다.");
        navigate(`/bbs-view/${id}`);
    }

    const getBbs = async () => {
        try {
            if (id != null) {
                const response = await axios.get(`http://localhost:8000/bbs/${id}`);
                // console.log("debug >>> response, ", response.data);
                setBbs({...response.data});
                setSaveData({...response.data}); 

                setTitle(response.data.title);
                setContent(response.data.content);
            }
        } catch (err) {
            console.log(err);
        }
    };

    

    useEffect(() => {
        if (id != null) {
            getBbs();
        }
    }, [id]);

    useEffect(() => {
        setBbs({
            id:parseInt(id),
            title:title,
            content:content
        });
        console.log(isFlag);
        console.log(saveData);
        console.log(bbs);
    },[title,content]);
    
    useEffect(() => {
        // if((title !== bbs.title) || (content !== bbs.content)){
        //     setIsFlag(false);
        // }else{
        //     setIsFlag(true);
        // }
        setIsFlag(_.isEqual(saveData, bbs));
    },);


    return (
        <Wrapper>
            <Container>
                <label>
                    제목
                    <TextInput
                        height={20}
                        value={title}
                        onChange={titleHandler}
                    />
                </label>
                <br /><br />
                <label>
                    내용
                    <TextInput
                        height={480}
                        value={content}
                        onChange={contentHandler} />
                </label>
                <br /><br />
                {
                    (id!=null) ? <div align="right">
                        
                        <Button title='글 수정하기' onClick={() => bbsFiexed(id)} disabled={isFlag}/>
                      
                        &nbsp;&nbsp;&nbsp;
                        <Button title='수정 취소' onClick={fieedCancelHandler} />
                    </div>

                        :

                        <div align="right">
                            <Button title='글 작성하기' onClick={bbsSave} />
                            &nbsp;&nbsp;&nbsp;
                            <Button title='글 작성취소' onClick={cancelHandler} />
                        </div>

                }

            </Container>
        </Wrapper>

    );
}

export default BbsWritePage;