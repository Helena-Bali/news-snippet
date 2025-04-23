import React from 'react'
import {Tag} from 'antd';
import {IData_TagItem} from "../interfaces";
import { TagOutlined  } from '@ant-design/icons';

const renderHighlightedText = (text: string): React.ReactNode => {
    const parts = text.split(/(<\/?kw>)/g).filter(part => part);
    const elements: React.ReactNode[] = [];
    let isKeyword = false;

    parts.forEach((part, index) => {
        if (part === '<kw>') {
            isKeyword = true;
        } else if (part === '</kw>') {
            isKeyword = false;
        } else {
            if (isKeyword) {
                elements.push(<span key={index} className="keyword-highlight">{part}</span>);
            } else {
                const decodedPart = part.replace(/</g, '<').replace(/>/g, '>').replace(/&/g, '&');
                elements.push(<React.Fragment key={index}>{decodedPart}</React.Fragment>);
            }
        }
    });
    return elements;
};


export const contentToRender = (HIGHLIGHTS: string[], AB: string, showFullContent: boolean) => {
    let contentSource = '';
    if (HIGHLIGHTS && HIGHLIGHTS.length > 0) {
        contentSource = showFullContent ? HIGHLIGHTS.join(' ... ') : HIGHLIGHTS[0];
        return renderHighlightedText(contentSource);
    } else if (AB) {
        const truncatedAB = AB.length > 300 ? AB.substring(0, 300) + '...' : AB;
        return showFullContent ? AB : truncatedAB;
    }
    return 'No content available.';
}

export const canShowMoreContent = (HIGHLIGHTS: string[], AB: string) => {
    if (HIGHLIGHTS && HIGHLIGHTS.length > 1) return true;
    if (!HIGHLIGHTS && AB && AB.length > 300) return true;
    return false;
};

export const visibleTags = (KW: IData_TagItem[], showAllTags: boolean,initialTagLimit: number,) => {
    if (!KW) return [];
    const tagsToDisplay = showAllTags ? KW : KW.slice(0, initialTagLimit);
    return tagsToDisplay.map((tag: IData_TagItem) => (
        <Tag key={tag.value} icon={<TagOutlined/>}>
            {tag.value} {tag.count > 1 ? ` ${tag.count}` : ''}
        </Tag>
    ));
}

export const renderShowAllTagsButton = (KW: IData_TagItem[],
                                        initialTagLimit: number,
                                        showAllTags: boolean,
                                        setShowAllTags: (showAllTags: boolean) => void) => {
    if (!KW || KW.length <= initialTagLimit || showAllTags) return null;
    const remainingCount = KW.length - initialTagLimit;
    return (
        <Tag
            className="ant-tag news-snippet__show-all-tags"
            onClick={() => setShowAllTags(true)}
        >
            Show All +{remainingCount}
        </Tag>
    );
}
