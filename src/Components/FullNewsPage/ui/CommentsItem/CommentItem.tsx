import { observer } from "mobx-react-lite";
import commentStore from "../../../../stores/AppStore/CommentStore";
import Comment from "../../../../models/Comment";
import parse from "html-react-parser";
import { Flex, Typography } from "antd";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
}

const CommentItem = observer(({ comment, depth = 0 }: CommentItemProps) => {
  
  const handleLoadReplies = () => {
    commentStore.fetchReplies(comment);
  };

  const date = new Date(comment?.time * 1000).toString()

  return (
    <Flex
      vertical
      align="start" 
      style={{ 
        marginLeft: "10px", 
        marginTop: "10px",
        borderLeft: depth > 0 ? "2px solid #ddd" : "none",
        padding: depth > 0 ? "10px" : "0",
        backgroundColor: `#888888${10 + Math.min(depth, 10) * 5}`,
        width: "auto"
      }}
    >
      <Flex
      align="start"
      vertical 
      onClick={handleLoadReplies}
       style={{ 
        padding: "10px", 
        borderRadius: "5px"
      }}>
        <Flex align="start" wrap style={{ color: "#666", fontSize: "0.8rem", marginBottom: "5px" }}>
          <Typography.Text strong>{comment.by}</Typography.Text>
          <Typography.Text strong>{date}</Typography.Text>
        </Flex>
        
        <Flex vertical align="start" style={{ textAlign: "left", lineHeight: "1.5", color: '#111' }}>
          {parse(comment.text || "")}
        </Flex>
        
        {comment.kids.length > 0 && !comment.isLoaded && !comment.isLoading && (
          <Typography.Text strong
          style={{ 
            color: "#333"
          }}
          >
            {comment.kids.length} {comment.kids.length === 1 ? "reply" : "replies"}
          </Typography.Text>
        )}
        {comment.isLoading && (
          <Flex vertical align="start" style={{ color: "#666", fontSize: "0.8rem", padding: "5px 0" }}>
            Loading replies...
          </Flex>
        )}
      </Flex>
      
      {comment.replies.map((reply) => (
        <CommentItem 
          key={reply.id} 
          comment={reply} 
          depth={depth + 1} 
        />
      ))}
    </Flex>
  );
});

export default CommentItem;