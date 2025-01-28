import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Badge,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

interface Comment {
  id: number;
  body: string;
  author: string;
  replies?: Comment[];
}

interface PostProps {
  title: string;
  content: string;
  author: string;
  imageURL: string;
  onCommentClick: () => void;
  isActive: boolean;
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  imageURL,
  onCommentClick,
  isActive,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null); // Track the comment being replied to

  const handleAddComment = () => {
    if (newComment.trim()) {
      if (replyTo === null) {
        // Add a root comment
        setComments([
          ...comments,
          { id: comments.length + 1, body: newComment, author: 'User', replies: [] },
        ]);
      } else {
        // Add a reply to an existing comment
        const updatedComments = addReply(comments, replyTo, {
          id: Date.now(),
          body: newComment,
          author: 'User',
          replies: [],
        });
        setComments(updatedComments);
      }
      setNewComment('');
      setReplyTo(null);
    }
  };

  const addReply = (
    commentList: Comment[],
    commentId: number,
    reply: Comment
  ): Comment[] => {
    return commentList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      } else if (comment.replies) {
        return {
          ...comment,
          replies: addReply(comment.replies, commentId, reply),
        };
      }
      return comment;
    });
  };

  const renderComments = (commentList: Comment[], level = 0) => {
    return commentList.map((comment) => (
      <Box
        key={comment.id}
        sx={{
          marginLeft: level * 2,
          marginBottom: 1,
          borderLeft: level > 0 ? '1px solid #ccc' : 'none',
          paddingLeft: level > 0 ? 2 : 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
          <Avatar sx={{ width: 24, height: 24 }} />
          <Typography variant="body2" fontWeight="bold" fontSize={12}>
            {comment.author}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ marginBottom: 1 }}>
          {comment.body}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={() => setReplyTo(comment.id)}
        >
          Reply
        </Button>
        {/* Render nested replies */}
        {comment.replies && renderComments(comment.replies, level + 1)}
      </Box>
    ));
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 400,
        margin: 'auto',
        borderRadius: 4,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      {imageURL && (
        <CardMedia component="img" height="200" image={imageURL} alt={title} />
      )}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          By {author}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {content}
        </Typography>
      </CardContent>

      {/* Comment Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
          padding: 2,
          borderTop: '1px solid #eee',
        }}
      >
        <IconButton onClick={onCommentClick}>
          <Badge badgeContent={comments.length} color="primary">
            <ChatBubbleOutline />
          </Badge>
        </IconButton>
      </Box>

      {isActive && (
        <Box
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            padding: 2,
            borderTop: '1px solid #ddd',
            background: '#f9f9f9',
          }}
        >
          {renderComments(comments)}

          <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder={
                replyTo
                  ? `Replying to comment #${replyTo}`
                  : 'Add a comment...'
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button variant="contained" size="small" onClick={handleAddComment}>
              Post
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Post;
