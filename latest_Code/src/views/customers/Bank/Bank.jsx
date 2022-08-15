/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton, Divider, FormControl, Select, MenuItem, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { IconEdit, IconX } from '@tabler/icons';
import CommonTable from 'ui-component/Table/CommonTable';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { makeStyles } from '@mui/styles';
import SubCard from 'ui-component/cards/SubCard';
import EditBank from './EditBank';

let tableData = [];
const column = ['Bank Name', 'IFSC Code', 'Branch Name', 'Account Number', 'Action'];

const style = {
    position: 'relative',
    top: '20%',
    width: '90%',
    margin: '5%'
};

const useStyles = makeStyles((theme) => ({
    actionsContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end'
    }
}));

const Bank = ({ handleClose, open, previousData, page }) => {
    console.log("previousData",previousData)
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [searches, setSearches] = useState([]);
    const [previousDataBank, setPreviousDataBank] = useState(null);
    const [openBank, setOpenBank] = useState('');

    const handleOpenBank = () => {
        setPreviousDataBank(null);
        setOpenBank(true);
    };

    const handleCloseBank = () => setOpenBank(false);
    useEffect(() => {
        /* eslint-disable no-underscore-dangle */
        setLoading(true);
        axios
            .post(`http://43.204.210.119/api/bank-details/get-by-bidder`, { bidder: previousData._id })
            .then((response) => {
                setLoading(false);
                const res = [];
                res.push(response.data.details);
                setCustomers(res);
            })
            .catch((err) => console.log(err));

        // setLoading(true);
        // setLoading(false);
        // setCustomers([
        //     {
        //         bankName: 'Bank of India',
        //         ifscCode: '456789',
        //         branchName: 'Area',
        //         accountNumber: '9716145198'
        //     }
        // ]);

        // axios
        //     .get(`/customer`)
        //     .then((response) => {
        //         setLoading(false);
        //         setCustomers(response.data.customerList);
        //     })
        //     .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const handleEdit = (index) => {
        handleOpenBank();
        setPreviousDataBank(customers[index]);
    };

    const data = isSearch ? searches : customers;
    console.log(data, isSearch);

    tableData = data?.map((customer, i) => ({
        bankName: customer?.bank,
        ifscCode: customer?.ifsc,
        branchName: customer?.branch,
        accountNumber: customer?.accountNumber,
        action: (
            <div className={classes.actionsContainer}>
                <IconButton title="Edit" onClick={() => handleEdit(i)}>
                    <IconEdit />
                </IconButton>
            </div>
        )
    }));

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
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
                        <CommonTable
                            column={column}
                            data={tableData}
                            setBanner={setCustomers}
                            setIsUpdateTable={setIsUpdateTable}
                            page={page}
                        />
                    )}
                </Box>
            </Modal>
            <EditBank handleClose={handleCloseBank} open={openBank} setIsUpdateTable={setIsUpdateTable} previousData={previousDataBank} />
        </>
    );
};

export default Bank;
