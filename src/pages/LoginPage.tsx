import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@shared/constants/links.ts';
import { selectCurrentUser } from '@store/selectors/users.ts';
import { login } from '@store/slices/users/usersSlice.ts';
import { useAppDispatch } from '@store/store.ts';

type LoginFormData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = selectCurrentUser();
  const { control, handleSubmit, setError } = useForm<LoginFormData>({
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    if (user?.username === data.username && user?.password === data.password) {
      dispatch(login());
      navigate(ROUTES.posts);
    } else {
      setError('username', { type: 'manual', message: 'Invalid username or password' });
      setError('password', { type: 'manual', message: 'Invalid username or password' });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Login
        </Typography>

        <Box component="form" display="grid" gap={2} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            rules={{ required: 'Username is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Username"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="password"
                label="Password"
                autoComplete="new-password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
