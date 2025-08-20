import { Typography } from '@mui/material';

import { User } from '@shared/components/users/User.tsx';
import { useGetUsersQuery } from '@store/api/userApi.ts';

export const Users = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <div>
      <Typography variant="h5" p={2.5}>
        Пользователи
      </Typography>
      {users && users.map((user) => <User key={user.id} user={user} />)}
    </div>
  );
};
