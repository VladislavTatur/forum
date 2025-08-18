type CommentProps = {
    name: string
    body: string
}

export const Comment = ({ body, name}: CommentProps) => {
    return (
        <div style={{marginBottom: 10, backgroundColor: 'white', borderRadius: '5px', padding: '5px 20px'}}>
            <p style={{fontWeight: 600}}>{name}</p>
            <p style={{fontSize: 14}}>{body}</p>
        </div>
    )
}