import React from 'react';
import Header from "../../components/header/Header";
import '../../styles/global.scss'
import {useGetValue} from "../../hooks/useGetValue";
import {server, serverUrl} from "../../utils/serverUrl";
import {useGetUser} from "../../hooks/useGetUser";
import consultation from '../../app/assets/img/widget-consultation-01.jpg'
import LeftMenu from "../../components/leftmenu/LeftMenu";
import {useRouter} from "next/router";
import {GetServerSidePropsContext, NextPage} from "next";
import Image from "next/image";
import Footer from "../../components/footer/Footer";
import axios from "axios";


interface News {
    DETAIL_PICTURE: {
        ORIGINAL: string;
        RESIZE: string;
    };
    ID: string;
    NAME: string;
    PREVIEW_PICTURE: {
        ORIGINAL: string;
        RESIZE: string;
    };
    USER_NAME: string;
    DETAIL_TEXT: string
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
    const { category, category_id } = context.query;

    try {
        const response = await axios.get(`${serverUrl}/${category}/${category_id}`);
        const news = Object.values(response.data.message.data)[0];
        console.log(news, "news")
        return {
            props: {
                news,
            },
        };
    } catch (e) {
        console.log(e)
    }
}

const NewsCards: NextPage<{news: News}> = ({news}) => {
    // const router = useRouter()
    // const {name, id} = router.query
    // const news = useGetValue(name, id);
    const user = useGetUser()
    // console.log(user)
    if (!news) {
        // If 'news' is undefined, you can display a loading state or handle the absence of data
        return <div>Loading...</div>;
    }

    const detailPicture = news.DETAIL_PICTURE;
    const originalImage = detailPicture && detailPicture.ORIGINAL;

    return (
        <div>
            <Header/>
            <div className="layout layout--sticky-bottom">
                {news && <div className="container">
                    <div className="layout__wrap layout__wrap--padding">
                        <div className="layout__left">
                            <LeftMenu/>
                            <Footer/>
                        </div>
                        <div className="layout__main">
                            <div className="layout__main-wrapper">
                                <div className="layout__center">
                                    <div className="big-news mobile-wide">
                                        <div className="big-news__wrap">
                                            <div className="big-news__content content">
                                                <h1>{news.NAME}</h1>
                                                <div className="description-block">
                                                    <div className="description-block__inner">
                                                        <span>Спорт</span>
                                                        <span>30 минут назад</span>
                                                    </div>
                                                </div>
                                                <div className="media-block">
                                                    <picture className="media-block__photo">
                                                        {originalImage && <img src={`${server}/${news.DETAIL_PICTURE.ORIGINAL}`}
                                                              alt="Image"/>}
                                                        <a href="#" className="media-block__comments">
                                                            {/*<svg>*/}
                                                            {/*    <use xlink:href="img/sprite.svg#icon-comment"></use>*/}
                                                            {/*</svg>*/}
                                                            <span>5 комментариев</span>
                                                        </a>
                                                    </picture>
                                                    <div className="media-controls media-block__controls">
                                                        <div className="media-controls__wrapper">
                                                            <div className="media-controls__group">
                                                            <span
                                                                className="media-controls__viewed">4 565 просмотров</span>
                                                            </div>
                                                            <div className="media-controls__group">
                                                                <div className="media-controls__btns">
                                                                    <button
                                                                        className="btn-control btn-control--blue media-controls__btn">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M5 9V21H1V9H5ZM9 21C8.46957 21 7.96086 20.7893 7.58579 20.4142C7.21071 20.0391 7 19.5304 7 19V9C7 8.45 7.22 7.95 7.59 7.59L14.17 1L15.23 2.06C15.5 2.33 15.67 2.7 15.67 3.11L15.64 3.43L14.69 8H21C22.11 8 23 8.9 23 10V12C23 12.26 22.95 12.5 22.86 12.73L19.84 19.78C19.54 20.5 18.83 21 18 21H9ZM9 19H18.03L21 12V10H12.21L13.34 4.68L9 9.03V19Z" fill="currentColor"/>
                                                                        </svg>
                                                                        <span>44</span>
                                                                    </button>
                                                                    <button className="btn-control media-controls__btn">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M13.8889 9.2V6L20.5 11.6L13.8889 17.2V13.92C9.16667 13.92 3.5 18 3.5 18C4.44444 14 7.27778 10 13.8889 9.2Z" stroke="currentColor" strokeWidth="2"/>
                                                                        </svg>
                                                                        <span>Поделиться</span>
                                                                    </button>
                                                                    <button className="btn-control media-controls__btn">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z" fill="currentColor"/>
                                                                        </svg>
                                                                        <span>В закладки</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h5>{news.NAME}</h5>
                                                <div dangerouslySetInnerHTML={{ __html: news.DETAIL_TEXT }} />
                                                <div className="description-tags">
                                                    <div className="description-tags__inner">
                                                        <span>Пособия</span>
                                                        <span>Помощь</span>
                                                        <span>Полезное</span>
                                                        <span>Семья</span>
                                                        <span>Мать и ребенок</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="layout__right">
                                    <div className="layout__sticky-block">
                                        <div className="c-author layout__sticky">
                                            <article className="c-author__wrapper">
                                                <picture className="c-author__img">
                                                    <img src={`${server}${user?.PERSONAL_PHOTO.VALUE}`} alt="Image"/>
                                                </picture>
                                                <div className="c-author__body">
                                                    <h3 className="c-author__name">{user?.NAME.VALUE} {user?.LAST_NAME.VALUE}</h3>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                    <div className="layout__sticky-block">
                                        <div className="content-widget layout__sticky">
                                            <div className="content-widget__wrapper">
                                                <div className="content-widget__body">
                                                    <span className="content-widget__help">Консультация юриста</span>
                                                    <h3 className="content-widget__title">Как получить материнский
                                                        капитал</h3>
                                                    <picture className="content-widget__img">
                                                        <Image src={consultation} alt="Image"/>
                                                    </picture>
                                                    <a href="#" className="content-widget__circle-btn">Записаться</a>
                                                </div>
                                                <a href="#" style={{padding: 0}} className="content-widget__btn btn">Записаться</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>

    );
};

export default NewsCards;