import React from 'react';
import TextField from '@mui/material/TextField';

export default function TaskSearchBar(props) {
  const { value, onChange } = props;

  return (
    <TextField
      fullWidth
      id="filled-basic"
      label="Filter Tasks"
      variant="outlined"
      margin="normal"
      value={value}
      onChange={onChange}
    />
  );
}
