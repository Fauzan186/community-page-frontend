import React from 'react';
import { Box, Typography } from '@mui/material';

interface CommentProps {
  comment: any;
  onReplyClick: () => void;
  isReply: boolean;
}

const Comment: React.FC<CommentProps> = ({ comment, onReplyClick, isReply }) => {
  return (
    <Box sx={{ padding: 2, borderRadius: 2, border: '1px solid #ddd', marginBottom: 1, backgroundColor: isReply ? '#f5f5f5' : '#fff' }}>
      <Typography variant="body2" color="text.primary">
        <strong>{comment.author}</strong>: {comment.body}
      </Typography>
      {!isReply && (
        <Box sx={{ marginTop: 1 }}>
          <button onClick={onReplyClick}>Reply</button>
        </Box>
      )}
    </Box>
  );
};

export default Comment;
