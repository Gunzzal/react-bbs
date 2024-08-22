import styled from "styled-components";
import BbsItem from "./BbsItem";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

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


function BbsList(props) {
    // const navigate = useNavigate();
    // const [bbses, setBbses] = useState([]);

    // const getBbses = async() => {
    //    try {
    //         const response = await axios.get('http://localhost:8000/bbs');
    //         console.log("debug >>> response, ", response.data);
    //         setBbses(response.data);
    //     } catch( err ) {
    //         console.log( err );
    //     }
    // };

    // useEffect(() => {
    //     getBbses();
    // },[] );


    return(
        <Wrapper>
            {
                props.bbses.map((bbs) => {
                    return(
                        <BbsItem bbs={bbs} key={bbs.id} btnvisible={props.btnvisible}/>

                    )
                })
            }
        </Wrapper>
    );
}

export default BbsList;