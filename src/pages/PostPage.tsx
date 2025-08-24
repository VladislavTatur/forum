import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Post } from '@features/posts/components/Post.tsx';
import { Card } from '@shared/components/Card.tsx';
import { useLazyGetPostByIdQuery } from '@store/api/postsApi.ts';

export const PostPage = () => {
  const { id } = useParams();

  const [trigger, { data: postById }] = useLazyGetPostByIdQuery();

  useEffect(() => {
    if (!id) return;
    trigger(id);
  }, [id, trigger]);
  if (!postById) return null;
  return (
    <Card>
      <Post title={postById?.title} body={postById?.body} postId={postById?.id} author={'dfsd'} />
    </Card>
  );
};
