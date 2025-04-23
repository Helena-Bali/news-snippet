import React, {useState} from 'react';
import "./NewsSnippet.scss"
import {contentToRender, canShowMoreContent, renderShowAllTagsButton, visibleTags} from "../utilits/content-utilits";
import {Button} from 'antd';
import {CaretDownOutlined, CaretUpOutlined} from '@ant-design/icons';
import {IData_SnippetNews} from '../interfaces';

interface ContentProps {
    data: IData_SnippetNews;
}


const Content: React.FC<ContentProps> = ({data}) => {
    const {
        AB, URL, KW, FAV, HIGHLIGHTS
    } = data;

    const [showFullContent, setShowFullContent] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const initialTagLimit = 5;

    return (
        <>
            <div className="news-snippet__content">
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
            </div>

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
