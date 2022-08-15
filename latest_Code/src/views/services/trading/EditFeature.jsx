/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Button, Divider, Grid, TextField } from '@mui/material';
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

const EditFeature = ({ handleClose, open, feature,handleoverviewtrading }) => {
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        setInitialValues({ ...feature, overview: 'testing update' });
    }, [feature]);
console.log("featurefeature",feature)
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
                                    .put(`http://43.204.210.119/api/overview/trading/update/62c42d0a7729bb047ee598d8`, values)
                                    .then((response) => {
                                        console.log(response.data);
                                        handleoverviewtrading()
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
                        {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting }) => (
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
                                            name="tradePoint"
                                            error={errors.tradePoint}
                                            onChange={handleChange('tradePoint')}
                                            onBlur={() => handleBlur('tradePoint')}
                                            helperText={errors.tradePoint}
                                            fullWidth
                                            value={values.tradePoint}
                                            id="tradePoint"
                                            label="Trade Profit*"
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

export default EditFeature;
