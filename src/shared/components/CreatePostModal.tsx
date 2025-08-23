import { useState } from 'react';

import { Box, Button, Modal, TextField, Typography } from '@mui/material';

import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { onPressEnter } from '@shared/utils/onPressEnter.ts';
import { useCreatePostMutation } from '@store/api/postsApi.ts';
import { addPost } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type CustomModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const CreatePostModal = ({ isOpen, setIsOpen }: CustomModalProps) => {
  const [postText, setPostText] = useState('');
  const [titleText, setTitleText] = useState('');
  const [createPost] = useCreatePostMutation();
  const user = getUserFromStorage();

  const dispatch = useAppDispatch();

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async () => {
    try {
      if (user?.id) {
        const res = await createPost({
          userId: user.id,
          title: titleText,
          body: postText,
        });
        if (res.data) {
          dispatch(addPost({ ...res.data, id: new Date().getTime() }));
          setIsOpen(false);
          setPostText('');
          setTitleText('');
        } else {
          console.error('Ошибка: post не был создан');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPressEnterHandler = onPressEnter(handleSubmit, postText);
  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Создание поста
          </Typography>
          <TextField
            multiline
            fullWidth
            minRows={1}
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            placeholder="Напишите заголовок..."
            sx={{ mt: 2 }}
            onKeyDown={onPressEnterHandler}
          />
          <TextField
            multiline
            fullWidth
            minRows={1}
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Напишите пост..."
            sx={{ mt: 2 }}
            onKeyDown={onPressEnterHandler}
          />
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSubmit}
            disabled={!postText.trim() || !titleText.trim()}
          >
            Отправить
          </Button>
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
  bgcolor: 'rgba(211,211,211)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};
