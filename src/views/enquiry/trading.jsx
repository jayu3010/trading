/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';

let tableData = [];
const column = ['Sl. No', 'Name', 'Mobile Number', 'Branch Id', 'Date & Time'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const TradingEnquiry = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [enquiry, setEnquiry] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState([null]);
    const [checked, setChecked] = useState(false);

    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://43.204.210.119/api/request/trading/`)
            .then((response) => {
                setLoading(false);
                console.log(response.data.List);
                setEnquiry(response.data.List);
            })
            .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const data = isSearch ? searches : enquiry;
    console.log(data, isSearch);

    tableData = data?.map((enquiry, i) => ({
        id: i + 1,
        name: enquiry?.bidder.fullname,
        mobileNumber: enquiry?.bidder.contactNumber,
        branchId: enquiry?.branchId,
        dateTime: format(new Date(`${enquiry.created_at}`), 'yyyy-MM-dd HH:MM:SS')
    }));

    return (
        <>
            <div>
                <MainCard title="Trading Enquiry">
                    <SubCard>
                        {enquiry.length <= 0 ? (
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
                            <CommonTable column={column} data={tableData} setBanner={setEnquiry} setIsUpdateTable={setIsUpdateTable} />
                        )}
                    </SubCard>
                </MainCard>
            </div>
        </>
    );
};

export default TradingEnquiry;
