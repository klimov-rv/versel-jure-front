import React from 'react';
import {NextPage} from "next";
import Header from "../components/header/Header";
import LeftMenu from "../components/leftmenu/LeftMenu";
import '../styles/global.scss'
import '../styles/cards.scss'
import MainContent from "../components/mainPageContent/MainContent";
import Footer from "../components/footer/Footer";
import VideoWidget from '../components/videoWidget/VideoWidget';
const Index: NextPage = () => {
    return (
        <div>
            <Header/>
            <div className="layout">
                <div className="container">
                    <div className="layout__wrap layout__wrap--padding">
                        <div className="layout__left">
                            <LeftMenu/>
                            <Footer/>
                        </div>
                        <div className="layout__main">
                            <div className="layout__main-wrapper">
                                <div className="layout__center">
                                   <MainContent/>
                                </div>
                                <div className="layout__right">
                                    <VideoWidget />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;