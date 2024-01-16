'use client'
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { updateUser } from '../actions';
import toast, { Toaster } from 'react-hot-toast';
import { useFormStatus,useFormState } from 'react-dom';
import EditIcon from '@mui/icons-material/Edit';

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

enum UserRole{
    Admin,
    QA,
    QC
}
function UpdateButton(){
    const {pending} = useFormStatus()
    return(
        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded' aria-disabled={pending}>{pending ? 'Updating...':"Update"}</button>
    )
}

export default function EditAccount({data}:{data:[number,string,string,UserRole]}) {
    const [state,formAction] = useFormState(updateUser,"")
    // const [usernameForm,setUsernameForm] = useState(username)
    // const [nameForm,setNameForm] = useState(name)
    // const [passwordForm,setPasswordForm] = useState("")
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Toaster position={'top-center'}/>
            <button onClick={handleOpen} className='h-full text-blue-500 border border-blue-500 rounded'><EditIcon/></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Edit Account</p>
                    <form action={async(formData)=>{
                        formAction(formData)
                    }} className='flex flex-col gap-y-5 p-4'>
                        <div className='grid grid-cols-1 gap-y-3'>
                            <input type="hidden" name="id" value={data[0]} />
                            <TextField label="Username" variant="outlined" size='small' id='username' name='username' defaultValue={data[1]} required/>
                            <FormControl variant="outlined" size='small'>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name='password'
                                    defaultValue={""}
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
                            <TextField label="Name" variant="outlined" size='small' id='name' name='name' defaultValue={data[2]} required/>
                            {/* <TextField label="Position" variant="outlined" size='small' id='position' name='position'/> */}
                            <select name="position" id="position" className='border border-gray-400 border-solid rounded text-gray-500 p-2' defaultValue={data[3]} required>
                                <option value="Admin">Admin</option>
                                <option value="QC">Quality control</option>
                                <option value="QA">Quality assurance</option>
                            </select>
                        </div>
                        <UpdateButton/>
                        <p className='self-center'>{state}</p>
                    </form>
                </Box>
            </Modal>
        </>
    )
}