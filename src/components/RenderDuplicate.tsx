import {Space, Typography,} from 'antd';
import {InfoCircleOutlined, GlobalOutlined, CheckSquareOutlined, UserOutlined} from '@ant-design/icons';
import {duplicateData} from '../data'
import React, {useMemo} from "react";
import {formatDate, formatReach} from "../utilits/top-bar-utilits";
import flag from "../favicons/fr.png";

export const RenderFirstDuplicate = () => {
    const {
        TI, URL, DOM, DP, LANG, REACH, AU, CNTR,
        CNTR_CODE
    } = duplicateData;
    const formattedDate = useMemo(() => formatDate(DP, LANG), [DP, LANG]);
    const formattedReach = formatReach(REACH || 0);
    if (!duplicateData) return null;

    return (
        <div className="news-snippet__duplicate-item">
            <div className="news-snippet__top-bar">
                <div className="news-snippet__duplicate-top-left">
                    <Space size="middle">
                        <span>{formattedDate}</span>
                        <span> {formattedReach} Top Reach</span>
                    </Space>
                </div>
                <div className="news-snippet__duplicate-top-right">
                    <Space size="small">
                        <InfoCircleOutlined className="action-icon"/>
                        <CheckSquareOutlined className="action-icon"/>
                    </Space>
                </div>
            </div>

            <Typography.Title level={5} className="news-snippet__title">
                <a href={URL} target="_blank" rel="noopener noreferrer">{TI}</a>
            </Typography.Title>

            <div className="news-snippet__source-info news-snippet__source-info--duplicate">
                <Space size="middle" wrap>
                    <a href={URL} target="_blank" rel="noopener noreferrer">
                        <GlobalOutlined/> {DOM}
                    </a>
                    {CNTR && CNTR_CODE && (
                        <span>
                                <span className="news-snippet__country-flag">
                                    {<img src={flag} alt="favicon" className="news-snippet__favicon" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                                </span>
                            {CNTR}
                            </span>
                    )}
                    {AU && AU.length > 0 && (
                        <span><UserOutlined/> {AU.join(', ')}</span>
                    )}
                </Space>
            </div>
        </div>
    );
};
