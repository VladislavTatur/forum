import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';

import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useCreatePostMutation } from '@store/api/postsApi.ts';
import { addPost } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type CustomModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type FormValues = {
  title: string;
  body: string;
};

export const CreatePostModal = ({ isOpen, setIsOpen }: CustomModalProps) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { title: '', body: '' },
  });

  const [createPost] = useCreatePostMutation();
  const user = getUserFromStorage();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (!user?.id) return;

      const res = await createPost({
        userId: user.id,
        title: data.title,
        body: data.body,
      });

      if (res.data) {
        dispatch(addPost({ ...res.data, id: new Date().getTime() }));
        handleClose();
      } else {
        console.error('Error: the post was not created');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Creating a Post</DialogTitle>
      <DialogContent dividers>
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Title"
              placeholder="Write the title..."
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          rules={{ required: 'Post text is required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              multiline
              minRows={3}
              label="Post"
              placeholder="Write a post..."
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};
