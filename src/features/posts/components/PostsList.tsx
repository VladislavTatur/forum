import InfiniteScroll from 'react-infinite-scroll-component';

import { Post } from '@features/posts/components/Post.tsx';
import { PostResponse } from '@shared/types/postsTypes.ts';
import { UserType } from '@shared/types/usersType.ts';

type PostsListProps = {
  posts: PostResponse[];
  loadMore?: () => void;
  hasMore?: boolean;
  allUsers?: UserType[];
};

export const PostsList = ({ posts, loadMore, hasMore, allUsers }: PostsListProps) => {
  return (
    <InfiniteScroll
      next={loadMore || (() => {})}
      hasMore={hasMore ?? false}
      loader={<h4>Loading...</h4>}
      dataLength={posts.length}
    >
      {posts &&
        posts.map((post) => {
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
    </InfiniteScroll>
  );
};
