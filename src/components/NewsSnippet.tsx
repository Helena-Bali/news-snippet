import React, {useMemo} from 'react';
import "./NewsSnippet.scss"
import { IData_SnippetNews } from '../interfaces';
import {formatDate, formatReach, formatTraffic, formatSentimentTag} from '../utilits'
import {Space} from 'antd';
import { InfoCircleOutlined, CheckSquareOutlined, BorderOutlined } from '@ant-design/icons';

interface NewsSnippetProps {
    data: IData_SnippetNews;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({data}) => {
    const {
        ID, TI, AB, URL, DOM, DP, LANG, REACH, KW, AU, CNTR,
        CNTR_CODE, SENT, TRAFFIC, FAV, HIGHLIGHTS
    } = data;

    const formattedDate = useMemo(() => formatDate(DP, LANG), [DP, LANG]);
    const formattedTraffic = useMemo(() => formatTraffic(TRAFFIC), [TRAFFIC])
    const sentimentTag = useMemo(() => formatSentimentTag(SENT), [SENT])

    return (
        <div className="news-snippet" data-id={ID}>
            <div className="news-snippet__top-bar">
                <div className="news-snippet__top-left">
                    <Space size="middle">
                        <span>{formattedDate}</span>
                        <span><strong>{formatReach(REACH)}</strong> Reach</span>
                        {formattedTraffic.length > 0 && (
                            <span className="news-snippet__traffic-info">
                                Top Traffic: <Space size="small">{formattedTraffic}</Space>
                            </span>
                        )}
                    </Space>
                </div>
                <div className="news-snippet__top-right">
                    {sentimentTag}
                    <Space size="small" className="news-snippet__main-actions">
                        <InfoCircleOutlined className="action-icon" />
                        <BorderOutlined className="action-icon" />
                    </Space>
                </div>
            </div>
        </div>
    );
};

export default NewsSnippet;
