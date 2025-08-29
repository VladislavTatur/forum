import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Comment } from './Comment.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostCommentsQuery } from '@store/api/postsApi.ts';
import { selectComments } from '@store/selectors/comments.ts';
import { selectIsAuth } from '@store/selectors/users.ts';
import { addComment } from '@store/slices/comments/commentsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type CommentsProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  postId: number;
};

export const Comments = ({ isOpen, setIsOpen, postId }: CommentsProps) => {
  const isAuth = selectIsAuth();
  const [commentText, setCommentText] = useState('');
  const user = getUserFromStorage();
  const { data: postComments } = useGetPostCommentsQuery(postId);
  const dispatch = useAppDispatch();
  const localComments = selectComments();
  const localCommentsToPost = localComments.filter((comment) => comment.postId === postId);
  const comments = postComments ? [...localCommentsToPost, ...postComments] : [];

  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    if (!isAuth) return;

    if (user) {
      dispatch(
        addComment({
          postId: postId,
          id: new Date().getTime(),
          name: user.name,
          email: user.email,
          body: commentText,
        })
      );
    }
    setCommentText('');
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          maxHeight: '80vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid #ddd' }}>
          <Typography variant="h6">Comments</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {comments.length > 0 ? (
            comments.map((p) => <Comment key={p.id} body={p.body} email={p.email} />)
          ) : (
            <Typography color="text.secondary">No comments yet</Typography>
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            placeholder={isAuth ? 'Write a comment...' : 'You must be logged in to comment'}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={!isAuth}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isAuth || !commentText.trim()}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
