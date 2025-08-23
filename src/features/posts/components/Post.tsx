import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';

import { PostActions } from './PoastActions.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { deletePost } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';
type PostType = { title: string; body: string; author?: string; postId: number; userId?: number };
export const Post = ({ title, body, author, postId, userId }: PostType) => {
  const dispatch = useAppDispatch();
  const myProfile = getUserFromStorage();
  const myPost = myProfile.id === userId;
  const handleDeleteMyPost = () => {
    if (myPost) {
      dispatch(deletePost(postId));
    }
  };
  return (
    <Stack
      sx={{
        border: '1px solid grey',
        borderBottom: '0',
        p: '20px',
        borderRadius: '5px',
        '&:last-child': { borderBottom: '1px solid grey' },
      }}
    >
      {' '}
      {author && (
        <Box
          style={{
            display: 'flex',
            marginTop: '10px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {' '}
          <Stack flexDirection="row" alignItems="center" gap={2}>
            {' '}
            <AccountCircleIcon sx={{ width: '35px', height: '35px', alignItems: 'center' }} />{' '}
            <h3>{author}</h3>{' '}
          </Stack>{' '}
          <PostActions postId={postId} />{' '}
        </Box>
      )}{' '}
      <Stack flexDirection="row" justifyContent="space-between" gap={4}>
        {' '}
        <Box>
          {' '}
          <p style={{ fontWeight: 500 }}>{title}</p>{' '}
          <p style={{ paddingLeft: '15px' }}>{body}</p>{' '}
        </Box>{' '}
        <Box>
          {' '}
          <IconButton onClick={handleDeleteMyPost} color="error">
            {' '}
            {myPost && <DeleteOutlineIcon width={35} height={35} />}{' '}
          </IconButton>{' '}
        </Box>{' '}
      </Stack>{' '}
    </Stack>
  );
};
