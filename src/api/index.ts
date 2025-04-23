import axios from 'axios'


export const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const getNews = async () => {
    try {
        const response = await $host.get('/api/v1/news-data/news');
        console.log(response.data[0]);
        return response.data[0];
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Ошибка при загрузке');
    }

};
