/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton, Divider, FormControl, Select, MenuItem, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { IconEdit, IconX } from '@tabler/icons';
import CommonTable from 'ui-component/Table/CommonTable';
import { useAxios } from 'hooks';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { makeStyles } from '@mui/styles';
import SubCard from 'ui-component/cards/SubCard';
import EditAgreement from './EditAgreement';

let tableData = [];
const column = ['Agreement Id', 'Url', 'Sign Date', 'Action'];

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

const Agreement = ({ handleClose, open, previousData, page }) => {
    const classes = useStyles();
    const axios = useAxios();
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [isUpdateTable, setIsUpdateTable] = useState(false);
    const [searches, setSearches] = useState([]);
    const [previousDataAgreement, setPreviousDataAgreement] = useState(null);
    const [openAgreement, setOpenAgreement] = useState('');

    const handleOpenAgreement = () => {
        setPreviousDataAgreement(null);
        setOpenAgreement(true);
    };

    const handleCloseAgreement = () => setOpenAgreement(false);

    useEffect(() => {
        // setLoading(true);
        setLoading(false);
        setCustomers([
            {
                agreementId: '456789',
                url: 'http://www.google.com',
                signDate: '22/4/2018'
            }
        ]);

        // axios
        //     .get(`/customer`)
        //     .then((response) => {
        //         setLoading(false);
        //         setCustomers(response.data.customerList);
        //     })
        //     .catch((err) => console.log(err));
    }, [isUpdateTable]);

    const handleEdit = (index) => {
        handleOpenAgreement();
        setPreviousDataAgreement(customers[index]);
    };

    const data = isSearch ? searches : customers;
    console.log(data, isSearch);

    tableData = data?.map((customer, i) => ({
        agreementId: customer?.agreementId,
        url: customer?.url,
        signDate: customer?.signDate,
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
            <EditAgreement
                handleClose={handleCloseAgreement}
                open={openAgreement}
                setIsUpdateTable={setIsUpdateTable}
                previousData={previousDataAgreement}
            />
        </>
    );
};

export default Agreement;
