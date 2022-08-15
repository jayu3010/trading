/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Button, Divider, Grid, TextField, Switch, Typography } from '@mui/material';
import { IconArrowRight, IconX } from '@tabler/icons';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { Formik } from 'formik';
import * as Yup from 'yup';
import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
// import AddUser from './AddUser';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { ref } from 'yup';

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

const column = ['Sl. No', 'Name', 'Username', 'Email Id', 'Phone No', 'Wallet Amount', 'Joined On', 'Last Login', 'Actions'];
const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
    name: Yup.string().required('Name of the Bid is required'),
    totalAmount: Yup.number().required('Total Amount is required'),
    description: Yup.string().required('Description is required'),
    minBid: Yup.string().required('Minimum Bid is required'),
    maxBid: Yup.string().required('Maximum Bid is required'),
    tenure: Yup.string().required('Tenure is required'),
    startTime: Yup.date()
        .min(new Date(), `Select the Date & Time After ${new Date()}`)
        .required('Time Duration Start Time by User is required'),
    endTime: Yup.date()
        .when('startTime', (startTime) => Yup.date().min(startTime, `End Date must be after ${new Date(startTime)}`))
        .required('Time Duration End Time by User is required'),
    declaration: Yup.date()
        .when('startTime', (endTime) => Yup.date().min(endTime, `Declaration Date must be after ${new Date(endTime)}`))
        .required('Declaration for Time & Date is required')
});

const CreateBids = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        totalAmount: '',
        description: '',
        tenure: '',
        bidAmout: {
            min: '',
            max: ''
        },
        biddingTimePeriod: {
            start: '',
            end: ''
        },
        declaration: ''
    });

    return (
        <>
            {/* <Box sx={style}> */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={async (values, form) => {
                    try {
                        const options = {
                            headers: { 'Access-Control-Allow-Origin': '' }
                        };
                        console.log(values);
                        axios.post(`http://43.204.210.119/api/bids/create`, values).then((response) => {
                            console.log(response.data);
                            swal(response.data.message, { icon: 'success' });
                        });
                    } catch (err) {
                        swal(err.response.data.message || 'Something went wrong');
                    }
                }}
            >
                {({ handleBlur, handleChange, values, errors, handleSubmit, isSubmitting, touched }) => (
                    <SubCard title="Create Bids">
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="name"
                                    error={errors.name}
                                    onChange={handleChange('name')}
                                    onBlur={() => handleBlur('name')}
                                    helperText={errors.name}
                                    fullWidth
                                    value={values.name}
                                    id="name"
                                    label="Name of the Bid *"
                                    variant="outlined"
                                    color="secondary"
                                    margin="dense"
                                />
                                <TextField
                                    name="totalAmount"
                                    error={errors.totalAmount}
                                    onChange={handleChange('totalAmount')}
                                    onBlur={() => handleBlur('totalAmount')}
                                    helperText={errors.totalAmount}
                                    fullWidth
                                    value={values.totalAmount}
                                    id="totalAmount"
                                    label="Total Amount *"
                                    variant="outlined"
                                    color="secondary"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="Description"
                                    error={errors.description}
                                    onChange={handleChange('description')}
                                    onBlur={() => handleBlur('description')}
                                    helperText={errors.description}
                                    fullWidth
                                    multiline
                                    rows={5}
                                    value={values.description}
                                    id="description"
                                    label="Description*"
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="minBid"
                                    error={errors.minBid}
                                    onChange={handleChange('minBid')}
                                    onBlur={() => handleBlur('minBid')}
                                    helperText={errors.minBid}
                                    fullWidth
                                    defaultValue={values.bidAmout.min}
                                    id="minBid"
                                    label="Minimum Bid *"
                                    variant="outlined"
                                    color="secondary"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    name="maxBid"
                                    error={errors.maxBid}
                                    onChange={handleChange('maxBid')}
                                    onBlur={() => handleBlur('maxBid')}
                                    helperText={errors.maxBid}
                                    fullWidth
                                    defaultValue={values.bidAmout.max}
                                    id="maxBid"
                                    label="Maximum Bid *"
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
                                Time Duration Start Time by User *
                                <TextField
                                    name="startTime"
                                    error={errors.startTime}
                                    onChange={handleChange('startTime')}
                                    onBlur={() => handleBlur('startTime')}
                                    helperText={errors.startTime}
                                    fullWidth
                                    defaultValue={values.biddingTimePeriod.start}
                                    id="startTime"
                                    label=""
                                    variant="outlined"
                                    color="secondary"
                                    type="datetime-local"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                Time Duration End Time by User *
                                <TextField
                                    name="endTime"
                                    error={errors.endTime}
                                    onChange={handleChange('endTime')}
                                    onBlur={() => handleBlur('endTime')}
                                    helperText={errors.endTime}
                                    fullWidth
                                    defaultValue={values.biddingTimePeriod.end}
                                    id="endTime"
                                    label=""
                                    variant="outlined"
                                    color="secondary"
                                    type="datetime-local"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                Date & Time for Declaration *
                                <TextField
                                    name="declaration"
                                    error={errors.declaration}
                                    onChange={handleChange('declaration')}
                                    onBlur={() => handleBlur('declaration')}
                                    helperText={errors.declaration}
                                    fullWidth
                                    value={values.declaration}
                                    id="declaration"
                                    label=""
                                    variant="outlined"
                                    color="secondary"
                                    type="datetime-local"
                                />
                            </Grid>
                        </Grid>
                        <Divider />
                        {/* <Box sx={{ mt: 4, mx: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
                        <Button
                            sx={{ mt: 4, alignItems: 'center' }}
                            onClick={handleSubmit}
                            variant="contained"
                            endIcon={<IconArrowRight />}
                            color="secondary"
                            disabled={isSubmitting}
                        >
                            Create
                        </Button>
                        {/* </Box> */}
                    </SubCard>
                )}
            </Formik>
            {/* </Box> */}
        </>
    );
};

export default CreateBids;
