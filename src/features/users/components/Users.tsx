import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { UserCard } from '@features/users/components/UserCard.tsx';
import { useGetUsersQuery } from '@store/api/userApi.ts';

export const Users = () => {
  const { data: users } = useGetUsersQuery();

  return (
    <Box>
      <Typography variant="h5" p={2.5}>
        Users
      </Typography>
      {users && users.map((user) => <UserCard key={user.id} user={user} />)}
    </Box>
  );
};
