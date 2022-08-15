/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Button, CircularProgress, Divider, Grid, LinearProgress, MenuItem, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import { IconArrowRight, IconX } from '@tabler/icons';
import axios from 'axios';
import config from 'config';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';

const Input = styled('input')({
    display: 'none'
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4
};

const displayIn = [
    {
        value: 'Home-Page',
        label: 'Home Page'
    },
    {
        value: 'Login-Page',
        label: 'Login Page'
    },
    {
        value: 'Registration-Page',
        label: 'Registration Page'
    },
    {
        value: 'Promotion-Page',
        label: 'Promotion Page'
    },
    {
        value: 'Leaderboard-Page',
        label: 'Leaderboard Page'
    }
];

const CommonModel = ({ title, handleClose, open, handleAddBanner, appVersionEdit, children }) => {
    const [error, setError] = useState({ versionAndroid: true, versionIos: true, description: true, isForce: false });
    const [input, setInput] = useState({
        versionAndroid: '',
        versionIos: '',
        description: '',
        isForce: ''
    });

    useEffect(() => {
        if (appVersionEdit) {
            setInput(appVersionEdit);
        }
    }, [appVersionEdit]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleError = (field) => {
        if (input[field] === '') {
            setError((prevState) => ({ ...prevState, [field]: true }));
        } else {
            setError((prevState) => ({ ...prevState, [field]: false }));
        }
    };

    const handleChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        handleError();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const options = {
            headers: { 'Access-Control-Allow-Origin': '' }
        };
        const body = input;
        axios
            .post(`${config.apiBaseUrl}/banner/upload-banner`, body, options)
            .then((data) => {
                if (data.data.success) {
                    setIsSubmitting(false);
                    swal(data.data.message, { icon: 'success' });
                    handleAddBanner((prevState) => !prevState);
                    setTimeout(() => {
                        handleClose();
                    }, 1000);
                } else {
                    swal('Something went wrong');
                }
            })
            .catch((err) => {
                swal('Something went wrong');
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <SubCard title={title}>
                        {children}
                        <Divider />

                        <Box sx={{ mt: 4, mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button onClick={handleClose} variant="outlined" startIcon={<IconX />} color="secondary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                endIcon={<IconArrowRight />}
                                color="secondary"
                                disabled={isSubmitting || error.versionAndroid || error.versionIos || error.description || error.isForce}
                            >
                                Add
                            </Button>
                        </Box>
                    </SubCard>
                </Box>
            </Modal>
        </>
    );
};

export default CommonModel;
