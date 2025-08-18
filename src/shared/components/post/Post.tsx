import {Paper} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {PostActions} from "./PoastActions.tsx";


type PostType = {
    title: string,
    body: string,
    author: string,
    postId: number,
}

export const Post = ({title, body, author, postId}: PostType) => {


    return (
        <Paper sx={{p: '20px', marginBottom: '1px'}}>
            <p style={{fontWeight: 500}}>{title}</p>
            <p style={{paddingLeft: '15px'}}>{body}</p>
            <div style={{display: "flex", marginTop: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: "flex", alignItems: 'center', gap: '10px'}}>
                    <AccountCircleIcon sx={{width: '35px', height: '35px', alignItems: 'center'}}/>
                    <h3>{author}</h3>
                </div>
                <PostActions postId={postId}/>
            </div>
        </Paper>
    )
}