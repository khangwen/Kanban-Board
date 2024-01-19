import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TaskAdder(props) {
    const { value, onChange, onClick } = props;

    return (
        <div>
            <TextField
                fullWidth
                id="filled-basic"
                label="New Task Description"
                variant="outlined"
                margin="normal"
                value={value}
                onChange={onChange}
            />
            <Button
                variant="contained"
                onClick={onClick}
            >
                Add Task
            </Button>
        </div>
    );
}