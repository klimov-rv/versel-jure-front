import React from "react";
import "./videoWidget.scss";

const VideoWidget = () => {
  return (
    <a href="#" className="video-widget layout__sticky">
      <div className="video-widget__body">
        <div className="video-widget__inner">
          <span className="video-widget__title">Какие-то видео</span>
          <svg className="video-widget__icon">
            <use href="img/sprite.svg#icon-arrow-next"></use>
          </svg>
        </div>
        <span className="video-widget__help">35 новых видео</span>
      </div>
      <picture className="video-widget__img">
        <img
          src="https://liveinmsk.ru/up/photos/album/2north/2270.jpg"
          alt="Image"
        />
      </picture>
    </a>
  );
};

export default VideoWidget;
