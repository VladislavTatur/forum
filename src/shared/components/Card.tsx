import type { ReactNode } from 'react';

import { Box, Paper, type BoxProps } from '@mui/material';

type CardProps = BoxProps & {
  children: ReactNode;
};

export const Card = ({ children, sx, ...props }: CardProps) => {
  //todo переделать
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        p: 1,
        ...sx,
      }}
      {...props}
    >
      <Paper
        variant="outlined"
        sx={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1rem 2rem' }}
      >
        {children}
      </Paper>
    </Box>
  );
};
