import React from 'react';
import '../styles/global.scss'
import {AppProps} from "next/app";
import {Provider} from "react-redux";
import {store} from "../store/store";

type PageProps = AppProps

const MyApp: React.FC<PageProps> = ({Component, pageProps}) => {
    return (
        <Provider store={store}>
            <Component {...pageProps}/>
        </Provider>

    );
};

export default MyApp;