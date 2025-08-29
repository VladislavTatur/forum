import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { userFieldConfigs } from '@features/users/constants';
import { ROUTES } from '@shared/constants/links.ts';
import type { UserType } from '@shared/types/usersType.ts';
import { saveUserToStorage } from '@shared/utils/saveUserToStorage.ts';
import { selectCurrentUser } from '@store/selectors/users.ts';
import { setCurrentUser } from '@store/slices/users/usersSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type UserFormData = UserType & {
  newPassword?: string;
  confirmPassword?: string;
};

export const UserSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = selectCurrentUser();
  const { control, handleSubmit, reset, watch } = useForm<UserFormData>({
    defaultValues: currentUser ?? {},
  });

  const newPassword = watch('newPassword');

  const onSubmit: SubmitHandler<UserFormData> = ({ newPassword, confirmPassword, ...data }) => {
    const updatedUser = {
      ...data,
      password: newPassword && confirmPassword ? newPassword : currentUser!.password,
    };
    saveUserToStorage(updatedUser);
    dispatch(setCurrentUser(updatedUser));
    navigate(ROUTES.profile);
  };

  const handleCloseSettings = () => {
    navigate(ROUTES.profile);
  };

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);

  return (
    <Box component="form" display="grid" gap={2} onSubmit={handleSubmit(onSubmit)}>
      {userFieldConfigs.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: controllerField }) => (
            <TextField label={field.label} {...controllerField} />
          )}
        />
      ))}
      <Controller
        name="newPassword"
        control={control}
        rules={{
          validate: {
            notOldPassword: () => {
              return newPassword !== currentUser?.password || 'Please do not use your old password';
            },
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="New Password"
            autoComplete="new-password"
            error={Boolean(newPassword && field.value && newPassword === currentUser?.password)}
            helperText={
              newPassword && field.value && newPassword === currentUser?.password
                ? 'Please do not use your old password'
                : ''
            }
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          validate: {
            passwordsMatch: (value) => value === newPassword || 'Passwords do not match',
            notOldPassword: () =>
              newPassword !== currentUser?.password || 'Please do not use your old password',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label="Confirm New Password"
            autoComplete="new-password"
            error={Boolean(newPassword && field.value && newPassword !== field.value)}
            helperText={
              newPassword && field.value && newPassword !== field.value
                ? 'Passwords do not match'
                : ''
            }
          />
        )}
      />

      <Box display="flex" gap={2} mt={2}>
        <Button type="submit" variant="contained" sx={{ minWidth: 100 }}>
          Save
        </Button>
        <Button variant="outlined" sx={{ minWidth: '100px' }} onClick={handleCloseSettings}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};
