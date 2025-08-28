import { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import UserField from './UserField.tsx';
import { Post } from '@features/posts/components/Post.tsx';
import { UserType } from '@shared/types/usersType.ts';
import { useLazyGetPostsUserQuery } from '@store/api/userApi.ts';
import { selectLocalPosts } from '@store/selectors/posts.ts';

type UserProps = {
  user: UserType;
  myProfile?: boolean;
};

export const UserCard = ({ user, myProfile }: UserProps) => {
  const [triggerGetPosts, { data: userPosts }] = useLazyGetPostsUserQuery();
  const localPosts = selectLocalPosts();
  const [isShowPosts, setIsShowPosts] = useState(false);

  const myPosts = localPosts.filter((post) => post.userId === user.id);

  const handleGetPosts = () => {
    triggerGetPosts(user.id);
    setIsShowPosts(true);
  };

  const renderPosts = (posts: typeof myPosts, title?: string) => (
    <Box mt={2}>
      {title && (
        <Typography mb={2} fontWeight="bold">
          {title}
        </Typography>
      )}
      {posts.length > 0
        ? posts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              body={post.body}
              postId={post.id}
              userId={post.userId}
            />
          ))
        : 'There are no posts yet'}
    </Box>
  );

  return (
    <Box
      p={2}
      mb={2}
      sx={{
        border: '1px solid grey',
        borderRadius: '8px',
        backgroundColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <AccountCircleIcon sx={{ width: 40, height: 40, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="bold" color="primary">
          {user.name}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={4}
        alignItems="flex-start"
        divider={<Divider orientation="vertical" flexItem />}
        mb={2}
      >
        <UserField label="Email" value={user.email} />
        <UserField label="Website" value={user.website} isLink />
        <UserField label="City" value={user.address.city} />
        <UserField label="Company" value={user.company.name} />
        <UserField label="Phone" value={user.phone} />
      </Stack>

      {!myProfile && (
        <Stack direction="row" gap={2} mb={2}>
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            onClick={handleGetPosts}
            disabled={isShowPosts}
          >
            User posts
          </Button>
          {isShowPosts && (
            <Button onClick={() => setIsShowPosts(false)} sx={{ textTransform: 'none' }}>
              Hide
            </Button>
          )}
        </Stack>
      )}

      {isShowPosts && userPosts && renderPosts(userPosts)}
      {myProfile && renderPosts(myPosts, 'My posts:')}
    </Box>
  );
};
