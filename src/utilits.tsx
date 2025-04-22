import { format, parseISO, Locale } from 'date-fns';
import { enUS, it, de, es, fr } from 'date-fns/locale';
import { JSX } from 'react';

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
