import type { ReactNode } from 'react';

import { Stack, StackProps } from '@mui/material';

type CardProps = StackProps & {
  children: ReactNode;
};

export const Card = ({ children, sx, ...props }: CardProps) => {
  return (
    <Stack sx={{ backgroundColor: 'white', p: 2 }} flex={1} {...props}>
      {children}
    </Stack>
  );
};
