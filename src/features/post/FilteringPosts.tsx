import { UserType } from '@shared/types/usersType.ts';

type FilteringPostsProps = {
  users: UserType[];
};

export const FilteringPosts = ({ users }: FilteringPostsProps) => {
  if (!users || !users.length) {
    return null;
  }
  return <div></div>;
};
