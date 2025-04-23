import React, {useMemo} from 'react';
import "./NewsSnippet.scss"
import { IData_SnippetNews } from '../interfaces';
import {formatDate, formatReach, formatTraffic, formatSentimentTag, getFlagEmoji} from '../utilits'
import {Space, Typography,} from 'antd';
import { InfoCircleOutlined, GlobalOutlined, BorderOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';

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
            <Typography.Title level={4} className="news-snippet__title">
                <a href={URL} target="_blank" rel="noopener noreferrer">{TI}</a>
            </Typography.Title>
            <div className="news-snippet__source-info">
                <Space size="middle" wrap>
                    {FAV && <img src={FAV} alt="favicon" className="news-snippet__favicon" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                    <a href={URL} target="_blank" rel="noopener noreferrer">
                        <GlobalOutlined className="action-icon"/> {DOM}
                    </a>
                    {CNTR && CNTR_CODE && (
                        <span>
                                {/*<span className="news-snippet__country-flag">{getFlagEmoji(CNTR_CODE)}</span>*/}
                            {CNTR}
                            </span>
                    )}
                    {LANG && <span><ReadOutlined className="action-icon"/> {LANG.toUpperCase()}</span>}
                    {AU && AU.length > 0 && (
                        <span><UserOutlined/> {AU.join(', ')}</span>
                    )}
                </Space>
            </div>

        </div>
    );
};

export default NewsSnippet;
