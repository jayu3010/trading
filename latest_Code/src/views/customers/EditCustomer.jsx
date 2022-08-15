/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Button, Divider, Grid, TextField, Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconArrowRight, IconX } from '@tabler/icons';
import { useAxios } from 'hooks';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';

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
    tableId: Yup.string().required('Table Id is required'),
    memberId: Yup.string().required('Member Id is required'),
    referredBy: Yup.string().required('Referred By is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    username: Yup.string().required('Username is required'),
    contactNumber: Yup.string()
        .required('required')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'to short')
        .max(10, 'to long')
});

const EditCustomer = ({ handleClose, open, setIsUpdateTable, previousData }) => {
    const axios = useAxios();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues(previousData);
    }, [previousData]);
console.log("previousData",previousData)
    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={async (values, form) => {
                            try {
                                const options = {
                                    headers: { 'Access-Control-Allow-Origin': '' }
                                };
                                const response = await axios.post(`/customer/register`, values, options);
                                console.log(response, 'response');
                                swal(response.data.message, { icon: 'success' });
                                setIsUpdateTable((prevState) => !prevState);
                                setTimeout(() => {
                                    handleClose();
                                }, 1000);
                            } catch (err) {
                                swal(err.response.data.message || 'Something went wrong');
                            }
                        }}
                    >
                        {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting, touched }) => (
                            <SubCard title="Edit Customer">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="tableId"
                                            error={errors.tableId}
                                            onChange={handleChange('tableId')}
                                            onBlur={() => handleBlur('tableId')}
                                            helperText={errors.tableId}
                                            fullWidth
                                            value={values.tableId}
                                            id="tableId"
                                            label="Table Id *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="memberId"
                                            error={errors.memberId}
                                            onChange={handleChange('memberId')}
                                            onBlur={() => handleBlur('memberId')}
                                            helperText={errors.memberId}
                                            fullWidth
                                            value={values.memberId}
                                            id="memberId"
                                            label="Member Id *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="referredBy"
                                            error={errors.referredBy}
                                            onChange={handleChange('referredBy')}
                                            onBlur={() => handleBlur('referredBy')}
                                            helperText={errors.referredBy}
                                            fullWidth
                                            value={values.referredBy}
                                            id="referredBy"
                                            label="Referred By *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="fullname"
                                            error={errors.fullname}
                                            onChange={handleChange('fullname')}
                                            onBlur={() => handleBlur('fullname')}
                                            helperText={errors.fullname}
                                            fullWidth
                                            value={values.fullname}
                                            id="fullname"
                                            label="Name*"
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
                                            name="address"
                                            error={errors.address}
                                            onChange={handleChange('address')}
                                            onBlur={() => handleBlur('address')}
                                            helperText={errors.address}
                                            fullWidth
                                            value={values.address}
                                            id="address"
                                            label="Address *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="state"
                                            error={errors.state}
                                            onChange={handleChange('state')}
                                            onBlur={() => handleBlur('state')}
                                            helperText={errors.state}
                                            fullWidth
                                            value={values.state}
                                            id="state"
                                            label="State *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="city"
                                            error={errors.city}
                                            onChange={handleChange('city')}
                                            onBlur={() => handleBlur('city')}
                                            helperText={errors.city}
                                            fullWidth
                                            value={values.city}
                                            id="city"
                                            label="City *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="pincode"
                                            error={errors.pincode}
                                            onChange={handleChange('pincode')}
                                            onBlur={() => handleBlur('pincode')}
                                            helperText={errors.pincode}
                                            fullWidth
                                            value={values.pincode}
                                            id="pincode"
                                            label="Pincode *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="regDateTime"
                                            error={errors.regDateTime}
                                            onChange={handleChange('regDateTime')}
                                            onBlur={() => handleBlur('regDateTime')}
                                            helperText={errors.regDateTime}
                                            fullWidth
                                            value={values.regDateTime}
                                            id="regDateTime"
                                            label="Registered Date & Time *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="updateDateTime"
                                            error={errors.updateDateTime}
                                            onChange={handleChange('updateDateTime')}
                                            onBlur={() => handleBlur('updateDateTime')}
                                            helperText={errors.updateDateTime}
                                            fullWidth
                                            value={values.updateDateTime}
                                            id="updateDateTime"
                                            label="Update Date & Time *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="ip"
                                            error={errors.ip}
                                            onChange={handleChange('ip')}
                                            onBlur={() => handleBlur('ip')}
                                            helperText={errors.ip}
                                            fullWidth
                                            value={values.ip}
                                            id="ip"
                                            label="IP *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="geolocation"
                                            error={errors.geolocation}
                                            onChange={handleChange('geolocation')}
                                            onBlur={() => handleBlur('geolocation')}
                                            helperText={errors.geolocation}
                                            fullWidth
                                            value={values.geolocation}
                                            id="geolocation"
                                            label="Geo Location *"
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
                                        {previousData ? 'Update' : 'Create'}
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

export default EditCustomer;
