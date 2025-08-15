import {Paper} from "@mui/material";

type PostType = {
    title: string,
    body: string,
    author: string,
}

export const Post = ({title, body, author}: PostType) => {

    return (
        <Paper>
            <h2>{author}</h2>
            <p>{title}</p>
            <p>{body}</p>
        </Paper>
    )
}