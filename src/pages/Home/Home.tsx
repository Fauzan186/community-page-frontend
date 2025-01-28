import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../components/Post/Post';
import { mockPosts } from '../../utils/mockData';
import { addComment } from '../../features/comments/commentsSlice';

interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  imageURL: string;
}

interface CommentData {
  id: number;
  postId: number;
  body: string;
  author: string;
  parentId?: number;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState<PostData>({
    title: '',
    content: '',
    author: 'User',
    imageURL: '',
  });

  const dispatch = useDispatch();
  const comments = useSelector((state: any) => state.comments.comments); // Access comments from Redux

  const handlePostComment = (postId: number, body: string, parentId?: number) => {
    const newComment: CommentData = {
      id: comments.length + 1,
      postId,
      body,
      author: 'User',
      parentId,
    };
    dispatch(addComment(newComment)); // Use Redux to manage comments
  };

  const getCommentThreads = (postId: number) => {
    const postComments = comments.filter(
      (comment) => comment.postId === postId && !comment.parentId
    );

    return postComments.map((comment) => ({
      ...comment,
      replies: comments.filter((reply) => reply.parentId === comment.id),
    }));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewPost({
      title: '',
      content: '',
      author: 'User',
      imageURL: '',
    });
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmitPost = () => {
    const updatedPosts = [
      ...posts,
      { id: posts.length + 1, ...newPost, imageURL: newPost.imageURL || 'https://via.placeholder.com/150' },
    ];
    setPosts(updatedPosts);
    handleDialogClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center" fontWeight={600}>
        Community Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} md={4} key={post.id}>
            <Post
              {...post}
              commentCount={comments.filter((c) => c.postId === post.id).length}
              onCommentClick={() =>
                setActivePostId(activePostId === post.id ? null : post.id)
              }
              isActive={activePostId === post.id}
            />
            {activePostId === post.id && (
              <Box sx={{ marginTop: 2 }}>
                {getCommentThreads(post.id).map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    isReply={false}
                    onReplyClick={() => handlePostComment(post.id, 'Replying to comment', comment.id)}
                  />
                ))}
              </Box>
            )}
          </Grid>
        ))}
      </Grid>

      {/* Add New Post Button */}
      <IconButton
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '50%',
          padding: 3,
        }}
        onClick={handleDialogOpen}
      >
        <AddCircle fontSize="large" />
      </IconButton>

      {/* New Post Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={newPost.title}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            required
          />
          <TextField
            name="imageURL"
            label="Image URL"
            fullWidth
            value={newPost.imageURL}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
          <Button onClick={handleDialogClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmitPost} color="primary" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
