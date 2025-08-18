import {IconButton} from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {useGetPostCommentsQuery} from "../../../store/api/postsApi.ts";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {toggleDislike, toggleFavorite, toggleLike} from "../../../store/slices/posts/postsSlice.ts";
import {useState} from "react";
import {Comments} from "../comments/Comments.tsx";


export const PostActions = ({postId}: { postId: number }) => {
    const {data: postComments} = useGetPostCommentsQuery(postId)
    const posts = useAppSelector(state => state.favoritePosts)
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleClick = (type: 'favorite' | 'like' | 'dislike') => {
        switch (type) {
            case 'favorite':
                return dispatch(toggleFavorite(postId));
            case 'like':
                return dispatch(toggleLike(postId));
            case 'dislike':
                return dispatch(toggleDislike(postId));
            default:
                return null
        }
    }

    const post = posts.find(post => post.idPost === postId);

    const count = postComments?.length ?? 0

    return (
        <div style={{display: "flex", alignItems: 'center', gap: '10px'}}>
            <div style={{display: "flex", gap: '5px'}}>
                <IconButton color='inherit' onClick={()=> setOpen(prev => !prev)}>
                    <ChatBubbleOutlineIcon/>
                </IconButton>
                <p>{count}</p>
                {open && <Comments isOpen={open} setIsOpen={setOpen} postId={postId} />}
            </div>
            <div style={{display: "flex", alignItems: 'center'}}>
                <IconButton color={post?.isFavorite ? 'success' : 'inherit'}
                            onClick={() => handleClick('favorite')}>
                    <BookmarkBorderIcon/>
                </IconButton>
                <IconButton  color={post?.like ? 'success' : 'inherit'}  onClick={() => handleClick('like')}>
                    <ThumbUpOffAltIcon/>
                </IconButton>
                <IconButton  color={post?.dislike ? 'error' : 'inherit'} onClick={() => handleClick('dislike')}>
                    <ThumbDownOffAltIcon/>
                </IconButton>
            </div>
        </div>
    )
}