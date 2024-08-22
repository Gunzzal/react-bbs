import styled from "styled-components";
import Button from "../ui/Button";
import axios from 'axios';

const Wrapper = styled.div`
    width: calc(100% - 32px);
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    :hover {
        background: lightgrey;
    }
`;
const ContentText = styled.p`
    font-size: 16px;
    white-space: pre-wrap;
`;


function CommentItem(props) {

    // const deleteComment = async(id) => {
    //     try {
    //         const response = await axios.delete(`http://localhost:8000/comments/${id}`); // 삭제할 데이터의 URL
    //         console.log('삭제 성공:', response.data);
    //     } catch (error) {
    //         console.error('삭제 오류:', error);
    //     }
    // };

    return(
        <Wrapper>
            <ContentText>{props.comment.comment}</ContentText>
            <div style={{marginLeft: 'auto'}}>
                <Button 
                    title='delete'
                    onClick={() => props.onClick(props.comment.id)}></Button>
            </div>
        </Wrapper>
    )
}

export default CommentItem;