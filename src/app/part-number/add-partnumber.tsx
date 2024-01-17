'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { createPartNumber } from '../actions';
import { useRef } from 'react';

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

function SaveButton(){
    const {pending} = useFormStatus()
    return(
        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded'>{pending ? 'Saving' : 'Save'}</button>
    )
}

export default function AddPartNumberModal() {
    const [state, formAction] = useFormState(createPartNumber,"")
    const ref = useRef<HTMLFormElement>(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={handleOpen} variant='outlined' size='medium'>Add Entry</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Add Part number</p>
                    <form ref={ref} action={async(formData) => {
                        formAction(formData)
                        ref.current?.reset()
                    }} className='flex flex-col gap-y-5 p-4'>
                        <TextField label="Part number" variant="outlined" size='small' name='partNumber'/>
                        <TextField label="ETR Formula" variant="outlined" size='small' name='formula'/>
                        <TextField label="Material" variant="outlined" size='small' name='material'/>
                        <SaveButton/>
                        <p className='self-center'>{state}</p>
                    </form>
                </Box>
            </Modal>
        </>
    )
}