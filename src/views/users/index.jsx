/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Switch, FormControl, Select, MenuItem, TextField } from '@mui/material';
import { IconUser, IconPlus } from '@tabler/icons';
import { format } from 'date-fns';

import config from 'config';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AddUser from './AddUser';
import CommonTable from 'ui-component/Table/CommonTable';
import DropDown from 'ui-component/Table/CustomDropDown';
import { makeStyles } from '@mui/styles';
import { useAxios } from 'hooks';
import swal from 'sweetalert';

let tableData = [];
const column = ['Sl. No', 'Name', 'User Name', 'Email Id', 'Phone No', 'Joined On', 'Actions'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const Users = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [open, setOpen] = useState(false);
    const [searches, setSearches] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [previousData, setPreviousData] = useState(null);
    const [checked, setChecked] = useState(false);
    const handleOpen = () => {
        setPreviousData(null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://43.204.210.119/api/admins`)
            .then((response) => {
                console.log("here",response.data);
                setLoading(false);
                const responsedata = response.data.adminList.sort((a, b) => a?.firstname?.localeCompare(b?.firstname));
                console.log("responsedataresponsedata",responsedata)
                setUsers(responsedata);
            })
            .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const handleKeyUpSearch = (e) => {
        setIsSearch(true);
        console.log(users, 'user');
        const data = users.filter((b) => b?.firstname?.toUpperCase()?.includes(e?.target?.value?.toUpperCase()));
        console.log(data, 'data');
        setSearches(data);
        if (e.target.value === '') setIsSearch(false);
    };

    const handleActive = (e) => {
        console.log('data here of select ', e);

        let active = false;
        if (e.target.value === 'active') active = true;

        setActive(e.target.value);
        setIsSearch(true);

        // eslint-disable-next-line eqeqeq
        const data = users.filter((b) => active === b.active);
        console.log(data, users, e.target.value, 'data');
        setSearches(data);
        if (!e.target.value) setIsSearch(false);
    };

    const data = isSearch ? searches : users;
    console.log(data, isSearch);

    const handleActiveChange = (id, value) => {
        console.log('check here ', id, value.target.checked);
        axios
            .put(`http://43.204.210.119/api/admins/update-active-status/${id}/${value.target.checked}`)
            .then((response) => {
                console.log(response);
                swal('Successfully Update', { icon: 'success' });
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    tableData = data?.map((user, i) => ({
        id: i + 1,
        name: `${user?.firstname} ${user.lastname}`,
        username: user?.username,
        email: user?.email,
        contactNumber: user?.contactNumber,
        createdAt: format(new Date(`${user.createdAt}`), 'yyyy-MM-dd'),
        action: (
            <div className={classes.actionsContainer}>
                <Switch size="small" defaultChecked={user?.active} onChange={(value) => handleActiveChange(user._id, value)} />
            </div>
        )
    }));

    return (
        <>
            <div>
                <MainCard
                    title="Users"
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
                            <Button onClick={handleOpen} variant="contained" color="secondary" size="small" startIcon={<IconPlus />}>
                                Add User
                            </Button>
                        </Box>
                    }
                >
                    <SubCard>
                        {users.length <= 0 ? (
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
                            <CommonTable column={column} data={tableData} setBanner={setUsers} setIsUpdateTable={setIsUpdateTable} />
                        )}
                    </SubCard>
                </MainCard>
            </div>

            <AddUser handleClose={handleClose} open={open} setIsUpdateTable={setIsUpdateTable} />
        </>
    );
};

export default Users;
