/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import EditFeature from './EditFeature';
import AddTrading from './AddTrading';
import swal from 'sweetalert';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

let tableData = [];
const column = ['Sl. No', 'Branch ID', 'Capital', 'Segment', 'Type', 'Risk | Reward', 'Action'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const Trading = () => {
    const classes = useStyles();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState([null]);
    const [checked, setChecked] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [edit, setEdit] = useState('');
    const [feature, setFeature] = useState({
        minimumInvestment: '',
        timeFrame: '',
        withdrawal: '',
        tradePoint: '',
        risk: ''
    });
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleoverviewtrading = () => {
        axios
            .get(`http://43.204.210.119/api/overview/trading/62c42d0a7729bb047ee598d8`)
            .then((response) => {
                setLoading(false);
                setFeature({
                    minimumInvestment: response.data.overview.features.minimumInvestment,
                    timeFrame: response.data.overview.features.timeFrame,
                    withdrawal: response.data.overview.features.withdrawal,
                    tradePoint: response.data.overview.features.tradePoint,
                    risk: response.data.overview.features.risk
                });
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        handleoverviewtrading();
    }, []);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://43.204.210.119/api/bids/trading/`)
            .then((response) => {
                setLoading(false);
                setService(response.data.list);
            })
            .catch((err) => console.log(err));
    }, [isUpdateTable]);

    useEffect(() => {
        /* eslint-disable no-underscore-dangle */
        console.log('deleteData._id', deleteData._id);
    }, [deleteData]);

    const data = isSearch ? searches : service;

    const handleEditTrading = (index) => {
        handleOpen();
        console.log(previousData);
        setPreviousData(service[index]);
        setEdit('');
    };

    const handleDelete = (index) => {
        console.log('index', index);
        setDeleteData(index);
        axios
            .delete(`http://43.204.210.119/api/bids/trading/delete/${deleteData._id}`)
            .then((response) => {
                setLoading(false);
                swal('Successfully Delete', { icon: 'success' });
                setIsUpdateTable((prevState) => !prevState);
                console.log(`Delete Successfully`);
            })
            .catch((err) => console.log(err));
    };

    const handleEditFeature = () => {
        handleOpen();
        setFeature(feature);
        setEdit('feature');
    };

    tableData = data?.map((service, i) => ({
        id: i + 1,
        branchId: service?.branchId,
        capital: service?.capital,
        segment: service?.segment,
        type: service?.type,
        riskReward: `${service?.risk} | ${service?.reward}`,
        action: (
            <div className={classes.actionsContainer}>
                <IconButton title="Edit" onClick={() => handleEditTrading(i)}>
                    <IconEdit />
                </IconButton>
                <IconButton title="Delete" onClick={() => handleDelete(service?._id)}>
                    <IconTrash />
                </IconButton>
            </div>
        )
    }));

    return (
        <>
            {edit === 'feature' && (
                <EditFeature handleClose={handleClose} open={open} feature={feature} handleoverviewtrading={handleoverviewtrading} />
            )}
            {edit === '' && (
                <AddTrading handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} previousData={previousData} />
            )}
            <div>
                <MainCard title="Trading Service">
                    <SubCard>
                        <Box style={{ width: '48%', float: 'left', margin: '1%' }}>
                            <h3 style={{ color: '#5e35b1' }}>Overview</h3>
                            <hr style={{ border: '0.2px solid #d6d4d4' }} />
                            <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                                PRO-Daily is the intraday/swing based trade management service where the clients can enjoy the profit in
                                their trade account. We do research based trade only with your prior permission. you can see all trades in
                                your mobile applications.
                            </p>
                        </Box>
                        <Box style={{ width: '38%', float: 'left', margin: '1% 5%' }}>
                            <h3 style={{ color: '#5e35b1' }}>Features</h3>
                            <hr style={{ border: '0.2px solid #d6d4d4' }} />
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '40%', float: 'left', fontWeight: 'bold' }}>
                                Min Investment <br />
                                Time Frame <br />
                                Withdrawal <br />
                                Trade Profit <br />
                                Risk
                            </p>
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '59%', float: 'left' }}>
                                : {feature.minimumInvestment} <br /> : {feature.timeFrame} <br /> : {feature.withdrawal} <br /> :{' '}
                                {feature.tradePoint} <br /> : {feature.risk}
                                <IconButton style={{ float: 'right' }} onClick={() => handleEditFeature()}>
                                    <IconEdit />
                                </IconButton>
                            </p>
                        </Box>
                    </SubCard>
                    <SubCard
                        style={{ marginTop: '50px' }}
                        title={loading ? <CircularProgress color="secondary" /> : ' '}
                        secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Button onClick={handleOpen} variant="contained" color="secondary" size="small" startIcon={<IconPlus />}>
                                    Add Trading
                                </Button>
                            </Box>
                        }
                    >
                        {service.length <= 0 ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 1,
                                    m: 1,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1
                                }}
                            >
                                <CircularProgress color="secondary" />
                            </Box>
                        ) : (
                            <CommonTable column={column} data={tableData} setBanner={setService} setIsUpdateTable={setIsUpdateTable} />
                        )}
                    </SubCard>
                </MainCard>
            </div>
        </>
    );
};

export default Trading;
