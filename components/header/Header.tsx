import React, { useState } from 'react';
import  './header.scss'
import aiImg from '../../app/assets/img/ai-img.png'
import logo from '../../app/assets/img/logotype.svg'
import Link from "next/link";
import Image from "next/image";
import MobileLeftMenu from '../mobileMenu/MobileMenu';
import ChatAi from '../chatAi/ChatAi';
const Header = () => {
    const [active, setActive] = useState(false)
    const [chatVisible, setChatVisible] = useState(false);

    return (
        <>      
            <ChatAi active={chatVisible} setActive={setChatVisible} />  
            <header className={`header ${active && 'is--active'}`} id="header">
                <div className="container">
                    <div className='header__wrapper'>
                        <div className="header__left">
                            <Link href={'/'} className="header__logotype">
                                <Image src={logo} alt="SCROLL"/>
                            </Link>
                        </div>
                        <div className="header__center">
                            <div className="c-search header__search">
                                <div className="c-search__inner">
                                    <input type="text" className="c-search__input" placeholder="Поиск"/>
                                </div>
                            </div>
                            <button onClick={() => setChatVisible(true)} className="ai-btn header__ai">
                                <span>Спросить у ИИ</span>
                                <Image src={aiImg} alt="AI"/>
                            </button>
                        </div>
                        <div className="header__right">
                            <div className="header__controls header__controls--first">
                                <a href="#" className="header__btn header__btn--mobile header__btn--desktop-hidden">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor"/>
                                    </svg>
                                </a>
                                <a href="#" className="header__btn header__btn--tablet-hidden">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3ZM17 18L12 15.82L7 18V5H17V18Z" fill="currentColor"/>
                                    </svg>
                                </a>
                                <a href="#" className="header__btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="currentColor"/>
                                    </svg>
                                </a>
                            </div>
                            <div className="header__controls header__controls--second">
                                <a href="https://jureservicepersonal.vercel.app/" className="header__btn">
                                    <span>Войти</span>
                                </a>
                                <div onClick={() => setActive(!active)} className={`hamburger ${active && 'is--active'}`} id="hamburger-toggle" aria-label="Меню">
                                    <span className="hamburger__inner"></span>
                                    <span className="hamburger__inner"></span>
                                    <span className="hamburger__inner"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`menu ${active && 'is--active'}`}>
                <MobileLeftMenu closeMenu={setActive} setChatVisible={setChatVisible} />
            </div>
        </>
    );
};

export default Header;