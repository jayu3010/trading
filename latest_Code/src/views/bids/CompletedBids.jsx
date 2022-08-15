/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconPlus, IconEdit, IconTrash } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';

let tableData = [];
const column = ['Sl. No', 'Bid Name', 'Amount Taken', 'Declaration Date', 'Users', 'Actions'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const CompletedBids = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [bids, setBids] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [checked, setChecked] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // setLoading(true);
        setLoading(false);
        setBids([
            {
                bidName: 'Test Bids',
                totalAmount: '50000',
                declarationDate: '5/6/2022',
                users: '50'
            }
        ]);

        // axios
        //     .get(`/customer`)
        //     .then((response) => {
        //         setLoading(false);
        //         setBids(response.data.customerList);
        //     })
        //     .catch((err) => console.log(err));
    }, [isUpdateTable]);

    useEffect(() => {
        /* eslint-disable no-underscore-dangle */
        console.log(deleteData._id);
        // axios
        //     .delete(`/service/delete/${services[index]._id}`)
        //     .then((response) => {
        //         setLoading(false);
        //         setServices(response.data.servicesList);
        //         console.log(`Delete Successfully`);
        //     })
        //     .catch((err) => console.log(err));
    }, [deleteData]);

    const handleKeyUpSearch = (e) => {
        setIsSearch(true);
        console.log(bids, 'bids');
        const data = bids.filter((b) => b?.bidName.toUpperCase().includes(e.target.value.toUpperCase()));
        console.log(data, 'data');
        setSearches(data);
        if (e.target.value === '') setIsSearch(false);
    };

    const handleActive = (e) => {
        let active = false;
        if (e.target.value === 'active') active = true;

        setActive(e.target.value);
        setIsSearch(true);
        // eslint-disable-next-line eqeqeq
        const data = bids.filter((b) => active === b.active);
        console.log(data, bids, e.target.value, 'data');
        setSearches(data);
        if (!e.target.value) setIsSearch(false);
    };

    const handleDelete = (index) => {
        setDeleteData(bids[index]);
    };

    const data = isSearch ? searches : bids;
    console.log(data, isSearch);

    const handleActiveChange = (id, value) => {
        console.log(id, value);
    };

    tableData = data?.map((bids, i) => ({
        id: i + 1,
        bidName: bids?.bidName,
        totalAmount: bids?.totalAmount,
        declarationDate: format(new Date(`${bids.declarationDate}`), 'yyyy-MM-dd'),
        users: bids?.users,
        action: (
            <div className={classes.actionsContainer}>
                <IconButton onClick={() => handleDelete(i)}>
                    <IconTrash />
                </IconButton>
            </div>
        )
    }));

    return (
        <>
            <div>
                <SubCard
                    title={loading ? <CircularProgress color="secondary" /> : 'Completed Bids'}
                    secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField onKeyUp={handleKeyUpSearch} label="Search by Bid Name..." color="secondary" size="small" />
                        </Box>
                    }
                >
                    {bids.length <= 0 ? (
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
                        <CommonTable column={column} data={tableData} setBanner={setBids} setIsUpdateTable={setIsUpdateTable} />
                    )}
                </SubCard>
            </div>
        </>
    );
};

export default CompletedBids;
