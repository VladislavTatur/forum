import { Autocomplete, Stack, TextField } from '@mui/material';

import { UserType } from '@shared/types/usersType.ts';

type FilteringPostsProps = {
  users: UserType[];
  onFilterChange: (value: string | null) => void;
};

export const FilteringPosts = ({ users, onFilterChange }: FilteringPostsProps) => {
  const onFilterChangeHandler = (value: string | null) => {
    if (value) {
      onFilterChange(value);
    } else onFilterChange(null);
  };
  return (
    <Stack alignItems="center" flex={1}>
      <Autocomplete
        size="small"
        sx={{ width: '100%', maxWidth: 400 }}
        onChange={(_, value) => onFilterChangeHandler(value)}
        freeSolo
        options={users.map((user) => user.name)}
        renderInput={(params) => <TextField {...params} label="Search for posts by users..." />}
      />
    </Stack>
  );
};
