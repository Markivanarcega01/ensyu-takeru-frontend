'use client'

import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormState } from 'react-dom'
import { createEntry, getEntries } from "../actions";
import toast from "react-hot-toast";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    borderRadius: '10px',
    overflow: 'scroll'
};
type PartNumber = {
    id: number,
    part_number: string
}

export default function AddEntryModal({ data }: { data: [] }) {
    const [open, setOpen] = useState(false);
    const [button, setButton] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //const [state, formAction] = useFormState(createEntry, "")
    const ref = useRef<HTMLFormElement>(null)


    return (
        <>
            <Button onClick={handleOpen} size='small' variant='outlined'>Add Entry</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Change point entry</p>
                    <form ref={ref} action={async(formData) => {
                        const result = createEntry(formData)
                        if((await result).state != 'ok'){
                            return toast.error('Failed to process entry')
                        }
                        ref.current?.reset()
                        return toast.success('Added Successfully')
                    }} className='flex flex-col gap-y-5 p-4'>
                        <div className='grid grid-cols-2 gap-2'>
                            <label htmlFor="partnumber" className="pl-2 self-center">Part Number</label>
                            <select name="partnumber" id="partnumber" defaultValue={'default'} className='border border-gray-400 border-solid rounded pl-2 text-gray-500 h-10'>
                                <option disabled value={'default'}>Choose Part no.</option>
                                {data.map((data: PartNumber) => (
                                    <option value={data.id} key={data.id}>{data.part_number}</option>
                                ))}
                            </select>
                            <label htmlFor="etrformula" className="pl-2 self-center">ETR Formula</label>
                            <input type="text" placeholder='ETR formula' id="etrformula" name="etrformula" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="curingtime" className="pl-2 self-center">Curing Time</label>
                            <input type="number" placeholder="30(seconds)" id="curingtime" name="curingtime" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="settingtemphigh" className="pl-2 self-center">Setting Temp high</label>
                            <input type="number" placeholder="100(celcius)" id="settingtemphigh" name="settingtemphigh" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="settingtemplow" className="pl-2 self-center">Setting Temp low</label>
                            <input type="number" placeholder="100(celcius)" id="settingtemplow" name="settingtemplow" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="actualtemphigh" className="pl-2 self-center">Actual Temp high</label>
                            <input type="number" placeholder="180(celcius)" id="actualtemphigh" name="actualtemphigh" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="actualtemplow" className="pl-2 self-center">Actual Temp low</label>
                            <input type="number" placeholder="180(celcius)" id="actualtemplow" name="actualtemplow" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="changepoint" className="pl-2 self-center">Change Point</label>
                            <input type="date" id="changepoint" name="changepoint" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="initialtrial" className="pl-2 self-center">Initial Trial</label>
                            <input type="date" id="initialtrial" name="initialtrial" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="commentontrial" className="pl-2 self-center">Comment on Trial</label>
                            <input type="text" id="commentontrial" name="commentontrial" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="massproduction" className="pl-2 self-center">Mass production</label>
                            <input type="date" id="massproduction" name="massproduction" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="remarks" className="pl-2 self-center">Remarks</label>
                            <input
                                type="text"
                                id="remarks"
                                name="remarks"
                                placeholder="Remarks"
                                className='border border-gray-400 border-solid rounded pl-2 text-black h-10'
                            />
                        </div>
                        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded'>Save</button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}