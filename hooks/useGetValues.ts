import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";

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
}


export const useGetValuesNews = (name : string, limit : number) => {
    const [news, setNews] = useState<News[] | undefined>(undefined);

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await axios.get(`${serverUrl}/${name}?limit=${limit}`);
                const newsObj = Object.values(response.data.message.data) as News[];
                setNews(newsObj);
                console.log(newsObj)
            } catch (error) {
                console.error(error);
            }
        };

        getNews();
    }, []);

    return news;
};