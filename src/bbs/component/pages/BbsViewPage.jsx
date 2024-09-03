import { useEffect, useState } from 'react';
// import axios from "axios";
import api from '../api/axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import TextInput from '../ui/TextInput';
import CommentList from '../list/CommentList';

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
const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function BbsViewPage() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [bbs, setBbs] = useState([]);
    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]);

    // json-server
    // const getBbs = async () => {
    //     try {
    //         const response = await api.get(`http://localhost:8000/bbs/${id}`);
    //         console.log("debug >>> response, ", response.data);
    //         setBbs(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    
    // sprnig version
    const getBbs = async () => {
        try {
            const response = await api.get(`bbs/view/${id}`);
            console.log("debug >>> response, ", response.data);
            setBbs(response.data);
            console.log("debug >>> response, ", response.data.comments);
            setComments(response.data.comments);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBbs();
        // getComments();
    }, []);


    // Json-server
    // const bbsSave = async () => {
    //     const data = {
    //         id: Date.now(),
    //         comment: comment,
    //         bbs_id: id
    //     };
    //     try {
    //         if(comment !== ''){
    //             const response = await api.post('comments', data);
    //             console.log(response.data);
    //         }else{
    //             alert("댓글을 입력해 주세요!!");
    //         }
    //         setComment('');
    //     } catch (error) {
    //         console.error(error);
    //         alert("데이터 저장 중 오류가 발생했습니다.");
    //     }
    //     getComments();
    // }

    const bbsSave = async () => {
        const data = {
            comment: comment,
            bbsid: id
        };
        try {
            if(comment !== ''){
                const response = await api.post('bbs/comment/save', data);
                console.log(response.data);
                if(response.status == 204){
                    setComment('');
                    getComments();
                }else{
                    alert("오류발생!!");
                }
            }else{
                alert("댓글을 입력해 주세요!!");
            }
        } catch (error) {
            console.error(error);
            alert("데이터 저장 중 오류가 발생했습니다.");
        }
        
    }

    const getComments = async () => {
        try {
            // const response = await api.get(`comments?bbs_id=${id}`);
            const response = await api.get(`bbs/view/getComment/${id}`);
            console.log("debug >>> commets/get response data, ", response.data);
            setComments(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const commentHandler = async (e) => {
        setComment(e.target.value);
    }

    // const deleteData = async (id) => {
        
    //     try {
    //         const response = await api.delete(`comments/${id}`); // 삭제할 데이터의 URL
    //         console.log('삭제 성공:', response.data);
    //     } catch (error) {
    //         console.error('삭제 오류:', error);
    //     }
    //     getComments();
    // };

    const deleteData = async (bbsid) => {
        
        try {
            const response = await api.delete(`bbs/comment/delete/${bbsid}`); // 삭제할 데이터의 URL
            console.log('삭제 성공:', response.data);
        } catch (error) {
            console.error('삭제 오류:', error);
        }
        getComments();
    };

    // json-server
    // const deleteBbs = async (bbsId) => {
    //     try {
    //         const response = await api.delete(`bbs/${bbsId}`);
    //         console.log('삭제 성공:', response.data);
    //         navigate('/');
    //     } catch (error) {
    //         console.error('삭제 오류:', error);
    //     }
    // }

    const deleteBbs = async (bbsid) => {
        console.log("debug >>> remove btn click : "+comments.length);
        try {
            if(comments.length > 0){
                alert("타임라인이 남아있어 게시글 삭제가 안됩니다.");
            }else{
                const response = await api.delete(`bbs/delete/${bbsid}`);
                console.log('삭제 성공:', response.data);
                navigate('/');
            }
        } catch (error) {
            console.error('삭제 오류:', error);
        }
    }

    const moveWritePage = () => {
        // navigate(`/bbs-fixe/${bbs.id}`);
        navigate('/bbs-fixe', {state :{id:id}});
    }
    

    return (
        <Wrapper>
            <Container>
                <div align='right'>
                    <Button
                        title='뒤로가기'
                        onClick={() => {
                            navigate('/');
                        }}
                    ></Button></div><br />
                <PostContainer>
                        <TitleText>{bbs.title}</TitleText>
                    
                    <ContentText>{bbs.content}</ContentText>
                </PostContainer><br />
                <div align='right'>
                        <Button 
                            title='수정하기'
                            onClick={moveWritePage}
                            />&nbsp;
                        <Button 
                            title='삭제하기'
                            onClick={() => deleteBbs(bbs.id)}/>
                </div>
                <CommentLabel>타임라인</CommentLabel>

                <CommentList comments={comments} 
                    onClick={deleteData}/>
                

                <br/>
                <TextInput
                    height='20'
                    value={comment}
                    onChange={commentHandler}
                ></TextInput>
                <div align='right'>
                    <Button
                        title='등록'
                        onClick={bbsSave}></Button>
                </div>
            </Container>
        </Wrapper>
    );

}

export default BbsViewPage;