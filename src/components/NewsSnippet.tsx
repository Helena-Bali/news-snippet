import React from 'react';
import "./NewsSnippet.scss"
import {IData_SnippetNews} from '../interfaces';
import TopBar from "./TopBar";
import Content from "./Content"
import Duplicates from "./Duplicates";


interface NewsSnippetProps {
    data: IData_SnippetNews;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({data}) => {
    const {ID} = data
    return (
        <div className="news-snippet" data-id={ID}>
            <TopBar data={data}/>
            <Content data={data}/>
            <Duplicates/>
        </div>
    );
};

export default NewsSnippet;
