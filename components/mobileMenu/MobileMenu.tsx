import React, { FC } from "react";
import "./MobileMenu.scss";
import Image from "next/image";
import aiImg from "../../app/assets/img/ai-img.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetLeftMenuValues } from "../../hooks/useGetLeftMenuValues";
import Link from "next/link";
import { server } from "../../utils/serverUrl";
import { setNameRubric } from "../../store/slices/leftMenuSlice";

interface MobileMenuProps {
  closeMenu: (v: boolean) => void;
  setChatVisible: (v: boolean) => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ closeMenu, setChatVisible }) => {
  const { values } = useAppSelector((state) => state.leftMenuReducer);
  const dispatch = useAppDispatch();
  useGetLeftMenuValues();
  return (
    <div className="menu__wrap">
      <div className="menu__main">
        <div className="menu__block">
          <nav className="nav menu__nav">
            <ul className="nav__list">
              {values.map((value) => (
                <li
                  onClick={() => dispatch(setNameRubric(value.NAME))}
                  key={value.ID}
                  className="nav__item"
                >
                  <Link
                    href={`/rubrics/${value.CODE}/${value.ID}`}
                    className="nav__link"
                  >
                    <img src={`${server}${value.THEME_ICON_PATH}`} />
                    <span>{value.NAME}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="menu__block">
          <div className="menu__controls">
            <button onClick={() => setChatVisible(true)} className="ai-btn ai-btn--lg menu__ai">
              <span>Спросить у ИИ</span>
              <Image src={aiImg} alt="AI" />
            </button>
            <button className="menu__btn">
              <span>Закладки</span>
              <svg>
                <use href="/img/sprite.svg#icon-bookmarks"></use>
              </svg>
            </button>
            <button className="menu__btn menu__btn--mobile notifications-btn">
              <span>Уведомления</span>
              <svg>
                <use href="img/sprite.svg#icon-notifications"></use>
              </svg>
            </button>
            <button
              onClick={() => closeMenu(false)}
              className="menu__btn menu__btn--mobile menu__close"
            >
              <span>Закрыть</span>
              <svg>
                <use href="/img/sprite.svg#icon-close"></use>
              </svg>
            </button>
          </div>
          <div className="c-account menu__account">
            <button className="c-account__inner">
              <span className="c-account__name">Александр Македонский</span>
              <span className="c-account__help">Аккаунт</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="footer menu__footer" id="footer">
        <div className="footer-socmedia footer__socmedia">
          <div className="footer-socmedia__wrapper">
            <a href="#" className="footer-socmedia__btn">
              <svg className="footer-socmedia__icon">
                <use href="img/sprite.svg#icon-vcru"></use>
              </svg>
            </a>
            <a href="#" className="footer-socmedia__btn">
              <svg className="footer-socmedia__icon">
                <use href="img/sprite.svg#icon-telegram"></use>
              </svg>
            </a>
            <a href="#" className="footer-socmedia__btn">
              <svg className="footer-socmedia__icon">
                <use href="img/sprite.svg#icon-vk"></use>
              </svg>
            </a>
            <a href="#" className="footer-socmedia__btn">
              <svg className="footer-socmedia__icon">
                <use href="img/sprite.svg#icon-dzen"></use>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-nav footer__nav">
          <div className="footer-nav__wrapper">
            <ul className="footer-nav__list">
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  Заказать рекламу
                </a>
              </li>
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  О проекте
                </a>
              </li>
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  Конфиденциальность
                </a>
              </li>
            </ul>
            <ul className="footer-nav__list">
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  Правила
                </a>
              </li>
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  Помощь
                </a>
              </li>
              <li className="footer-nav__item">
                <a href="#" className="footer-nav__link">
                  Вакансии
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MobileMenu;
