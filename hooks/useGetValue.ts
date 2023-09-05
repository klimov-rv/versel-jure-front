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
    DETAIL_TEXT: string
}


export const useGetValue = (category: string | string[] | undefined, id: string | string[] | undefined) => {
    const [news, setNews] = useState<News[] | undefined>(undefined);

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await axios.get(`${serverUrl}/${category}/${id}`);
                const newsObj = Object.values(response.data.message.data) as News[];
                setNews(newsObj);
            } catch (error) {
                console.error(error);
            }
        };

        getNews();
    }, []);
    if(news) return news[0];
};