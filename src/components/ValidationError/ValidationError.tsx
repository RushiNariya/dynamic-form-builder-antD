import { Typography } from '@mui/material';
import React from 'react';

function ValidationError({ error }: { error: string }) {
  return (
    <Typography
      style={{
        color: 'red',
        paddingLeft: '0.2rem',
        margin: 0,
      }}
      variant="caption"
    >
      {error}
    </Typography>
  );
}

export default ValidationError;
