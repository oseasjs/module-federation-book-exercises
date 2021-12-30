import React from "react";
import { connect } from "react-redux";

const Header = ({headerType = 0, count, onClear, dispatch}) => {

    const defaultHeader = (
        <header style={{fontSize: "xx-large" }}> 
            <span>Header Type: Default</span>
        </header>
    )

    const sharedStateHeader = (
        <header style={{fontSize: "xx-large" }}> 
            <span>Header Ty[e]: Shared State</span>
            <br/>
            <span>Cart count on HEADER is {count}</span> 
            <button onClick={onClear}>Clear</button>
        </header>
    )

    const reduxHeader = (
        <header style={{fontSize: "xx-large" }}> 
            <span>Header Type: Redux</span>
            <br/>
            <span>Cart count on HEADER is {count}</span> 
            <button onClick={() => dispatch({type: "RESET"})}>Clear</button>
        </header>
    );

    switch (headerType) {
        case 1: 
            return sharedStateHeader
        case 2: 
            return reduxHeader
        default: 
            return defaultHeader
    }

}

export default connect((state) => state) (Header);
