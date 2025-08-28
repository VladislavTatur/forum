import Typography from '@mui/material/Typography';

import { UserSettings } from '@features/users/components/UserSettings.tsx';
import { Card } from '@shared/components/Card.tsx';
import { selectCurrentUser } from '@store/selectors/users.ts';

const ProfileSettingsPage = () => {
  const currentUser = selectCurrentUser();

  if (!currentUser) return <Typography>Loading user...</Typography>;
  return (
    <Card>
      <Typography variant="h5" p={2}>
        Profile Editing
      </Typography>
      <UserSettings />
    </Card>
  );
};

export default ProfileSettingsPage;
