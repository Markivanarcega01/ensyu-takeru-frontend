'use client'
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser } from '../actions';
import toast from 'react-hot-toast';
import { useFormStatus, useFormState } from 'react-dom';

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


function SaveButton() {
    const { pending } = useFormStatus()
    return (
        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded' aria-disabled={pending}>{pending ? 'Adding...' : "Save"}</button>
    )
}
export default function AddAccount() {
    const [state, formAction] = useFormState(createUser, "")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const ref = useRef<HTMLFormElement>(null)

    return (
        <>
            <Button onClick={handleOpen} size='small' variant='outlined' className='h-full'>Add Account</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Add Account</p>
                    <form ref={ref} action={(formData) => {
                        formAction(formData)
                        ref.current?.reset()
                    }} className='flex flex-col gap-y-5 p-4'>
                        <div className='grid grid-cols-1 gap-y-3'>
                            <TextField label="Username" variant="outlined" size='small' id='username' name='username' />
                            <FormControl variant="outlined" size='small'>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <TextField label="Name" variant="outlined" size='small' id='name' name='name' />
                            {/* <TextField label="Position" variant="outlined" size='small' id='position' name='position'/> */}
                            <select name="position" id="position" className='border border-gray-400 border-solid rounded text-gray-500 p-2' defaultValue={'default'}>
                                <option disabled value={'default'}>Choose position...</option>
                                <option value="Admin">Admin</option>
                                <option value="QC">Quality control</option>
                                <option value="QA">Quality assurance</option>
                            </select>
                        </div>
                        <SaveButton/>
                        <p className='self-center'>{state}</p>
                    </form>
                </Box>
            </Modal>
        </>
    )
}