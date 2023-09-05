import React, {useEffect, useState} from 'react';
import '../../../styles/global.scss'
import LeftMenu from "../../../components/leftmenu/LeftMenu";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import '../../../styles/cards.scss'
import {useRouter} from "next/router";
import {server, serverUrl} from "../../../utils/serverUrl";
import {GetServerSidePropsContext, NextPage} from "next";
import axios from "axios";

interface IValue {
    ID: string,
    NAME: string,
    PICTURE: {
        ORIGINAL: string,
        RESIZE: string
    }
    TYPE: string,
    USER_NAME: string,
    USER_PHOTO: string,
    CREATED_DATE: string
}

interface IInfo {
    "count_all": number,
    "count_select": number,
    "rubric_name": string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {rubric_code, rubric_id} = context.query;
    try {
        const response = await axios.get(`${serverUrl}/rubric/${rubric_id}?limit=10&page=1`)
        const rubrics = Object.values(response.data.message[rubric_code]);
        const info = response.data.message.info;
        return {
            props: {
                rubrics,
                info
            },
        };
    } catch (e) {
        console.log(e)
    }

}

const Rubrics: NextPage<{ rubrics: IValue[] , info: IInfo}> = ({rubrics, info}) => {
    const router = useRouter();
    const {rubric_code, rubric_id} = router.query;
    const [fetching ,setFetching] = useState<boolean>(false);
    const [newRubrics, setNewRubrics] = useState<IValue[]>(rubrics);
    const [currentPage, setCurrentPage] = useState(2)
    const maxPage = Math.ceil(info.count_all / info.count_select)
    console.log(fetching)
    const redirectToOtherPage = async (name: string, id: string) => {
        await router.push(`/${name}/${id}`, `/${name}/${id}`);
    };
    console.log(maxPage)
    const getNewRubrics = async () => {
        try {
            console.log(123)
            if(currentPage <= maxPage){
                const response = await axios.get(`${serverUrl}/rubric/${rubric_id}?limit=10&page=${currentPage}`)
                    .finally(() => setFetching(false));
                const responseRubrics: IValue[] = Object.values(response.data.message[rubric_code]);
                setNewRubrics([...newRubrics, ...responseRubrics]);
                setCurrentPage(prevState => prevState + 1);
            }
        } catch (e){
            setFetching(false)
        }

    }

    useEffect(() => {
        if(fetching){
            getNewRubrics()
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 2000){
            setFetching(true)
        }

    }


    return (
        <>
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
                                    <h1 className="layout__head">{info.rubric_name}</h1>
                                    {/*<div className="page-list">*/}
                                    {/*    <div className="page-list__wrapper">*/}
                                    {/*        <a href="#" className="page-list__item">*/}
                                    {/*            <img src="img/page-list-05.png" alt="Icon"/>*/}
                                    {/*            <span>В Берлине сообщили о решении  выслать немецких служащих. В Берлине сообщили о решении  выслать немецких служащих</span>*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#" className="page-list__item">*/}
                                    {/*            <img src="img/page-list-01.png" alt="Icon"/>*/}
                                    {/*            <span>Дагестан с начала 2023г. в 5 раз увеличил гарантийную поддержку бизнеса</span>*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#" className="page-list__item">*/}
                                    {/*            <img src="img/page-list-02.png" alt="Icon"/>*/}
                                    {/*            <span>Мнение: льготная ипотека на «вторичку» уравновесит цены на жилье в ЮФО</span>*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#" className="page-list__item">*/}
                                    {/*            <img src="img/page-list-03.png" alt="Icon"/>*/}
                                    {/*            <span>Шесть регионов СКФО стали аутсайдерами рейтинга благосостояния населения</span>*/}
                                    {/*        </a>*/}
                                    {/*        <a href="#" className="page-list__item">*/}
                                    {/*            <img src="img/page-list-04.png" alt="Icon"/>*/}
                                    {/*            <span>Компании Маска Neuralink разрешили испытывать чипы на мозгах людей. </span>*/}
                                    {/*        </a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {newRubrics.map(rubric => {
                                            const detailPicture = rubric.PICTURE;
                                            const originalImage = detailPicture && detailPicture.ORIGINAL;
                                            return (
                                                <div key={rubric.ID}
                                                     onClick={() => redirectToOtherPage(rubric.TYPE, rubric.ID)}
                                                     className="big-news-card section-indent mobile-wide">
                                                    <div className="big-news-card__body">
                                                        <div className="big-news-card__top">
                                                            <div className="big-news-card__group">
                                            <span className="big-news-card__author">
                                                <img src={`${server}/${rubric.USER_PHOTO}`} alt="Image"/>
                                                <span>{rubric.USER_NAME}</span>
                                            </span>
                                                                <span
                                                                    className="big-news-card__time">{rubric.CREATED_DATE}</span>
                                                            </div>
                                                            <div className="big-news-card__group">
                                                                <button className="big-news-card__control">
                                                                    {/*<svg>*/}
                                                                    {/*    <use xlink:href="img/sprite.svg#icon-bookmarks"></use>*/}
                                                                    {/*</svg>*/}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <a className="big-news-card__title">{rubric.NAME}</a>
                                                    </div>
                                                    {originalImage && <a href="#" className="big-news-card__img">
                                                        <img src={`${server}${rubric.PICTURE.ORIGINAL}`} alt="Image"/>
                                                    </a>}
                                                </div>
                                            )
                                        }
                                    )
                                    }

                                    <div className="layout__right">
                                        <a href="#" className="video-widget layout__sticky">
                                            <div className="video-widget__body">
                                                <div className="video-widget__inner">
                                                    <span className="video-widget__title">Какие-то видео</span>
                                                    {/*<svg className="video-widget__icon">*/}
                                                    {/*    <use xlink:href="img/sprite.svg#icon-arrow-next"></use>*/}
                                                    {/*</svg>*/}
                                                </div>
                                                <span className="video-widget__help">35 новых видео</span>
                                            </div>
                                            <picture className="video-widget__img">
                                                <img src="img/video-widget-01.jpg" alt="Image"/>
                                            </picture>
                                        </a>
                                    </div>
                                </div>
                                {/*<div className="layout__main-wrapper">*/}
                                {/*    <div className="layout__center">*/}
                                {/*        <div className="popular-videos">*/}
                                {/*            <div className="popular-videos__wrapper">*/}
                                {/*                <div className="popular-videos__videos">*/}
                                {/*                    <a href="#" className="video-card popular-videos__videos-item">*/}
                                {/*                        <picture className="video-card__img">*/}
                                {/*                            <img src="img/video-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="video-card__body">*/}
                                {/*                            <div className="video-card__top">*/}
                                {/*                                <span className="video-card__category">Политика</span>*/}
                                {/*                            </div>*/}
                                {/*                            <div className="video-card__bottom">*/}
                                {/*                                <span className="video-card__description">Как работает новая вакцина от&nbsp;рака</span>*/}
                                {/*                                <div className="video-card__author">*/}
                                {/*                                    <img src="img/user-01.jpg" alt="Image"/>*/}
                                {/*                                    <span>Александр Македонский</span>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="video-card popular-videos__videos-item">*/}
                                {/*                        <picture className="video-card__img">*/}
                                {/*                            <img src="img/video-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="video-card__body">*/}
                                {/*                            <div className="video-card__top">*/}
                                {/*                                <span className="video-card__category">Политика</span>*/}
                                {/*                            </div>*/}
                                {/*                            <div className="video-card__bottom">*/}
                                {/*                                <span className="video-card__description">Как работает новая вакцина от&nbsp;рака</span>*/}
                                {/*                                <div className="video-card__author">*/}
                                {/*                                    <img src="img/user-02.jpg" alt="Image"/>*/}
                                {/*                                    <span>Александр Македонский</span>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="video-card popular-videos__videos-item">*/}
                                {/*                        <picture className="video-card__img">*/}
                                {/*                            <img src="img/video-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="video-card__body">*/}
                                {/*                            <div className="video-card__top">*/}
                                {/*                                <span className="video-card__category">Политика</span>*/}
                                {/*                            </div>*/}
                                {/*                            <div className="video-card__bottom">*/}
                                {/*                                <span className="video-card__description">Как работает новая вакцина от&nbsp;рака</span>*/}
                                {/*                                <div className="video-card__author">*/}
                                {/*                                    <img src="img/user-01.jpg" alt="Image"/>*/}
                                {/*                                    <span>Александр Македонский</span>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="video-card popular-videos__videos-item">*/}
                                {/*                        <picture className="video-card__img">*/}
                                {/*                            <img src="img/video-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="video-card__body">*/}
                                {/*                            <div className="video-card__top">*/}
                                {/*                                <span className="video-card__category">Политика</span>*/}
                                {/*                            </div>*/}
                                {/*                            <div className="video-card__bottom">*/}
                                {/*                                <span className="video-card__description">Как работает новая вакцина от&nbsp;рака</span>*/}
                                {/*                                <div className="video-card__author">*/}
                                {/*                                    <img src="img/user-02.jpg" alt="Image"/>*/}
                                {/*                                    <span>Александр Македонский</span>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*                <div className="popular-videos__stories">*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="stories-card popular-videos__stories-item">*/}
                                {/*                        <picture className="stories-card__img">*/}
                                {/*                            <img src="img/stories-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <span className="stories-card__name">Александр Македонский</span>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="layout__right layout__right--visible">*/}
                                {/*        <span className="layout__heading">Тренды</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="layout__main-wrapper">*/}
                                {/*    <div className="layout__center">*/}
                                {/*        <div className="content-card">*/}
                                {/*            <div className="content-card__wrap">*/}
                                {/*                <div*/}
                                {/*                    className="content-card__wrapper content-card__wrapper--flex content-card__wrapper--scroll">*/}
                                {/*                    <a href="#" className="content-card__item">*/}
                                {/*                        <picture className="content-card__img">*/}
                                {/*                            <img src="img/audio-content-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                нейросетей</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="content-card__item content-card__item--center">*/}
                                {/*                        <picture className="content-card__img content-card__img--circle">*/}
                                {/*                            <img src="img/audio-content-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                ИИ</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="content-card__item">*/}
                                {/*                        <picture className="content-card__img">*/}
                                {/*                            <img src="img/audio-content-card-03.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                нейросетей</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="layout__right layout__right--visible">*/}
                                {/*        <span className="layout__heading">аудиоподкасты</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="layout__main-wrapper">*/}
                                {/*    <div className="layout__center">*/}
                                {/*        <div className="content-card">*/}
                                {/*            <div className="content-card__wrap">*/}
                                {/*                <div className="content-card__wrapper content-card__wrapper--flex">*/}
                                {/*                    <a href="#" className="content-card__item">*/}
                                {/*                        <picture className="content-card__img">*/}
                                {/*                            <img src="img/lectures-card-01.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                нейросетей</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="content-card__item">*/}
                                {/*                        <picture className="content-card__img">*/}
                                {/*                            <img src="img/lectures-card-02.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                нейросетей</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                    <a href="#" className="content-card__item">*/}
                                {/*                        <picture className="content-card__img">*/}
                                {/*                            <img src="img/lectures-card-03.jpg" alt="Image"/>*/}
                                {/*                        </picture>*/}
                                {/*                        <div className="content-card__body">*/}
                                {/*                            <h3 className="content-card__title">Люди не готовы к ошибкам*/}
                                {/*                                нейросетей</h3>*/}
                                {/*                            <span*/}
                                {/*                                className="content-card__help">Александр Македонский</span>*/}
                                {/*                        </div>*/}
                                {/*                    </a>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="layout__right layout__right--visible">*/}
                                {/*        <span className="layout__heading">лекции</span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Rubrics;