import React, {useMemo} from 'react';
import "./NewsSnippet.scss"
import { IData_SnippetNews } from '../interfaces';
import {formatDate, formatReach} from '../utilits'
import {Space} from 'antd';

interface NewsSnippetProps {
    data: IData_SnippetNews;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({data}) => {
    const {
        ID, TI, AB, URL, DOM, DP, LANG, REACH, KW, AU, CNTR,
        CNTR_CODE, SENT, TRAFFIC, FAV, HIGHLIGHTS
    } = data;

    const formattedDate = useMemo(() => formatDate(DP, LANG), [DP, LANG]);

    return (
        <div className="news-snippet" data-id={ID}>
            <div className="news-snippet__top-bar">
                <div className="news-snippet__top-left">
                    <Space size="middle">
                        <span>{formattedDate}</span>
                        <span><strong>{formatReach(REACH)}</strong> Reach</span>
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default NewsSnippet;
