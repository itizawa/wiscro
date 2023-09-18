import { FC, ReactNode } from 'react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import Link from 'next/link';
import { URLS } from '~/constants/urls';

export const DefaultLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href={URLS.TOP} style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold' }}>
              Wiscro
            </Link>
            <Link href={URLS.QUESTION_NEW}>
              <Button variant="contained" color="warning">
                作成
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </Box>
  );
};
