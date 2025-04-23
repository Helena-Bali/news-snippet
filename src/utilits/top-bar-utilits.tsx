import { JSX } from 'react';
import { format, parseISO, Locale } from 'date-fns';
import { enUS, it, de, es, fr } from 'date-fns/locale';
import {Tag} from 'antd';
import {IData_TrafficItem} from "../interfaces";

const getDateLocale = (langCode: string): Locale => {
    switch (langCode.toLowerCase()) {
        case 'it': return it;
        case 'de': return de;
        case 'es': return es;
        case 'fr': return fr;
        case 'en':
        default: return enUS;
    }
};

export const formatTraffic = (TRAFFIC: IData_TrafficItem[]) => {
    return TRAFFIC?.slice(0, 3).map(item => (
        <span key={item.value}>{item.value} <strong>{Math.round(item.count * 100)}%</strong></span>
    )) || [];
}

export const formatSentimentTag = (SENT: string) => {
    if (!SENT) return null;

    let color: string = 'default';
    let text: string = SENT.charAt(0).toUpperCase() + SENT.slice(1);
    let className = `news-snippet__sentiment--${SENT}`;

    if (SENT === 'positive') {
        text = 'Positive';
        color = '#1e7d3a';
    } else if (SENT === 'negative') {
        text = 'Negative';
        color = '#FF0000';
    } else if (SENT === 'neutral') {
        text = 'Neutral';
        color = 'default';
    }

    return (
        <span className={`news-snippet__sentiment ${className}`}>
            <Tag color={color}>{text}</Tag>
        </span>
    );
};


export const formatReach = (reach: number): string => {
    if (reach >= 1000000) {
        return (reach / 1000000).toFixed(1) + 'M';
    }
    if (reach >= 1000) {
        return (reach / 1000).toFixed(0) + 'K';
    }
    return reach.toString();
};

export const formatDate = (
    dateString: string | undefined,
    lang: string = 'en'
): JSX.Element => {
    if (!dateString) return <>No Date</>;

    try {
        const date = parseISO(dateString);
        const formatted = format(date, 'dd MMM yyyy', {
            locale: getDateLocale(lang),
        });

        const [day, ...rest] = formatted.split(' ');

        return (
            <>
                <strong>{day}</strong> {rest.join(' ')}
            </>
        );
    } catch (e) {
        console.error('Error parsing date:', dateString, e);
        return <>{dateString}</>;
    }
};

export const getFlagEmoji = (countryCode: string): string => {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    console.log(String.fromCodePoint(...codePoints))
    return String.fromCodePoint(...codePoints);
};
