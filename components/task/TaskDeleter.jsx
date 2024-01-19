import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TaskDeleter(props) {
    const { value, onChange, onClick } = props;

    return (
        <div>
            <TextField
                fullWidth
                id="filled-basic"
                label="ID of Task to Delete"
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
            />
            <Button
                variant="contained"
                onClick={onClick}
            >
                Delete Task
            </Button>
        </div>
    );
}