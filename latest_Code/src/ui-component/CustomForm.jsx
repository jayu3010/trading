import React from 'react';
import { Grid, TextField } from '@mui/material';

const CustomForm = ({ type, name, label, error, handleChange, onBlur }) => {
    const data = '';
    return (
        <Grid item xs={12}>
            {type === 'text' && (
                <TextField
                    name={name}
                    error={error}
                    onChange={handleChange}
                    onBlur={onBlur}
                    // helperText="App Version Android"
                    fullWidth
                    id={name}
                    label={label}
                    variant="outlined"
                    color="secondary"
                />
            )}
            {/* {type === 'dropdown' && (
                <TextField
                    name={name}
                    error={error.description}
                    onChange={handleChange}
                    onBlur={() => handleError('description')}
                    // helperText="App Version Android"
                    fullWidth
                    id="name"
                    label="Description*"
                    variant="outlined"
                    color="secondary"
                />
            )} */}
            {/* {type === 'textarea' && (
                <TextField
                    name="description"
                    error={error.description}
                    onChange={handleChange}
                    onBlur={() => handleError('description')}
                    // helperText="App Version Android"
                    fullWidth
                    id="name"
                    label="Description*"
                    variant="outlined"
                    color="secondary"
                />
            )} */}
        </Grid>
    );
};

export default CustomForm;
