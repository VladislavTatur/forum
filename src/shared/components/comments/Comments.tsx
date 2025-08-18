import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useGetPostCommentsQuery} from "../../../store/api/postsApi.ts";
import {Comment} from "./Comment.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/store.ts";
import {addComment} from "../../../store/slices/comments/commentsSlice.ts";

type CommentsProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    postId: number;
}

export const Comments = ({isOpen, setIsOpen, postId}: CommentsProps) => {
    const [commentText, setCommentText] = useState<string>('');
    const handleClose = () => setIsOpen(false);
    const dispatch = useAppDispatch()

    const {data: postComments} = useGetPostCommentsQuery(postId);
    const comments = useAppSelector(state => state.comments.data)
    console.log(comments)

    useEffect(() => {
        if (postComments) {
            dispatch(addComment(postComments));
        }
    }, [postComments, dispatch])

    return (
        <>
            <Modal
                open={isOpen}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        Комментарии:
                    </Typography>
                    <TextField
                        fullWidth
                        minRows={1}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Напишите комментарий..."
                        sx={{mt: 2}}
                    />
                    <Button sx={{mt: 2}} variant='contained'>Отправить</Button>
                    <Box sx={{mt: 2}}>
                        {comments && comments.map(p => <Comment key={p.id} body={p.body} name={p.name}
                        />)}
                    </Box>
                </Box>
            </Modal>
        </>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    maxHeight: '90vh',
    bgcolor: 'rgba(211,211,211)',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
};