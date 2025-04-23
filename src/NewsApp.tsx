import React from 'react';
import NewsSnippet from "./components/NewsSnippet";
import {newsData} from "./data";

const App: React.FC = () => {
    return (
        <div className="main">
            <NewsSnippet data={newsData}/>
        </div>
    );
};

export default App;
