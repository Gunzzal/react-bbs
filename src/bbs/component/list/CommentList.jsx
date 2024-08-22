import styled from "styled-components";
import CommentItem from "./CommentItem";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    & > * {
        :not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;

function CommentList(props) {
    const { comments } = props;



    return (
        <Wrapper>
            { comments.length == 0 ?
                null :
                comments.map((comment) => {
                    return (
                        <CommentItem key={comment.id} comment={comment} onClick={props.onClick}></CommentItem>

                    )

                })
            }

        </Wrapper>
    )
}

export default CommentList;