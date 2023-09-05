import React, {useEffect} from 'react';
import Footer from "../footer/Footer";
import {useGetLeftMenuValues} from "../../hooks/useGetLeftMenuValues";
import {server} from "../../utils/serverUrl";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import Link from "next/link";
import {setNameRubric} from "../../store/slices/leftMenuSlice";

const LeftMenu = () => {
    const {values} = useAppSelector(state => state.leftMenuReducer);
    const dispatch = useAppDispatch()
    useGetLeftMenuValues()

    return (
        <div className="layout__left">
            <nav className="nav layout__nav">
                <ul className="nav__list is--open">
                    {values.map(value => (
                        <li onClick={() => dispatch(setNameRubric(value.NAME))} key={value.ID} className="nav__item">
                            <Link href={`/rubrics/${value.CODE}/${value.ID}`} className="nav__link">
                                <img src={`${server}${value.THEME_ICON_PATH}`}/>
                                <span>{value.NAME}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <button className="nav__more is--open" aria-label="Показать больше">
                    <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L11 11L21 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </nav>
        </div>
    );
};

export default LeftMenu;