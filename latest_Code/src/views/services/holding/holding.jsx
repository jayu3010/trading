/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconUser, IconEdit } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import EditFeature from './EditFeature';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const Holding = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [service, setServices] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [feature, setFeature] = useState({
        minimumInvestment: '',
        timeFrame: '',
        withdrawal: '',
        passbook: '',
        tax: '',
        security: ''
    });

    useEffect(() => {
        handleoverviewHolding()
    },[]);
const handleoverviewHolding=()=>{
    axios
    .get(`http://43.204.210.119/api/overview/holding/62c557437729bb047ee8914e`)
    .then((response) => {
        setLoading(false);
        setFeature({
            minimumInvestment: response.data.overview.features.minimumInvestment,
            timeFrame: response.data.overview.features.timeFrame,
            withdrawal: response.data.overview.features.withdrawal,
            passbook: response.data.overview.features.passbook,
            tax: response.data.overview.features.tax,
            security: response.data.overview.features.security
        });
    })
    .catch((err) => console.log(err));
} 
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleEdit = () => {
        handleOpen();
        setFeature(feature);
    };

    return (
        <>
            <div>
                <MainCard title="Holding Service">
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
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '30%', float: 'left', fontWeight: 'bold' }}>
                                Min Investment <br />
                                Time Frame <br />
                                Withdrawal <br />
                                Passbook <br />
                                Tax <br />
                                Security
                            </p>
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '69%', float: 'left' }}>
                                : {feature.minimumInvestment} <br /> : {feature.timeFrame} <br /> : {feature.withdrawal} <br /> :{' '}
                                {feature.passbook} <br /> : {feature.tax} <br /> : {feature.security}
                                <IconButton style={{ float: 'right' }} onClick={() => handleEdit()}>
                                    <IconEdit />
                                </IconButton>
                            </p>
                        </Box>
                    </SubCard>
                </MainCard>
            </div>
            <EditFeature handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} feature={feature} handleoverviewHolding={handleoverviewHolding}/>
        </>
    );
};

export default Holding;
