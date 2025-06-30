import type { INews } from "../../types/types";

export interface INewsStore {
  newsIds: number[],
  news: INews[],
  isLoading: boolean,
  setIsLoading: (value: boolean) => void,
  getNewsIds: () => void,
  getNews: () => void,
}

export const newsStore = (): INewsStore => {
  return {
    newsIds: [],
    news: [],
    isLoading: false,
    setIsLoading: function (value: boolean) {
      this.isLoading = value;
    },
    getNewsIds: async function () {
      this.setIsLoading(true);
      const fetchedNewsIds: number[] = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      )
        .then((res) => res.json())
        .then((res) => res.slice(0, 100));
        this.newsIds = fetchedNewsIds;
    },
    getNews: async function () {
      const fetchedNews = Promise.all<INews>(this.newsIds.map(async (id) =>       
        await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.json())
          .then((res) => res)
      )).then((value) => value)
      this.news = await fetchedNews;
      this.setIsLoading(false)
    },
  };
};
