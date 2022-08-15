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
const column = ['Sl. No', 'ID', 'Date & Time', 'User ID', 'Name', 'Mobile Number', 'Amount', 'Status', 'Gateway Ref ID', 'IP'];

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const PaymentGatewayReport = () => {
    const classes = useStyles();
    const axios = useAxios();
    const [active, setActive] = useState(true);
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState([]);
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
        // setLoading(true);
        setLoading(false);
        setReport([
            {
                id: '123',
                dateTime: '12/12/2022 11:00 PM',
                userId: 'Abc123',
                name: 'Medha',
                mobileNumber: '1234567890',
                amount: '1234',
                status: 'active',
                gatewayRedId: '1234',
                ip: '10.19.18.17'
            },
            {
                id: '123',
                dateTime: '12/12/2022 11:00 PM',
                userId: 'Abc123',
                name: 'Medha',
                mobileNumber: '1234567890',
                amount: '1234',
                status: 'active',
                gatewayRedId: '1234',
                ip: '10.19.18.17'
            },
            {
                id: '123',
                dateTime: '12/12/2022 11:00 PM',
                userId: 'Abc123',
                name: 'Medha',
                mobileNumber: '1234567890',
                amount: '1234',
                status: 'active',
                gatewayRedId: '1234',
                ip: '10.19.18.17'
            }
        ]);

        // axios
        //     .get(`/customer`)
        //     .then((response) => {
        //         setLoading(false);
        //         setReport(response.data.customerList);
        //     })
        //     .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const data = isSearch ? searches : report;
    console.log(data, isSearch);

    tableData = data?.map((report, i) => ({
        id: i + 1,
        pid: report?.id,
        dateTime: report?.dateTime,
        userId: report?.userId,
        name: report?.name,
        mobileNumber: report?.mobileNumber,
        amount: report?.amount,
        status: report?.status,
        gatewayRedId: report?.gatewayRedId,
        ip: report?.ip
    }));

    return (
        <>
            <div>
                <MainCard title="Payment Gateway Report">
                    <SubCard>
                        {report.length <= 0 ? (
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
                            <CommonTable column={column} data={tableData} setBanner={setReport} setIsUpdateTable={setIsUpdateTable} />
                        )}
                    </SubCard>
                </MainCard>
            </div>
        </>
    );
};

export default PaymentGatewayReport;
