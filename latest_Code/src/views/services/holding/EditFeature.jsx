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

const EditFeature = ({ handleClose, open, setIsUpdateTable, feature,handleoverviewHolding }) => {
    const axios = useAxios();
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues(feature);
    }, [feature]);

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        onSubmit={async (values) => {

                            try {
                                axios
                                    .put(`http://43.204.210.119/api/overview/holding/update/62c557437729bb047ee8914e`, values)
                                    .then((response) => {
                                        console.log(response.data);
                                        handleoverviewHolding()
                                        swal('Successfully Update', { icon: 'success' });
                                        setTimeout(() => {
                                            handleClose();
                                        }, 1000);
                                    })
                                    .catch((err) => console.log(err));
                            } catch (err) {
                                swal(err.response.data.message || 'Something went wrong');
                            }
                        }}
                    >
                        {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting, touched }) => (
                            <SubCard title="Edit Holding Features">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="minimumInvestment"
                                            error={errors.minimumInvestment}
                                            onChange={handleChange('minimumInvestment')}
                                            onBlur={() => handleBlur('minimumInvestment')}
                                            helperText={errors.minimumInvestment}
                                            fullWidth
                                            value={values.minimumInvestment}
                                            id="minimumInvestment"
                                            label="Min Investment *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="timeFrame"
                                            error={errors.timeFrame}
                                            onChange={handleChange('timeFrame')}
                                            onBlur={() => handleBlur('timeFrame')}
                                            helperText={errors.timeFrame}
                                            fullWidth
                                            value={values.timeFrame}
                                            id="timeFrame"
                                            label="Time Frame *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="withdrawal"
                                            error={errors.withdrawal}
                                            onChange={handleChange('withdrawal')}
                                            onBlur={() => handleBlur('withdrawal')}
                                            helperText={errors.withdrawal}
                                            fullWidth
                                            value={values.withdrawal}
                                            id="withdrawal"
                                            label="Withdrawal *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="passbook"
                                            error={errors.passbook}
                                            onChange={handleChange('passbook')}
                                            onBlur={() => handleBlur('passbook')}
                                            helperText={errors.passbook}
                                            fullWidth
                                            value={values.passbook}
                                            id="passbook"
                                            label="Passbook*"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="tax"
                                            error={errors.tax}
                                            onChange={handleChange('tax')}
                                            onBlur={() => handleBlur('tax')}
                                            helperText={errors.tax}
                                            fullWidth
                                            value={values.tax}
                                            id="tax"
                                            label="Tax *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="security"
                                            error={errors.security}
                                            onChange={handleChange('security')}
                                            onBlur={() => handleBlur('security')}
                                            helperText={errors.security}
                                            fullWidth
                                            value={values.security}
                                            id="security"
                                            label="Security *"
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
                                        {feature ? 'Update' : 'Create'}
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

export default EditFeature;
