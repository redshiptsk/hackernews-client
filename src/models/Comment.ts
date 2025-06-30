import { makeAutoObservable } from "mobx";

class Comment {
  id: number;
  by: string;
  text: string;
  time: number;
  kids: number[] = [];
  replies: Comment[] = [];
  isLoading = false;
  isLoaded = false;

  constructor(id: number, by: string, text: string, time: number, kids: number[] = []) {
    makeAutoObservable(this);
    this.id = id;
    this.by = by;
    this.text = text;
    this.time = time;
    this.kids = kids;
  }

  setReplies(replies: Comment[]) {
    this.replies = replies;
    this.isLoading = false;
    this.isLoaded = true;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
}

export default Comment;