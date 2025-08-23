import { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Link, Stack, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';

import { Post } from '@features/posts/components/Post.tsx';
import { UserType } from '@shared/types/usersType.ts';
import { useLazyGetPostsUserQuery } from '@store/api/userApi.ts';
import { selectLocalPosts } from '@store/selectors/posts.ts';

type UserProps = {
  user: UserType;
  myProfile?: boolean;
};

export const User = ({ user, myProfile }: UserProps) => {
  const [triggerGetPosts, { data: userPosts }] = useLazyGetPostsUserQuery();
  const localPosts = selectLocalPosts();
  const [isShowPosts, setShowPosts] = useState(false);

  const myPosts = localPosts.filter((post) => post.userId === user.id);

  const handleGetPosts = async () => {
    try {
      triggerGetPosts(user.id);
      setShowPosts(true);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Stack>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            Website
          </Typography>
          <Link href={`https://${user.website}`} target="_blank" rel="noopener" underline="hover">
            {user.website}
          </Link>
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            City
          </Typography>
          <Typography variant="body2">{user.address.city}</Typography>
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            Company
          </Typography>
          <Typography variant="body2">{user.company.name}</Typography>
        </Stack>

        <Stack>
          <Typography variant="body2" color="text.secondary">
            Phone
          </Typography>
          <Typography variant="body2">{user.phone}</Typography>
        </Stack>
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
            <Button onClick={() => setShowPosts(false)} sx={{ textTransform: 'none' }}>
              Hide
            </Button>
          )}
        </Stack>
      )}

      {isShowPosts &&
        userPosts?.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} postId={post.id} />
        ))}

      {myProfile && (
        <Box mt={2}>
          <Typography mb={2} fontWeight="bold">
            My posts:
          </Typography>
          {myPosts.length > 0
            ? myPosts.map((post) => (
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
      )}
    </Box>
  );
};
