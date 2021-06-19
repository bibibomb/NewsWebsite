import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import {usePromiseTracker} from "react-promise-tracker";
require('../stylesheets/App.css')


function LoadingIndicator() {
   
    let width = window.innerWidth
    let display = (width < 414)? "none":"flex"
    let loadingStyle = {
        width: "100%",
        height: "100",
        display: display,
        justifyContent: "center",
        alignItems: "center"
    }
        
    const override = css`
      margin:auto;
      border-color: #3688D7;
      position: absolute;
      top: 50%;
    `;
    const {promiseInProgress} = usePromiseTracker()
    
    return (
        promiseInProgress &&
        <div id="loadingIndicator" style={loadingStyle}>
            <BounceLoader
                css={override}
                size={60}
                color={"#3688D7"}
            />
            <p style={{margin:"60px auto",
                position: "absolute",
                top: "50%"}}><b>Loading</b></p>
        </div>
    );
    
}

export default LoadingIndicator