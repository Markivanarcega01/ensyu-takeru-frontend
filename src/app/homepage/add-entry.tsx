'use client'

import { Box, Button, Modal, TextField } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useFormState } from 'react-dom'
import { createEntry } from "../actions";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    borderRadius: '10px'
};
const initialState = {
    message: '',
}

export default function AddEntryModal(){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [state, formAction] = useFormState(createEntry, initialState)
    return(
        <>
        <Button onClick={handleOpen} size='small' variant='outlined'>Add Entry</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <p className='bg-blue-500 p-4 rounded-t-md text-white'>Change point entry</p>
                <form action={formAction} className='flex flex-col gap-y-5 p-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        <select name="partnumber" id="partnumber" defaultValue={'default'} className='border border-gray-400 border-solid rounded pl-2 text-gray-500'>
                            <option disabled value={'default'}>Choose Part no.</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <TextField label="ETR Formula" variant="outlined" size='small' id="etrformula" name="etrformula"/>
                        <TextField label="Curing Time" variant="outlined" size='small' id="curingtime" name="curingtime"/>
                        <TextField label="Setting temp" variant="outlined" size='small' id="settingtemp" name="settingtemp"/>
                        <TextField label="Actual temp" variant="outlined" size='small' id="actualtemp" name="actualtemp"/>
                        <TextField label="Change point" variant="outlined" size='small' id="changepoint" name="changepoint"/>
                        <TextField label="Initial trial" variant="outlined" size='small' id="initialtrial" name="initialtrial"/>
                        <TextField
                            label="Comment on Trial"
                            multiline
                            rows={4}
                            id="commentontrial" 
                            name="commentontrial"
                        />
                        <TextField label="Mass production" variant="outlined" size='small' id="massproduction" name="massproduction"/>
                        <TextField
                            label="Remarks"
                            multiline
                            rows={4}
                            id="remarks" 
                            name="remarks"
                        />
                    </div>
                    <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded' type="submit">Save</button>
                </form>
            </Box>
        </Modal>
    </>
    )
}