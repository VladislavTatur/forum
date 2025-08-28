type CommentProps = {
  email: string;
  body: string;
};

export const Comment = ({ body, email }: CommentProps) => {
  return (
    <div
      style={{
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '5px 20px',
      }}
    >
      <p style={{ fontWeight: 600 }}>{email}</p>
      <p style={{ fontSize: 14, paddingLeft: 15 }}>{body}</p>
    </div>
  );
};
