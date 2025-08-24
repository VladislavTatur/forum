import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Stack, Typography } from '@mui/material';

import { PostActions } from './PoastActions.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { deletePost } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type PostType = {
  title: string;
  body: string;
  author?: string;
  postId: number;
  userId?: number;
};

export const Post = ({ title, body, author, postId, userId }: PostType) => {
  const dispatch = useAppDispatch();
  const myProfile = getUserFromStorage();
  const myPost = myProfile.id === userId;
  const handleDeleteMyPost = () => {
    if (myPost) {
      dispatch(deletePost(postId));
    }
  };

  const handleViewingPost = () => {
    window.open(`/posts/${postId}`, '_blank');
  };

  return (
    <Stack
      sx={{
        border: '1px solid #e0e0e0',
        p: 3,
        borderRadius: 1,
        mb: 2,
        bgcolor: 'background.paper',
      }}
    >
      {author && (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <AccountCircleIcon
              sx={{
                width: 35,
                height: 35,
                color: 'primary.main',
              }}
            />
            <Typography variant="h6" component="h3" color="primary">
              {author}
            </Typography>
          </Stack>
          <PostActions postId={postId} />
        </Stack>
      )}

      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack spacing={1} flex={1} sx={{ cursor: 'pointer' }} onClick={handleViewingPost}>
          <Typography variant="subtitle1" component="p" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              pl: 2,
              color: 'text.secondary',
            }}
          >
            {body}
          </Typography>
        </Stack>

        <Stack justifyContent="center">
          <IconButton onClick={handleDeleteMyPost} color="error">
            {myPost && <DeleteOutlineIcon sx={{ width: 30, height: 30 }} />}
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
