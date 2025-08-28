import { ChangeEvent } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { Post } from '@features/posts/components/Post.tsx';
import { PostResponse } from '@shared/types/postsTypes.ts';
import { UserType } from '@shared/types/usersType.ts';

type PostsListProps = {
  posts: PostResponse[];
  allUsers?: UserType[];
  count: number;
  page: number;
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
};

export const PostsList = ({ posts, allUsers, page, onPageChange, count }: PostsListProps) => {
  return (
    <Stack>
      {!!posts.length && (
        <>
          {posts?.map((post) => {
            const user = allUsers?.find((user) => user.id === post.userId);
            return (
              <Post
                key={post.id}
                title={post.title}
                body={post.body}
                author={user?.name}
                postId={post.id}
                userId={post.userId}
              />
            );
          })}
          <Pagination
            count={count}
            page={page}
            onChange={onPageChange}
            color="primary"
            sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}
          />
        </>
      )}
    </Stack>
  );
};
