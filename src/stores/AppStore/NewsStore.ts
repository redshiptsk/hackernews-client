import type { INews } from "../../types/types";

export interface INewsStore {
  isLoading: boolean,
  newsIds: number[],
  news: INews[],
  setIsLoading: (isLoading: boolean) => void,
  getNewsIds: () => void,
  getNews: () => void,
}

export const newsStore = (): INewsStore => {
  return {
    isLoading: false,
    newsIds: [],
    news: [],
    setIsLoading: function (isLoading: boolean) {
      this.isLoading = isLoading;
    },
    getNewsIds: async function () {
      const fetchedNewsIds: number[] = await fetch(
        "https://hacker-news.firebaseio.com/v0/newstories.json"
      )
        .then((res) => res.json())
        .then((res) => res.slice(0, 100));
        this.newsIds = await fetchedNewsIds;
    },
    getNews: async function () {
      this.setIsLoading(true)
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
