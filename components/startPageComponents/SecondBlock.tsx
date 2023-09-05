import React from 'react';

import Image from "next/image";
import {server} from "../../utils/serverUrl";
import Link from "next/link";
import {useGetValuesNews} from "../../hooks/useGetValues";

const SecondBlock = () => {
    const news = useGetValuesNews("events", 3)
    return (
        <div className="news-card mobile-wide section-indent">
            {news &&
                <div className="news-card__wrapper">
                    {news.map(item => (
                        <Link href={`/events/${item.ID}`} key={item.ID} className="news-card__item">
                            <div className="news-card__body">
                                <span className="news-card__name">{item.NAME}</span>
                                <div className="news-card__inner">
                                    <span className="news-card__help">Спорт</span>
                                    <span className="news-card__help">30 минут назад</span>
                                </div>
                                <button className="c-icon-btn news-card__favorite">
                                    <svg className="c-icon-btn__icon">
                                        <use xlinkHref="img/sprite.svg#icon-bookmarks"></use>
                                    </svg>
                                </button>
                            </div>
                            <picture className="news-card__img news-card__img--sm">
                                <img src={`${server}${item.PREVIEW_PICTURE.ORIGINAL}`} alt="Image"/>
                            </picture>
                        </Link>
                    ))}
                </div>}
        </div>
    );
};

export default SecondBlock;