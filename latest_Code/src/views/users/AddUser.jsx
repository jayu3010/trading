/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Button, Divider, Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconArrowRight, IconX } from '@tabler/icons';
import { useAxios } from 'hooks';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import config from 'config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: '98%',
    maxHeight: '90vh',
    overflow: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    contactNumber: Yup.string()
        .required('required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'to short')
        .max(10, 'to long'),
    password: Yup.string().required('Password is required')
});

const AddUser = ({ handleClose, open, setIsUpdateTable }) => {
    const axios = useAxios();
    const [initialValues, setInitialValues] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        role: '6282138ed73f120ff3a81b5d',
        contactNumber: '',
        password: ''
    });

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={async (values) => {
                            try {
                                const options = {
                                    headers: { 'Access-Control-Allow-Origin': '' }
                                };
                                console.log(values);
                                axios.post(`http://43.204.210.119/api/admins/register`, values).then((response) => {
                                    console.log(response.data);
                                    swal(response.data.message, { icon: 'success' });
                                    setIsUpdateTable((prevState) => !prevState);
                                    setTimeout(() => {
                                        handleClose();
                                    }, 1000);
                                });
                            } catch (err) {
                                swal(err.response.data.message || 'Something went wrong');
                            }
                        }}
                    >
                        {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting }) => (
                            <SubCard title="Add User">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="firstname"
                                            error={errors.firstname}
                                            onChange={handleChange('firstname')}
                                            onBlur={() => handleBlur('firstname')}
                                            helperText={errors.firstname}
                                            fullWidth
                                            value={values.firstname}
                                            id="firstname"
                                            label="First Name*"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="lastname"
                                            error={errors.lastname}
                                            onChange={handleChange('lastname')}
                                            onBlur={() => handleBlur('lastname')}
                                            helperText={errors.lastname}
                                            fullWidth
                                            value={values.lastname}
                                            id="lastname"
                                            label="Last Name*"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="username"
                                            error={errors.username}
                                            onChange={handleChange('username')}
                                            onBlur={() => handleBlur('username')}
                                            helperText={errors.username}
                                            fullWidth
                                            value={values.username}
                                            id="username"
                                            label="Username *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="email"
                                            error={errors.email}
                                            onChange={handleChange('email')}
                                            onBlur={() => handleBlur('email')}
                                            helperText={errors.email}
                                            fullWidth
                                            value={values.email}
                                            id="email"
                                            label="Email id *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="contactNumber"
                                            error={errors.contactNumber}
                                            onChange={handleChange('contactNumber')}
                                            onBlur={() => handleBlur('contactNumber')}
                                            helperText={errors.contactNumber}
                                            fullWidth
                                            value={values.contactNumber}
                                            id="contactNumber"
                                            label="Contact Number *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="password"
                                            error={errors.password}
                                            onChange={handleChange('password')}
                                            onBlur={() => handleBlur('password')}
                                            helperText={errors.password}
                                            fullWidth
                                            value={values.password}
                                            id="password"
                                            label="Password *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                </Grid>
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
                                        disabled={isSubmitting}
                                    >
                                        Create User
                                    </Button>
                                </Box>
                            </SubCard>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </>
    );
};

export default AddUser;
