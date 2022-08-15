/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconEdit } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import EditFeature from './EditFeature';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';
import { boolean } from 'yup/lib/locale';

const column = [
    'Sl. No',
    'Description',
    'Minimum Capital',
    'Tenure',
    'Dividend',
    'Preference Share Value',
    'Capital Gain Value',
    'TDS Application'
];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const PreferenceShares = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [feature, setFeature] = useState({
        minimumCapital: '',
        tenure: '',
        dividend: '',
        preferenceShareValue: '',
        capitalGainValue: '',
        tdsApplicable: ''
    });

    useEffect(() => {
        handleoverviewpreference()
    },[]);
const handleoverviewpreference=()=>{
    axios
    .get(`http://43.204.210.119/api/overview/preference/62c55ada7729bb047ee8d06e`)
    .then((response) => {
        setLoading(false);
        setFeature({
            minimumCapital: response.data.overview.features.minimumCapital,
            tenure: response.data.overview.features.tenure,
            dividend: response.data.overview.features.dividend,
            preferenceShareValue: response.data.overview.features.preferenceShareValue,
            capitalGainValue: response.data.overview.features.capitalGainValue,
            tdsApplicable: response.data.overview.features.tdsApplicable ? 'true' : 'false'
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
                <MainCard title="Preference Share Service">
                    <SubCard>
                        <Box style={{ width: '48%', float: 'left', margin: '1%' }}>
                            <h3 style={{ color: '#5e35b1' }}>Overview</h3>
                            <hr style={{ border: '0.2px solid #d6d4d4' }} />
                            <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                                SHREEG EXPERT WEALTH ADVISORY LIMITED are truly Holding companies which are making consistent growth from
                                our holding strategies since 2016. We are allotting our preference shares to our precious valueable
                                customers for their multi bagger return possibilities along with the company&apos;s furture journey. This
                                proposal gives our shareholder dividend facilities along with long term market value gain in our company
                                preference shares.
                            </p>
                        </Box>
                        <Box style={{ width: '38%', float: 'left', margin: '1% 5%' }}>
                            <h3 style={{ color: '#5e35b1' }}>Features</h3>
                            <hr style={{ border: '0.2px solid #d6d4d4' }} />
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '40%', float: 'left', fontWeight: 'bold' }}>
                                Min Capital <br />
                                Tenure <br />
                                Dividend <br />
                                Preference Share Value <br />
                                Capital Gain Value <br />
                                TDS applicable
                            </p>
                            <p style={{ textAlign: 'justify', lineHeight: '25px', width: '59%', float: 'left' }}>
                                : {feature.minimumCapital} <br /> : {feature.tenure} <br /> : {feature.dividend} <br /> :{' '}
                                {feature.preferenceShareValue} <br /> : {feature.capitalGainValue} <br /> : {feature.tdsApplicable}
                                <IconButton style={{ float: 'right' }} onClick={() => handleEdit()}>
                                    <IconEdit />
                                </IconButton>
                            </p>
                        </Box>
                    </SubCard>
                </MainCard>
            </div>
            <EditFeature handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} feature={feature} handleoverviewpreference={handleoverviewpreference} />
        </>
    );
};

export default PreferenceShares;
