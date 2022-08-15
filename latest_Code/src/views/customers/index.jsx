/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconUserCheck, IconBuildingBank, IconLicense, IconEdit } from '@tabler/icons';
import { format } from 'date-fns';
import EditCustomer from './EditCustomer';
import KYC from './Kyc/kyc';
import Bank from './Bank/Bank';
import Agreement from './Agreement/Agreement';
import config from 'config';
import SubCard from 'ui-component/cards/SubCard';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

let tableData = [];
const column = ['Sl. No', 'Name', 'Email Id', 'Phone No', 'City', 'Joining Date', 'Status', 'Actions'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const Customers = () => {
    const classes = useStyles();
    const [active, setActive] = useState('');
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [kyc, setKyc] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState('');
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [page, setPage] = useState('');
    const res = [];
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://43.204.210.119/api/bidders`)
            .then((response) => {
                // console.log(response.data);
                setLoading(false);
                setCustomers(response.data.bidderList);
            })
            .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const handleKeyUpSearch = (e) => {
        setIsSearch(true);
        console.log(customers, 'customers');
        const data = customers.filter((b) => b?.name.toUpperCase().includes(e.target.value.toUpperCase()));
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
        const data = customers.filter((b) => active === b.active);
        console.log(data, customers, e.target.value, 'data');
        setSearches(data);
        if (!e.target.value) setIsSearch(false);
    };

    const handleEdit = (index) => {
        handleOpen();
        setPreviousData(customers[index]);
        setPage('Edit');
    };

    const handleKyc = (index) => {
        console.log("indexindex",index)
        handleOpen();
        setPreviousData(customers[index]);
        setPage('KYC');
        axios
            .post(`http://43.204.210.119/api/kyc/get-by-bidder`, { bidder: index })
            .then((response) => {
                console.log("responseresponse",response)
                setLoading(false);
                res.push(response.data.details);
                setKyc(res);
            })
            .catch((err) => console.log(err));
    };

    const handleBank = (index) => {
        handleOpen();
        setPreviousData(customers[index]);
        setPage('Bank');
    };

    const handleAgreement = (index) => {
        handleOpen();
        setPreviousData(customers[index]);
        setPage('Agreement');
    };

    const data = isSearch ? searches : customers;
    // console.log(data, isSearch);

    const handleActiveChange = (id, value) => {
        console.log(id, value);
        
    };

    tableData = data?.map((customer, i) => ({
        id: i + 1,
        name: customer?.fullname,
        email: customer?.email,
        contactNumber: customer?.contactNumber,
        city: customer?.city,
        joiningDate: format(new Date(`${customer.createdAt}`), 'yyyy-MM-dd'),
        status: <Switch size="small" defaultChecked={customer.active} onChange={(value) => handleActiveChange(customer._id, value)} />,
        action: (
            <div className={classes.actionsContainer}>
                <IconButton title="KYC" onClick={() => handleKyc(customer._id)}>
                    <IconUserCheck />
                </IconButton>
                <IconButton title="Bank Details" onClick={() => handleBank(i)}>
                    <IconBuildingBank />
                </IconButton>
                <IconButton title="Agreement" onClick={() => handleAgreement(i)}>
                    <IconLicense />
                </IconButton>
                <IconButton title="Edit" onClick={() => handleEdit(i)}>
                    <IconEdit />
                </IconButton>
            </div>
        )
    }));

    return (
        <>
            {page === 'Agreement' && (
                <Agreement
                    handleClose={handleClose}
                    open={open}
                    setIsUpdateTable={setIsUpdateTable}
                    previousData={previousData}
                    page={page}
                />
            )}
            {page === 'Bank' && (
                <Bank handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} previousData={previousData} page={page} />
            )}
            {page === 'KYC' && <KYC handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} kyc={kyc} page={page} />}
            {page === 'Edit' && (
                <EditCustomer handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} previousData={previousData} />
            )}

            <div>
                <SubCard
                    title={loading ? <CircularProgress color="secondary" /> : 'Customers'}
                    secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField onKeyUp={handleKeyUpSearch} label="Search by Name..." color="secondary" size="small" />
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <Select
                                    size="small"
                                    value={active}
                                    onChange={handleActive}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <em>Select Active/InActive</em>
                                    </MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">InActive</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                            </FormControl>
                        </Box>
                    }
                >
                    {customers.length <= 0 ? (
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
                        <CommonTable column={column} data={tableData} setBanner={setCustomers} setIsUpdateTable={setIsUpdateTable} />
                    )}
                </SubCard>
            </div>
        </>
    );
};

export default Customers;
