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

const EditFeature = ({ handleClose, open, setIsUpdateTable, feature,handleoverviewpreference }) => {
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
                                    .put(`http://43.204.210.119/api/overview/preference/update/62c55ada7729bb047ee8d06e`, values)
                                    .then((response) => {
                                        console.log(response.data);
                                        handleoverviewpreference()
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
                            <SubCard title="Edit Preference Shares Features">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="minimumCapital"
                                            error={errors.minimumCapital}
                                            onChange={handleChange('minimumCapital')}
                                            onBlur={() => handleBlur('minimumCapital')}
                                            helperText={errors.minimumCapital}
                                            fullWidth
                                            value={values.minimumCapital}
                                            id="minimumCapital"
                                            label="Minimum Capital *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="tenure"
                                            error={errors.tenure}
                                            onChange={handleChange('tenure')}
                                            onBlur={() => handleBlur('tenure')}
                                            helperText={errors.tenure}
                                            fullWidth
                                            value={values.tenure}
                                            id="tenure"
                                            label="Tenure *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="dividend"
                                            error={errors.dividend}
                                            onChange={handleChange('dividend')}
                                            onBlur={() => handleBlur('dividend')}
                                            helperText={errors.dividend}
                                            fullWidth
                                            value={values.dividend}
                                            id="dividend"
                                            label="Dividend *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="preferenceShareValue"
                                            error={errors.preferenceShareValue}
                                            onChange={handleChange('preferenceShareValue')}
                                            onBlur={() => handleBlur('preferenceShareValue')}
                                            helperText={errors.preferenceShareValue}
                                            fullWidth
                                            value={values.preferenceShareValue}
                                            id="preferenceShareValue"
                                            label="Preference Share Value*"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="capitalGainValue"
                                            error={errors.capitalGainValue}
                                            onChange={handleChange('capitalGainValue')}
                                            onBlur={() => handleBlur('capitalGainValue')}
                                            helperText={errors.capitalGainValue}
                                            fullWidth
                                            value={values.capitalGainValue}
                                            id="capitalGainValue"
                                            label="Capital Gain Value *"
                                            variant="outlined"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="tdsApplicable"
                                            error={errors.tdsApplicable}
                                            onChange={handleChange('tdsApplicable')}
                                            onBlur={() => handleBlur('tdsApplicable')}
                                            helperText={errors.tdsApplicable}
                                            fullWidth
                                            value={values.tdsApplicable}
                                            id="tdsApplicable"
                                            label="TDS Applicable *"
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
