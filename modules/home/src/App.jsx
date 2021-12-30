import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import { Provider, connect } from "react-redux"

const Header = React.lazy(() => import("my-nav/Header"))

const wrapComponent = (Component) => ({error, delayed, ...props}) => (
    <FederatedWrapper error={error} delayed={delayed}>
        <Component {...props} />
    </FederatedWrapper>
)

const HeaderWrapComponent = wrapComponent(React.lazy(() => import("my-nav/Header")));

import "./index.css";

const App = connect((state) => state) (({count, reduxCount, dispatch}) => {

    // return simpleRectSuspense()
    return simpleRectSuspenseForCart()
    // return errorBoundary()
    // return headerFederatedWrap()
    // return headerWrapComponent()
    // return headerRedux(reduxCount, dispatch)

});

const simpleRectSuspense = () => (
    <div>
        <React.Suspense fallback={<div />}>
            <Header />
        </React.Suspense>
        <div>Header using React.Suspense</div>
    </div>
);

const simpleRectSuspenseForCart = () => {

    const [itemCount, itemCountSet] = React.useState(0)
    const onAddToCart =() => {
        itemCountSet(itemCount +1);
    }

    return (
        <div>
            <React.Suspense fallback={<div />}>
                <Header headerType={1} count={itemCount} onClear={() => itemCountSet(0)} />
            </React.Suspense>
            <div>Header using React.Suspense for Cart</div>
            <button onClick={onAddToCart}>Buy me!</button>
            <div>Cart count on HOME is {itemCount}</div>
        </div>
    )
}

const errorBoundary = () => (
    <div>
        <ErrorBoundary>
            <React.Suspense fallback={<div />}>
                <Header />
            </React.Suspense>
        </ErrorBoundary> 
        <div>Header using ErrorBoundary</div>
    </div>
);

const headerFederatedWrap = () => (
    <div>
        <FederatedWrapper 
            error={<div>Temporary Header</div>}
            delayed={<div>Loading header...</div>}>
            <Header />
        </FederatedWrapper>
        <div>Header using FederatedWrapper</div>
    </div>
);

const headerWrapComponent = () => (
    <div>
        <HeaderWrapComponent />
        <div>Header using HeaderWrapComponent</div>
    </div>
);

const headerRedux = (reduxCount, dispatch) => {
    const onAddToCart = () => {
        dispatch({
            type: "INCREMENT"
        });
    };
    return (
        <div>
            <React.Suspense fallback={<div />}>
                <Header headerType={2} count={reduxCount}/>
            </React.Suspense>
            <div>Header using Redux</div>
            <button onClick={onAddToCart}>Buy me!</button> 
            <div>Cart count on HOME is {reduxCount}</div>
        </div>
    )
}

class FederatedWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {

    }

    render() {
        if (this.state.hasError) {
            return this.props.error || <h1>Something went wrong.</h1>
        }
        return (
            <React.Suspense fallback={this.props.delayed || <div />}>
                {this.props.children}
            </React.Suspense>
        );
    }

}

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {

    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }
        return this.props.children;
    }

}

function cartReducer(state = { reduxCount: 0}, action) {

    switch (action.type) {
        case "INCREMENT": 
            return {...state, reduxCount: state.reduxCount +1};
        case "RESET": 
            return {...state, reduxCount: 0}
        default: 
            return state;
    }
}

const store = createStore(cartReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)

// ReactDOM.render(<App />, document.getElementById("app"));
