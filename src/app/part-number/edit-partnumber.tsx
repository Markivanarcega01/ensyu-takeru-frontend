'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useFormState, useFormStatus } from 'react-dom';
import { updatePartNumber } from '../actions';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    borderRadius: '10px'
};

function UpdateButton(){
    const {pending} = useFormStatus()
    return(
        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded'>{pending ? "Updating.." : "Update"}</button>
    )
}

export default function EditPartNumberModal({data}:{data:[number,string,string,string]}) {
    const [state, formAction] = useFormState(updatePartNumber,"")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <button onClick={handleOpen} className='h-full text-blue-500 border border-blue-500 rounded'><EditIcon/></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Edit Part number</p>
                    <form action={async(formData) => {
                        formAction(formData)
                    }} className='flex flex-col gap-y-5 p-4'>
                        <input type="hidden" value={data[0]} name='id'/>
                        <TextField label="Part number" variant="outlined" size='small' defaultValue={data[1]} name='partNumber'/>
                        <TextField label="ETR Formula" variant="outlined" size='small' defaultValue={data[2]} name='formula'/>
                        <TextField label="Material" variant="outlined" size='small' defaultValue={data[3]} name='material'/>
                        <UpdateButton/>
                        <p className='self-center'>{state}</p>
                    </form>
                </Box>
            </Modal>
        </>
    )
}