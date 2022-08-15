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
    agreementId: Yup.string().required('Agreement Id is required'),
    url: Yup.string().required('Url is required'),
    signDate: Yup.string().required('Sign Date is required')
});

const EditAgreement = ({ handleClose, open, setIsUpdateTable, previousData }) => {
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
                            <SubCard title="Edit Agreement Details">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="agreementId"
                                            error={errors.agreementId}
                                            onChange={handleChange('agreementId')}
                                            onBlur={() => handleBlur('agreementId')}
                                            helperText={errors.agreementId}
                                            fullWidth
                                            value={values.agreementId}
                                            id="agreementId"
                                            label="Agreement Id *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="url"
                                            error={errors.url}
                                            onChange={handleChange('url')}
                                            onBlur={() => handleBlur('url')}
                                            helperText={errors.url}
                                            fullWidth
                                            value={values.url}
                                            id="url"
                                            label="URL *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        Sign Date *
                                        <TextField
                                            name="signDate"
                                            error={errors.signDate}
                                            onChange={handleChange('signDate')}
                                            onBlur={() => handleBlur('signDate')}
                                            helperText={errors.signDate}
                                            fullWidth
                                            value={values.signDate}
                                            id="signDate"
                                            label=""
                                            variant="outlined"
                                            color="secondary"
                                            type="date"
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

export default EditAgreement;
