import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import { UserCard } from '@features/users/components/UserCard.tsx';
import { ROUTES } from '@shared/constants/links.ts';
import { selectCurrentUser } from '@store/selectors/users.ts';

export const MainUser = () => {
  const currentUser = selectCurrentUser();
  const navigate = useNavigate();

  if (!currentUser) return <Typography>Loading user...</Typography>;

  const handleOpenSettings = () => {
    navigate(ROUTES.settings);
  };

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" p={2.5}>
          Profile
        </Typography>
        <IconButton sx={{ fontSize: 35 }} onClick={handleOpenSettings}>
          <SettingsIcon />
        </IconButton>
      </Stack>
      <UserCard user={currentUser} myProfile />
    </>
  );
};
