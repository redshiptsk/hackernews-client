import type { INews } from "../../types/types";

export interface INewsStore {
  newsIds: number[];
  news: INews[];
  isLoading: boolean;
  error: string | null;
  setIsLoading: (value: boolean) => void;
  setError: (message: string | null) => void;
  getNewsIds: () => Promise<void>;
  getNews: () => Promise<void>;
}

export const newsStore = (): INewsStore => {
  return {
    newsIds: [],
    news: [],
    isLoading: false,
    error: null,
    
    setIsLoading: function (value: boolean) {
      this.isLoading = value;
    },
    
    setError: function (message: string | null) {
      this.error = message;
    },
    
    getNewsIds: async function () {
      try {
        this.setIsLoading(true);
        this.setError(null);
        
        const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json");
        if (!response.ok) throw new Error('Failed to fetch news IDs');
        
        const data = await response.json();
        this.newsIds = Array.isArray(data) ? data.slice(0, 100) : [];
      } catch (error) {
        this.setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        this.setIsLoading(false);
      }
    },
    
    getNews: async function () {
      if (!this.newsIds.length) return;
      
      try {
        this.setIsLoading(true);
        this.setError(null);
        
        const newsPromises = this.newsIds.map(async (id) => {
          const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          if (!response.ok) throw new Error(`Failed to fetch news item ${id}`);
          return await response.json();
        });
        
        this.news = await Promise.all(newsPromises);
      } catch (error) {
        this.setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        this.setIsLoading(false);
      }
    },
  };
};