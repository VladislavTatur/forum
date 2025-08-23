import { useEffect, useState } from 'react';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { IconButton } from '@mui/material';

import { useGetPostCommentsQuery } from '@store/api/postsApi.ts';
import { selectComments, selectServerCommentsCount } from '@store/selectors/comments.ts';
import { selectPosts } from '@store/selectors/posts.ts';
import { setCommentsCount } from '@store/slices/comments/commentsSlice.ts';
import { toggleDislike, toggleFavorite, toggleLike } from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

import { Comments } from '../../comments/Comments.tsx';

export const PostActions = ({ postId }: { postId: number }) => {
  const dispatch = useAppDispatch();
  const { data: postComments } = useGetPostCommentsQuery(postId);
  const posts = selectPosts();
  const localComments = selectComments();
  const serverCommentsCount = selectServerCommentsCount();
  const [open, setOpen] = useState(false);
  const serverCount = serverCommentsCount.filter((comment) => comment.postId === postId);

  const handleClick = (type: 'favorite' | 'like' | 'dislike') => {
    switch (type) {
      case 'favorite':
        return dispatch(toggleFavorite(postId));
      case 'like':
        return dispatch(toggleLike(postId));
      case 'dislike':
        return dispatch(toggleDislike(postId));
      default:
        return null;
    }
  };

  useEffect(() => {
    if (postComments) {
      dispatch(setCommentsCount({ postId, count: postComments?.length }));
    }
  }, [dispatch, postComments, postId]);

  const post = posts.reactions.find((post) => post.idPost === postId);

  const localCount = localComments.filter((comment) => comment.postId === postId).length ?? 0;
  const sumCount = serverCount[0]?.count + localCount;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '5px' }}>
        <IconButton color="inherit" onClick={() => setOpen((prev) => !prev)}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <p>{sumCount || 0}</p>
        {open && <Comments isOpen={open} setIsOpen={setOpen} postId={postId} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          color={post?.isFavorite ? 'success' : 'inherit'}
          onClick={() => handleClick('favorite')}
        >
          <BookmarkBorderIcon />
        </IconButton>
        <IconButton color={post?.like ? 'success' : 'inherit'} onClick={() => handleClick('like')}>
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton
          color={post?.dislike ? 'error' : 'inherit'}
          onClick={() => handleClick('dislike')}
        >
          <ThumbDownOffAltIcon />
        </IconButton>
      </div>
    </div>
  );
};
