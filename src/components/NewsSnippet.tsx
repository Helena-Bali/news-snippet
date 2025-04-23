import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState, AppDispatch} from "../store/store";
import "./NewsSnippet.scss"
import TopBar from "./TopBar";
import Content from "./Content"
import Duplicates from "./Duplicates";
import {fetchNews} from "../store/newsSlice";


const NewsSnippet: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {news, loading} = useSelector((state: RootState) => state.news);
    useEffect(() => {
            dispatch(fetchNews());
    }, [dispatch]);
    const {ID} = news
    return (
        <div className="news-snippet" data-id={ID}>
            <TopBar data={news}/>
            <Content data={news} loading={loading}/>
            <Duplicates/>
        </div>
    );
};

export default NewsSnippet;
