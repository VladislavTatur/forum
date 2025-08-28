import GlobalStyles from '@mui/material/GlobalStyles';

export const globalStyles = (
  <GlobalStyles
    styles={() => [
      {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        body: {
          height: '100dvh',
          width: '100%',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          backgroundColor: 'rgba(211, 211, 211)',
        },
        root: {
          width: '100%',
        },
      },
    ]}
  />
);
