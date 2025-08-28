import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { UserType } from '@shared/types/usersType.ts';

type FilteringPostsProps = {
  users: UserType[];
  onFilterChange: (value: UserType | null) => void;
};

export const FilteringPosts = ({ users, onFilterChange }: FilteringPostsProps) => {
  const handleChangeFilter = (value: UserType | null) => {
    if (value) {
      onFilterChange(value);
    } else onFilterChange(null);
  };

  if (users.length === 0) {
    return <Typography>No users found.</Typography>;
  }

  return (
    <Stack alignItems="center" flex={1}>
      <Autocomplete
        size="small"
        sx={{ width: '100%', maxWidth: 400 }}
        options={users}
        getOptionLabel={(user) => user.name}
        onChange={(_, value) => handleChangeFilter(value)}
        renderInput={(params) => <TextField {...params} label="Search for posts by users..." />}
      />
    </Stack>
  );
};
