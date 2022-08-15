/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Button, Divider, Grid, TextField, Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconArrowRight, IconX } from '@tabler/icons';
import axios from 'axios';
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
    branchId: Yup.string().required('Branch ID is required'),
    capital: Yup.string().required('Capital is required'),
    segment: Yup.string().required('Segment is required'),
    type: Yup.string().required('Type is required'),
    risk: Yup.string().required('Risk is required'),
    reward: Yup.string().required('Reward is required')
});

const AddTrading = ({ handleClose, open, setIsUpdateTable, previousData }) => {
    const [initialValues, setInitialValues] = useState({
        branchId: '',
        capital: '',
        segment: '',
        type: '',
        risk: '',
        reward: ''
    });

    useEffect(() => {
        if (previousData) setInitialValues(previousData);
        else
            setInitialValues({
                branchId: '',
                capital: '',
                segment: '',
                type: '',
                risk: '',
                reward: ''
            });
    }, [previousData]);
    /* eslint-disable no-underscore-dangle */

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={async (values, form) => {
                            const valId = values._id;
                            delete values._id;
                            delete values.__v;
                            delete values.created_at;
                            delete values.updated_at;
                            console.log(values);
                            if (previousData) {
                                try {
                                    axios
                                        .put(`http://43.204.210.119/api/bids/trading/update/${valId}`, values)
                                        .then((response) => {
                                            console.log(response.data);
                                            swal('Successfully Update', { icon: 'success' });
                                            setIsUpdateTable((prevState) => !prevState);
                                            setTimeout(() => {
                                                handleClose();
                                            }, 1000);
                                        })
                                        .catch((err) => console.log(err));
                                } catch (err) {
                                    swal(err.response.data.message || 'Something went wrong');
                                }
                            } else {
                                try {
                                    console.log(values);
                                    axios
                                        .post(`http://43.204.210.119/api/bids/trading/register`, values)
                                        .then((response) => {
                                            console.log(response.data);
                                            swal('Successfully Added', { icon: 'success' });
                                            setIsUpdateTable((prevState) => !prevState);
                                            setTimeout(() => {
                                                handleClose();
                                            }, 1000);
                                        })
                                        .catch((err) => console.log(err));
                                } catch (err) {
                                    swal(err.response.data.message || 'Something went wrong');
                                }
                            }
                        }}
                    >
                        {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting, touched }) => (
                            <SubCard title={previousData ? 'Update Trading' : 'Add Trading'}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="branchId"
                                            error={errors.branchId}
                                            onChange={handleChange('branchId')}
                                            onBlur={() => handleBlur('branchId')}
                                            helperText={errors.branchId}
                                            fullWidth
                                            value={values.branchId}
                                            id="branchId"
                                            label="Branch ID *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="capital"
                                            error={errors.capital}
                                            onChange={handleChange('capital')}
                                            onBlur={() => handleBlur('capital')}
                                            helperText={errors.capital}
                                            fullWidth
                                            value={values.capital}
                                            id="capital"
                                            label="Capital*"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="segment"
                                            error={errors.segment}
                                            onChange={handleChange('segment')}
                                            onBlur={() => handleBlur('segment')}
                                            helperText={errors.segment}
                                            fullWidth
                                            value={values.segment}
                                            id="segment"
                                            label="Segment *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="type"
                                            error={errors.type}
                                            onChange={handleChange('type')}
                                            onBlur={() => handleBlur('type')}
                                            helperText={errors.type}
                                            fullWidth
                                            value={values.type}
                                            id="type"
                                            label="Type *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="risk"
                                            error={errors.risk}
                                            onChange={handleChange('risk')}
                                            onBlur={() => handleBlur('risk')}
                                            helperText={errors.risk}
                                            fullWidth
                                            value={values.risk}
                                            id="risk"
                                            label="Risk *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="reward"
                                            error={errors.reward}
                                            onChange={handleChange('reward')}
                                            onBlur={() => handleBlur('reward')}
                                            helperText={errors.reward}
                                            fullWidth
                                            value={values.reward}
                                            id="reward"
                                            label="Reward *"
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

export default AddTrading;
