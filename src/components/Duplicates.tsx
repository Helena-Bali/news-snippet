import React, {useState} from 'react';
import { Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {RenderFirstDuplicate} from './RenderDuplicate'

const Duplicates = () => {
    const [showAllDuplicates, setShowAllDuplicates] = useState(false);
    let duplicatesCount = 53;
    return (
        duplicatesCount > 0 ? (
            <div className="news-snippet__duplicates-section">
                <div className="news-snippet__duplicates-header">
                    <span className="news-snippet__duplicates-count">
                        Duplicates: {duplicatesCount}
                    </span>
                    <span className="news-snippet__duplicates-sort">
                        By Relevance <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                    </span>
                </div>
                {RenderFirstDuplicate()}
                <div className="news-snippet__view-duplicates">
                    <Button
                        type="default"
                        size="small"
                        icon={<DownOutlined />}
                        onClick={() => setShowAllDuplicates(!showAllDuplicates)}
                        className="view-duplicates-button"
                    >
                        View Duplicates
                    </Button>
                </div>
            </div>
        ): null
    );
};

export default Duplicates;
