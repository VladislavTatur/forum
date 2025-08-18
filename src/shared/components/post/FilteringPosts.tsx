import { type ChangeEvent, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, Box, IconButton, styled } from '@mui/material';

export const FilteringPosts = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // Здесь будет логика фильтрации постов
  };

  const handleClearSearch = () => {
    setSearchValue('');
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 300, my: 1 }}>
      <SearchTextField
        fullWidth
        variant="outlined"
        placeholder="Поиск пользователей..."
        value={searchValue}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <IconButton size="small" onClick={handleClearSearch} edge="end">
                <CloseIcon fontSize="small" />
              </IconButton>
            ),
          },
        }}
      />
    </Box>
  );
};

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    height: '30px',
    backgroundColor: theme.palette.background.paper,
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    },
  },
}));
