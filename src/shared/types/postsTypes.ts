export type PostResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostRequest = Omit<PostResponse, 'id'>;
