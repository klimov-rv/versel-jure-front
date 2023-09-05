import React from 'react';
import {useGetValuesNews} from "../../hooks/useGetValues";
import {server} from "../../utils/serverUrl";
import Link from "next/link";
import '../../styles/global.scss'
const FirstBlock = () => {
    const news = useGetValuesNews("articles", 3)
    return (
        <div className="news-card mobile-wide">
            {news &&
                <div className="news-card__grid">
                    <div className="news-card__grid-left">
                        <Link href={`/articles/${news[0].ID}`}
                              className="tidings-card tidings-card--lg news-card__grid-card news-card__grid-card--full">
                            <div className="tidings-card__wrapper">
                                <picture className="tidings-card__bg">
                                    <img src={`${server}${news[0].PREVIEW_PICTURE.ORIGINAL}`} alt="Image"/>
                                </picture>
                                <div className="tidings-card__body">
                                    <span className="tidings-card__name">{news[0].NAME}</span>
                                    <div className="tidings-card__inner">
                                        <span className="tidings-card__help">30 минут назад</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="news-card__grid-right">
                        <Link href={`/articles/${news[1].ID}`} className="tidings-card news-card__grid-card">
                            <div className="tidings-card__wrapper">
                                <picture className="tidings-card__bg">
                                    <img src={`${server}${news[1].PREVIEW_PICTURE.ORIGINAL}`} alt="Image"/>
                                </picture>
                                <div className="tidings-card__body">
                                    <span className="tidings-card__name">{news[1].NAME}</span>
                                    <div className="tidings-card__inner">
                                        <span className="tidings-card__help">30 минут назад</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link href={`/articles/${news[2].ID}`} className="tidings-card news-card__grid-card">
                            <div className="tidings-card__wrapper">
                                <div className="tidings-card__body">
                                    <span className="tidings-card__name">{news[2].NAME}</span>
                                    <div className="tidings-card__inner">
                                        <span className="tidings-card__help">30 минут назад</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>}
        </div>
    );
};

export default FirstBlock;