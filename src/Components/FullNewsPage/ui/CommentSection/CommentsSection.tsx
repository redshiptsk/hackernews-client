import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import commentStore from "../../../../stores/AppStore/CommentStore";
import CommentItem from "../CommentsItem/CommentItem";
import { Button, Flex, Typography } from "antd";

interface CommentSectionProps {
  storyId: number;
}

export const CommentSection = observer(({ storyId }: CommentSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComments = async () => {
      setIsLoading(true);
      await commentStore.fetchStoryComments(storyId);
      setIsLoading(false);
    };

  useEffect(() => {
    handleLoadComments();
  }, [storyId]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (commentStore.comments.length === 0) {
    return <div>No comments yet</div>;
  }

  return (
    <Flex vertical align="start" style={{ alignSelf: "start", margin: "0 auto" }}>
      <Typography.Title level={2} style={{ marginBottom: "20px", color:"#333" }}>Comments</Typography.Title>
      <Button type="primary" onClick={handleLoadComments}>Refresh Comments</Button>    
      {commentStore.comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </Flex>
  );
});