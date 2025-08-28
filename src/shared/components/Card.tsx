import type { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import type { StackProps } from '@mui/material/Stack';

type CardProps = StackProps & {
  children: ReactNode;
};

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <Stack sx={{ backgroundColor: 'white', p: 2, borderRadius: '6px' }} flex={1} {...props}>
      {children}
    </Stack>
  );
};
