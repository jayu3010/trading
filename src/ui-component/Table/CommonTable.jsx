/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Box, CircularProgress, Modal, Switch } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import config from 'config';
import { format } from 'date-fns';
import { useState } from 'react';
import swal from 'sweetalert';
import SubCard from 'ui-component/cards/SubCard';
import MainTable from 'ui-component/Table/MainTable';
import Classes from './style.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4
};

const CommonTable = ({ data, setUpdateBannerTable, column, page }) => {
    const [isDeleting, setIsDeleting] = useState({ value: false, id: null });
    const [openAddBanner, setOpenAddBanner] = useState(false);

    const handleDelete = (id) => {
        setIsDeleting({ value: true, id });
        swal({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this banner!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                fetch(`${config.apiBaseUrl}/banner/delete-banner/${id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.error) {
                            setUpdateBannerTable((prevState) => !prevState);
                            setIsDeleting({});
                            swal('Poof! Banner has been deleted!', {
                                icon: 'success'
                            });
                        }
                    })
                    .catch(() => {
                        swal('Something went wrong');
                        setIsDeleting({});
                    });
            } else {
                setIsDeleting({});
            }
        });
    };

    return (
        <>
            <MainTable data={data} titles={column} pge={page} />
            <Modal
                open={openAddBanner}
                onClose={() => setOpenAddBanner(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <SubCard title="Requesting for status change..">
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress color="secondary" />
                        </Box>
                    </SubCard>
                </Box>
            </Modal>
        </>
    );
};

export default CommonTable;
