import { useState } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { Comment } from './Comment.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { onPressEnter } from '@shared/utils/onPressEnter.ts';
import { useGetPostCommentsQuery } from '@store/api/postsApi.ts';
import { selectComments } from '@store/selectors/comments.ts';
import { addComment } from '@store/slices/comments/commentsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type CommentsProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  postId: number;
};

export const Comments = ({ isOpen, setIsOpen, postId }: CommentsProps) => {
  const [commentText, setCommentText] = useState('');
  const user = getUserFromStorage();
  const { data: postComments } = useGetPostCommentsQuery(postId);
  const dispatch = useAppDispatch();
  const localComments = selectComments();
  const localCommentsToPost = localComments.filter((comment) => comment.postId === postId);
  const comments = postComments ? [...localCommentsToPost, ...postComments] : [];

  const handleClose = () => setIsOpen(false);
  const handleSubmit = () => {
    if (user) {
      dispatch(
        addComment({
          postId: postId,
          id: new Date().getTime(),
          name: user?.name,
          email: user?.email,
          body: commentText,
        })
      );
    }
    setCommentText('');
  };

  const onPressEnterHandler = onPressEnter(handleSubmit, commentText);

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Комментарии:
          </Typography>
          <TextField
            multiline
            fullWidth
            minRows={1}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Напишите комментарий..."
            sx={{ mt: 2 }}
            onKeyDown={onPressEnterHandler}
          />
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSubmit}
            disabled={!commentText.trim()}
          >
            Отправить
          </Button>
          <Box sx={{ mt: 2 }}>
            {comments && comments.map((p) => <Comment key={p.id} body={p.body} email={p.email} />)}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  maxHeight: '90vh',
  backgroundColor: 'rgba(211,211,211)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};
