import React from 'react';
import { Box, Typography, Avatar, Card, CardContent, IconButton } from '@mui/material';
import { Reply } from '@mui/icons-material';

interface CommentProps {
  comment: {
    id: number;
    body: string;
    author: string;
    replies?: any[];
  };
  isReply?: boolean;
  onReplyClick?: () => void;
}

const Comment: React.FC<CommentProps> = ({ comment, isReply, onReplyClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: 2,
        marginLeft: isReply ? 4 : 0,
      }}
    >
      <Avatar
        sx={{
          bgcolor: 'primary.main',
          marginRight: 2,
        }}
      >
        {comment.author[0].toUpperCase()}
      </Avatar>
      <Card
        sx={{
          flex: 1,
          backgroundColor: isReply ? '#f9f9f9' : 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
          >
            {comment.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {comment.body}
          </Typography>
        </CardContent>
        {!isReply && onReplyClick && (
          <Box sx={{ paddingLeft: 2, paddingBottom: 1 }}>
            <IconButton onClick={onReplyClick}>
              <Reply fontSize="small" />
            </IconButton>
            <Typography variant="body2" sx={{ display: 'inline', cursor: 'pointer' }}>
              Reply
            </Typography>
          </Box>
        )}
      </Card>
      {comment.replies &&
        comment.replies.map((reply) => (
          <Comment key={reply.id} comment={reply} isReply={true} />
        ))}
    </Box>
  );
};

export default Comment;
