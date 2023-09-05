import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setLeftMenuValues} from "../store/slices/leftMenuSlice";

interface IValue {
    ID: string,
    NAME: string,
    THEME_ICON_PATH: string
}

export const useGetLeftMenuValues = () => {
    // const [values, setValues] = useState<IValue[]>([]);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const getValueLeftMenu = async () => {
            try {
                const response = await axios.get(`${serverUrl}/navigation/main`)
                // console.log(Object.values(response.data.message))
                const newsObj : IValue[] = Object.values(response.data.message);
                dispatch(setLeftMenuValues(newsObj))
                // setValues(newsObj);
            } catch (error) {
                console.error(error);
            }
        };
        getValueLeftMenu();
    }, []);
};