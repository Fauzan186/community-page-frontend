import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';

interface PostProps {
  title: string;
  content: string;
  author: string;
  imageURL: string;
  postId: number;
  commentCount: number;
  onCommentClick: () => void;
  isActive: boolean;
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  author,
  imageURL,
  postId,
  commentCount,
  onCommentClick,
  isActive,
}) => {
  return (
    <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2, boxShadow: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
        By {author}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {content}
      </Typography>
      {imageURL && (
        <Box sx={{ marginTop: 2 }}>
          <img src={imageURL} alt={title} style={{ width: '100%', borderRadius: 8 }} />
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={onCommentClick}>
            <ChatBubbleOutline />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {commentCount} Comments
          </Typography>
        </Box>
      </Box>

      {isActive && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="text.primary">
            Comments Section
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Post;
