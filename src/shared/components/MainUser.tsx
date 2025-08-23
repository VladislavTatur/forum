import { useState } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Stack, Typography } from '@mui/material';

import { User } from './users/User.tsx';
import { UserForm } from '@shared/components/users/UserForm.tsx';
import { getUserFromStorage } from '@shared/utils/getUserFromStorage.ts';
import { saveUserToStorage } from '@shared/utils/saveUserToStorage.ts';

import type { UserType } from '../types/usersType.ts';

export const MainUser = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const user = getUserFromStorage();

  const onSaveHandler = (updatedUser: UserType) => {
    saveUserToStorage(updatedUser);
    setIsOpenSetting((prev) => !prev);
  };

  const onCancelHandler = () => {
    setIsOpenSetting((prev) => !prev);
  };

  return (
    <>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h5" p={2.5}>
          {isOpenSetting ? 'Редактирование профиля' : 'Профиль'}
        </Typography>
        <IconButton
          sx={{ width: '35px', height: '35px' }}
          onClick={() => setIsOpenSetting((prev) => !prev)}
        >
          <SettingsIcon />
        </IconButton>
      </Stack>
      {!isOpenSetting ? (
        <User user={user} myProfile />
      ) : (
        <UserForm
          user={user}
          onCancel={onCancelHandler}
          onSave={(update) => onSaveHandler(update)}
        />
      )}
    </>
  );
};
