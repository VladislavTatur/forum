import { useEffect, useState } from 'react';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { useGetPostCommentsQuery } from '@store/api/postsApi.ts';
import { selectComments, selectServerCommentsCount } from '@store/selectors/comments.ts';
import { selectPosts } from '@store/selectors/posts.ts';
import { selectIsAuth } from '@store/selectors/users.ts';
import { setCommentsCount } from '@store/slices/comments/commentsSlice.ts';
import {
  deletePost,
  toggleDislike,
  toggleFavorite,
  toggleLike,
} from '@store/slices/posts/postsSlice.ts';
import { useAppDispatch } from '@store/store.ts';

import { Comments } from '../../comments/Comments.tsx';

const actionsMap = {
  favorite: toggleFavorite,
  like: toggleLike,
  dislike: toggleDislike,
};

type PostActionsProps = {
  postId: number;
  userId?: number;
};

export const PostActions = ({ postId, userId }: PostActionsProps) => {
  const dispatch = useAppDispatch();
  const posts = selectPosts();
  const localComments = selectComments();
  const serverCommentsCount = selectServerCommentsCount();
  const myProfile = getUserFromStorage();
  const isAuth = selectIsAuth();

  const [openComments, setOpenComments] = useState(false);

  const { data: postComments } = useGetPostCommentsQuery(postId);
  const myPost = myProfile?.id === userId;
  const serverCount = serverCommentsCount.filter((comment) => comment.postId === postId);
  const post = posts.reactions.find((post) => post.idPost === postId);
  const localCount = localComments.filter((comment) => comment.postId === postId).length ?? 0;
  const sumCount = (serverCount[0]?.count ?? 0) + localCount;

  const handleClick = (type: keyof typeof actionsMap) => {
    if (!isAuth) return;
    dispatch(actionsMap[type](postId));
  };

  const handleDeleteMyPost = () => {
    if (myPost) {
      dispatch(deletePost(postId));
    }
  };

  useEffect(() => {
    if (postComments) {
      dispatch(setCommentsCount({ postId, count: postComments.length }));
    }
  }, [dispatch, postComments, postId]);

  return (
    <Stack direction="row" spacing={1}>
      {myPost && (
        <IconButton onClick={handleDeleteMyPost} color="error" disabled={!isAuth}>
          <DeleteOutlineIcon />
        </IconButton>
      )}

      <IconButton color="inherit" onClick={() => setOpenComments((prev) => !prev)}>
        <Badge badgeContent={sumCount || 0} color="primary">
          <ChatBubbleOutlineIcon />
        </Badge>
      </IconButton>

      <Comments isOpen={openComments} setIsOpen={setOpenComments} postId={postId} />

      <IconButton
        color={post?.isFavorite ? 'success' : 'inherit'}
        onClick={() => handleClick('favorite')}
        disabled={!isAuth}
      >
        <BookmarkBorderIcon />
      </IconButton>

      <IconButton
        color={post?.like ? 'success' : 'inherit'}
        onClick={() => handleClick('like')}
        disabled={!isAuth}
      >
        <ThumbUpOffAltIcon />
      </IconButton>

      <IconButton
        color={post?.dislike ? 'error' : 'inherit'}
        onClick={() => handleClick('dislike')}
        disabled={!isAuth}
      >
        <ThumbDownOffAltIcon />
      </IconButton>
    </Stack>
  );
};
