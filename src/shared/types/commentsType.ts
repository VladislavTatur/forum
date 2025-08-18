export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type ServerCommentsCountType = {
  postId: number;
  count: number;
};
