import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";

interface User {
    DATE_REGISTER: {
        TITLE: string,
        VALUE: string,
    }
    EMAIL: {
        TITLE: string,
        VALUE: string
    }
    LAST_NAME: {
        TITLE: string,
        VALUE: string
    }
    NAME: {
        TITLE: string,
        VALUE: string
    }

    PERSONAL_PHOTO:{
        TITLE: string,
        VALUE: string
    }
}


export const useGetUser = () => {
    const [user, setUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${serverUrl}/users`)
                // const newsObj = Object.values(response);
                setUser(response.data.message.main.VALUES);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, []);
    return user
};