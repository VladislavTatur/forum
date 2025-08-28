import { useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import { Post } from '@features/posts/components/Post.tsx';
import { Card } from '@shared/components/Card.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useLazyGetPostByIdQuery } from '@store/api/postsApi.ts';
import { useGetUsersQuery } from '@store/api/userApi.ts';
import { selectLocalPosts } from '@store/selectors/posts.ts';

const PostPage = () => {
  const { id } = useParams();
  const [hasFetched, setHasFetched] = useState(false);
  const localPosts = selectLocalPosts();
  const { data: usersAll } = useGetUsersQuery();
  const localUser = getUserFromStorage();
  const [trigger, { data: postById }] = useLazyGetPostByIdQuery();
  const currentPost = localPosts.find((post) => post.id === Number(id)) || postById;

  useEffect(() => {
    if (!id || hasFetched) return;

    const postId = Number(id);
    const localPost = localPosts.find((post) => post.id === postId);

    if (!localPost) {
      trigger(id).finally(() => setHasFetched(true));
    }
  }, [id, trigger, localPosts, hasFetched]);

  const userName =
    usersAll?.find((user) => user.id === currentPost?.userId)?.name || localUser.name;

  if (!currentPost && !hasFetched) return <Typography>Loading...</Typography>;
  if (!currentPost) return <Typography>There are no posts</Typography>;

  return (
    <Card>
      <Post
        title={currentPost.title}
        body={currentPost.body}
        postId={currentPost.id}
        author={userName}
        userId={currentPost.userId}
        viewType
      />
    </Card>
  );
};

export default PostPage;
