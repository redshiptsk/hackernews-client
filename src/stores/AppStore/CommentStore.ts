import { makeAutoObservable } from "mobx";
import Comment from "../../models/Comment";

const HN_API = "https://hacker-news.firebaseio.com/v0";

class CommentStore {
  comments: Comment[] = [];
  commentMap = new Map<number, Comment>();

  constructor() {
    makeAutoObservable(this);
  }

  async fetchStoryComments(storyId: number) {
    try {
      const response = await fetch(`${HN_API}/item/${storyId}.json`);
      const story = await response.json();
      
      if (story && story.kids) {
        const topLevelComments = await Promise.all(
          story.kids.map((id: number) => this.fetchComment(id))
        );
        
        this.comments = topLevelComments.filter(comment => comment !== null) as Comment[];
      }
    } catch (error) {
      console.error("Error fetching story comments:", error);
    }
  }

  async fetchComment(commentId: number): Promise<Comment | null> {
    // Проверяем, есть ли уже комментарий в кэше
    if (this.commentMap.has(commentId)) {
      return this.commentMap.get(commentId)!;
    }

    try {
      const response = await fetch(`${HN_API}/item/${commentId}.json`);
      const data = await response.json();
      
      if (!data || data.dead) {
        return null;
      }

      const comment = new Comment(
        data.id,
        data.by,
        !data.deleted ? data.text : 'Comment deleted',
        data.time,
        data.kids || []
      );

      this.commentMap.set(commentId, comment);
      return comment;
    } catch (error) {
      console.error(`Error fetching comment ${commentId}:`, error);
      return null;
    }
  }

  async fetchReplies(comment: Comment) {
    if (comment.isLoaded || comment.isLoading) return;

    comment.setLoading(true);
    
    try {
      const replies = await Promise.all(
        comment.kids.map(id => this.fetchComment(id))
      );
      
      comment.setReplies(replies.filter(reply => reply !== null) as Comment[]);
    } catch (error) {
      console.error(`Error fetching replies for comment ${comment.id}:`, error);
      comment.setLoading(false);
    }
  }
}

const commentStore = new CommentStore();
export default commentStore;