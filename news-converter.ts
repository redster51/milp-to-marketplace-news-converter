const fs = require('fs');
import { listNews } from './news';

interface IMarketNews {
    id: number;
    date: string;
    content: string;
    url?: string;
    modal: {
        title: string;
        image: string;
        content: string;
    };
}

const marketPlaceNews: IMarketNews[] = listNews.reverse()
    .map<IMarketNews>((item, index) => {
        const modifiedItem: IMarketNews = item as IMarketNews;
        modifiedItem.id = ++index;
        // @ts-ignore
        delete modifiedItem.modal.extraImages;
        return modifiedItem;
    })
    .reverse();

try {
    fs.writeFileSync('marketplace-news.ts', 'export const listNews: News[] = ' + JSON.stringify(marketPlaceNews, null, 2));
    console.log('----------------------------------\n| News are successful converted! |\n----------------------------------');
} catch (e) {
    console.error(e);
}
