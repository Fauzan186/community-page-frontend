import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import Post from '../../components/Post/Post';
import Comment from '../../components/Comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../features/posts/postsSlice';
import { setComments } from '../../features/comments/commentsSlice';
import { mockPosts } from '../../utils/mockData';
import { mockComments } from '../../utils/mockComments';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.posts);
  const comments = useSelector((state: any) => state.comments);

  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(setPosts(mockPosts));
    dispatch(setComments(mockComments));
  }, [dispatch]);

  const handlePostComment = (postId: number) => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        postId,
        body: commentText,
        author: 'User',
      };
      dispatch(setComments([...comments, newComment]));
      setCommentText('');
    }
  };

  const handlePostReply = (commentId: number) => {
    if (replyText.trim()) {
      const newReply = {
        id: comments.length + 1,
        postId: comments.find((comment: any) => comment.id === commentId)?.postId || 0,
        body: replyText,
        author: 'User',
        parentId: commentId,
      };
      dispatch(setComments([...comments, newReply]));
      setReplyText('');
      setReplyToCommentId(null); // Reset reply
    }
  };

  // Filter comments for a post and group replies under the relevant comment
  const getCommentThreads = (postId: number) => {
    const postComments = comments.filter(
      (comment: any) => comment.postId === postId && !comment.parentId
    );

    return postComments.map((comment: any) => ({
      ...comment,
      replies: comments.filter(
        (reply: any) => reply.parentId === comment.id
      ),
    }));
  };

  // Count comments for each post
  const countComments = (postId: number) => {
    return comments.filter((comment: any) => comment.postId === postId).length;
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Community Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post: any) => (
          <Grid item xs={12} md={6} key={post.id}>
            <Post
              title={post.title}
              content={post.content}
              author={post.author}
              imageURL={post.imageURL}
              postId={post.id}
              commentCount={countComments(post.id)} // Pass comment count here
              onCommentClick={() => setActivePostId(post.id)} // Set active post ID for comment/reply
              isActive={activePostId === post.id} // Check if this post is active for commenting/replying
            />
            {activePostId === post.id && (
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Add a comment"
                  variant="outlined"
                  fullWidth
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlePostComment(post.id)}
                  sx={{ marginTop: 1 }}
                >
                  Post Comment
                </Button>

                <Box sx={{ marginTop: 2 }}>
                  {getCommentThreads(post.id).map((comment: any) => (
                    <Box key={comment.id} sx={{ marginTop: 2 }}>
                      <Comment
                        comment={comment}
                        onReplyClick={() => setReplyToCommentId(comment.id)} // Set reply target comment ID
                        isReply={false}
                      />
                      {comment.replies.map((reply: any) => (
                        <Box key={reply.id} sx={{ marginTop: 2 }}>
                          <Comment
                            comment={reply}
                            onReplyClick={() => setReplyToCommentId(reply.id)}
                            isReply={true}
                          />
                        </Box>
                      ))}
                    </Box>
                  ))}

                  {replyToCommentId && (
                    <Box sx={{ marginTop: 2 }}>
                      <TextField
                        label="Write a reply..."
                        variant="outlined"
                        fullWidth
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePostReply(replyToCommentId)}
                        sx={{ marginTop: 1 }}
                      >
                        Post Reply
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
