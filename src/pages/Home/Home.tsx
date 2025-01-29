import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import Post from '../../components/Post/Post';
import { mockPosts } from '../../utils/mockData';


interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  imageURL: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>(mockPosts);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPost, setNewPost] = useState<Omit<PostData, 'id'>>({
    title: '',
    content: '',
    author: 'User',
    imageURL: '',
  });

  const comments = useSelector((state: any) => state.comments.comments);
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
      { id: posts.length + 1, ...newPost, imageURL: newPost.imageURL || 'https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI' },
    ];
    setPosts(updatedPosts);
    handleDialogClose();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" marginBottom={6} gutterBottom textAlign="center" fontWeight={600}>
      Community Post List
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {posts.map((post) => (
          <Box key={post.id} width={{ xs: '100%', md: '30%' }}>
            <Post
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author}
              imageURL={post.imageURL}
              commentCount={comments.filter((c:any) => c.postId === post.id).length}
              onCommentClick={() => setActivePostId(activePostId === post.id ? null : post.id)}
              isActive={activePostId === post.id}
            />
          </Box>
        ))}
      </Box>

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
