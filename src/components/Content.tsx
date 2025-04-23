import React, { useState } from 'react';
import "./NewsSnippet.scss"
import { contentToRender, canShowMoreContent } from "../utilits/content-utilits";
import { Button } from 'antd';
import { IData_SnippetNews } from '../interfaces';

interface ContentProps {
    data: IData_SnippetNews;
}


const Content: React.FC<ContentProps> = ({ data }) => {
    const {
        ID, TI, AB, URL, DOM, DP, LANG, REACH, KW, AU, CNTR,
        CNTR_CODE, SENT, TRAFFIC, FAV, HIGHLIGHTS
    } = data;

    const [showFullContent, setShowFullContent] = useState(false);

    return (
        <>
            <div className="news-snippet__content">
                {contentToRender(HIGHLIGHTS, AB, showFullContent)}
                {canShowMoreContent(HIGHLIGHTS, AB) && (
                    <span
                        className="news-snippet__show-more-toggle"
                        onClick={() => setShowFullContent(!showFullContent)}
                    >
                        {showFullContent ? 'Show less' : 'Show more'}
                    </span>
                )}
            </div>

            {/* Tags */}
            {/*{KW && KW.length > 0 && (*/}
            {/*    <div className="news-snippet__tags">*/}
            {/*        {visibleTags}*/}
            {/*        {renderShowAllTagsButton}*/}
            {/*    </div>*/}
            {/*)}*/}

            {/* Actions */}
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
