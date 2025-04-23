import React, {useState} from 'react';
import "./NewsSnippet.scss"
import {contentToRender, canShowMoreContent, renderShowAllTagsButton, visibleTags} from "../utilits/content-utilits";
import {Button, Spin, Space} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import {IData_SnippetNews} from '../interfaces';

interface ContentProps {
    data: IData_SnippetNews;
    loading: boolean;
}


const Content: React.FC<ContentProps> = ({data, loading}) => {
    const {
        AB, URL, KW, HIGHLIGHTS
    } = data;

    const [showFullContent, setShowFullContent] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const initialTagLimit = 5;

    return (
        <>
            {loading ? (
                    <div className="news-snippet__loading-placeholder">
                        <Space direction="vertical" align="center" style={{ width: '100%', padding: '20px 0' }}>
                            <Spin size="large" /> {/* Можно выбрать size="small", "default", "large" */}
                            <span>Загрузка...</span>
                        </Space>
                    </div>
                )
                : (<div className="news-snippet__content">
                    {contentToRender(HIGHLIGHTS, AB, showFullContent)}
                    {canShowMoreContent(HIGHLIGHTS, AB) && (
                        <div
                            className="news-snippet__show-more-toggle"
                            onClick={() => setShowFullContent(!showFullContent)}
                        >
                            {showFullContent ? 'Show less' : 'Show more'}
                            {showFullContent ?
                                <CaretUpOutlined style={{marginLeft: '5px'}}/> :
                                <CaretDownOutlined style={{marginLeft: '5px'}}/>}
                        </div>
                    )}
                </div>)}

            {KW && KW.length > 0 && (
                <div className="news-snippet__tags">
                    {visibleTags(KW, showAllTags, initialTagLimit)}
                    {renderShowAllTagsButton(KW, initialTagLimit, showAllTags, setShowAllTags)}
                </div>
            )}

            <div className="news-snippet__actions">
                <Button
                    href={URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Original Source
                </Button>
            </div>
        </>
    );
};

export default Content;
