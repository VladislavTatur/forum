import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { PostActions } from './PoastActions.tsx';
import { POST_BODY_PREVIEW_LIMIT } from '@features/posts/constants';
import { ROUTES } from '@shared/constants/links.ts';

type PostType = {
  title: string;
  body: string;
  postId: number;
  author?: string;
  userId?: number;
  viewType?: boolean;
};

export const Post = ({ title, body, author, postId, userId, viewType }: PostType) => {
  const navigate = useNavigate();

  const handleOpenPost = () => {
    if (!viewType) {
      navigate(ROUTES.post.replace(':id', String(postId)));
    }
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {author && (
            <>
              <AccountCircleIcon sx={{ width: 35, height: 35, color: 'primary.main' }} />
              <Typography variant="h6" component="h3" color="primary">
                {author}
              </Typography>
            </>
          )}
        </Stack>
        <Stack>
          <PostActions postId={postId} userId={userId} />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <Stack
          spacing={1}
          flex={1}
          sx={[!viewType && { cursor: 'pointer' }]}
          onClick={handleOpenPost}
        >
          <Typography variant="subtitle1" component="p" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="body1" component="p" sx={{ color: 'text.secondary' }}>
            {!viewType && body.length > POST_BODY_PREVIEW_LIMIT
              ? `${body.slice(0, POST_BODY_PREVIEW_LIMIT)}…`
              : body}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
