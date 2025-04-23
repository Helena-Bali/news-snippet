import React, {useMemo} from 'react';
import "./NewsSnippet.scss"
import { IData_SnippetNews } from '../interfaces';
import {formatDate, formatReach, formatTraffic, formatSentimentTag} from '../utilits/top-bar-utilits'
import {Space, Typography,} from 'antd';
import flag from "../favicons/fr.png"
import { InfoCircleOutlined, GlobalOutlined, BorderOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';

interface TopBarProps {
    data: IData_SnippetNews;
}

const TopBar: React.FC<TopBarProps> = ({data}) => {
    const {
        TI, URL, DOM, DP, LANG, REACH, AU, CNTR,
        CNTR_CODE, SENT, TRAFFIC
    } = data;

    const formattedDate = useMemo(() => formatDate(DP, LANG), [DP, LANG]);
    const formattedTraffic = useMemo(() => formatTraffic(TRAFFIC), [TRAFFIC])
    const sentimentTag = useMemo(() => formatSentimentTag(SENT), [SENT])

    return (
        <>
            <div className="news-snippet__top-bar">
                <div className="news-snippet__top-left">
                    <Space size="middle" className="space">
                        <span>{formattedDate}</span>
                        <span><strong>{formatReach(REACH)}</strong> Reach</span>
                        {formattedTraffic.length > 0 && (
                            <div className="news-snippet__traffic-info">
                                Top Traffic: <Space size="small">{formattedTraffic}</Space>
                            </div>
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
                    <a href={URL} target="_blank" rel="noopener noreferrer">
                        <GlobalOutlined className="action-icon"/> {DOM}
                    </a>
                    {CNTR && CNTR_CODE && (
                        <span>
                                <span className="news-snippet__country-flag">
                                    {<img src={flag} alt="favicon" className="news-snippet__favicon" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                                </span>
                            {CNTR}
                            </span>
                    )}
                    {LANG && <span><ReadOutlined className="action-icon"/> {LANG.toUpperCase()}</span>}
                    {AU && AU.length > 0 && (
                        <span><UserOutlined/> {AU.join(', ')}</span>
                    )}
                </Space>
            </div>

        </>
    );
};

export default TopBar;
