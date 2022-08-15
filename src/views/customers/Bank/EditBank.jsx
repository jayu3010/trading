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

const validationSchema = Yup.object({
    bank: Yup.string().required('Bank Name is required'),
    ifsc: Yup.string().required('IFSC Code is required'),
    branch: Yup.string().required('Branch Name is required'),
    accountNumber: Yup.string().required('Account Number is required')
});

const EditBank = ({ handleClose, open, setIsUpdateTable, previousData }) => {
    const axios = useAxios();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues(previousData);
    }, [previousData]);

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
                            <SubCard title="Edit Bank Details">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="bank"
                                            error={errors.bank}
                                            onChange={handleChange('bank')}
                                            onBlur={() => handleBlur('bank')}
                                            helperText={errors.bank}
                                            fullWidth
                                            value={values.bank}
                                            id="bank"
                                            label="Bank Name *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="ifsc"
                                            error={errors.ifsc}
                                            onChange={handleChange('ifsc')}
                                            onBlur={() => handleBlur('ifsc')}
                                            helperText={errors.ifsc}
                                            fullWidth
                                            value={values.ifsc}
                                            id="ifsc"
                                            label="IFSC Code *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="branch"
                                            error={errors.branch}
                                            onChange={handleChange('branch')}
                                            onBlur={() => handleBlur('branch')}
                                            helperText={errors.branch}
                                            fullWidth
                                            value={values.branch}
                                            id="branch"
                                            label="Branch Name *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="accountNumber"
                                            error={errors.accountNumber}
                                            onChange={handleChange('accountNumber')}
                                            onBlur={() => handleBlur('accountNumber')}
                                            helperText={errors.accountNumber}
                                            fullWidth
                                            value={values.accountNumber}
                                            id="accountNumber"
                                            label="Account Number *"
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
                                        Update
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

export default EditBank;
