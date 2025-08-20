import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Link, Typography } from '@mui/material';

import { Card } from '@shared/components/Card.tsx';
import { UserType } from '@shared/types/usersType.ts';

type UserProps = {
  user: UserType;
};

export const User = ({ user }: UserProps) => {
  //box -> stack direction={row} gap={20}
  return (
    <Card>
      <Box mb={1} display="flex" gap={2} alignItems="center">
        <AccountCircleIcon sx={{ width: '35px', height: '35px' }} />
        <Typography variant="h6" color="primary">
          {user.name}
        </Typography>
      </Box>

      <Box display="flex" mb={0.5}>
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 60 }}>
          Email:
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
      </Box>

      <Box display="flex" mb={0.5}>
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 60 }}>
          Website:
        </Typography>
        <Link href={`https://${user.website}`} target="_blank" rel="noopener" underline="hover">
          {user.website}
        </Link>
      </Box>

      <Box display="flex" mb={0.5}>
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 60 }}>
          City:
        </Typography>
        <Typography variant="body2">{user.address.city}</Typography>
      </Box>

      <Box display="flex" mb={0.5}>
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 60 }}>
          Company:
        </Typography>
        <Typography variant="body2">{user.company.name}</Typography>
      </Box>

      <Box display="flex">
        <Typography variant="body2" color="textSecondary" sx={{ minWidth: 60 }}>
          Phone:
        </Typography>
        <Typography variant="body2">{user.phone}</Typography>
      </Box>
    </Card>
  );
};
