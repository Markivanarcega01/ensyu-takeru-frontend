'use client'

import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormState } from 'react-dom'
import { editEntry } from "../actions";
import EditIcon from '@mui/icons-material/Edit';
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


export default function EditEntryModal(
    { data, id, partNumber, etr, curing, temphigh, templow, acthigh, actlow, change, initrial, comtrial, masspro, remarks }: 
    { data: [], id: number, partNumber: string, etr: string, curing: number, temphigh: number, templow: number, acthigh: number, actlow: number, change: string, initrial: string, comtrial: string, masspro: string, remarks: string }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //const [state, formAction] = useFormState(createEntry, initialState)
    return (
        <>
            <button onClick={handleOpen} className='h-full text-blue-500 border border-blue-500 rounded'><EditIcon /></button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className='bg-blue-500 p-4 rounded-t-md text-white'>Edit Change point entry</p>
                    <form action={async (formData) => {
                        const result = editEntry(formData)
                        if ((await result).state != 'ok') {
                            return toast.error('Failed to update entry')
                        }
                        return toast.success('Updated Successfully')
                    }} className='flex flex-col gap-y-5 p-4'>
                        <div className='grid grid-cols-2 gap-2'>
                            <input type="hidden" value={id} name="id"/>
                            <label htmlFor="partnumber" className="pl-2 self-center">Part Number</label>
                            <select name="partnumber" id="partnumber" defaultValue={partNumber} className='border border-gray-400 border-solid rounded pl-2 text-gray-500 h-10'>
                                {/* <option disabled value={partNumber} className="italic font-bold">{partNumber}</option> */}
                                {data.map((data: PartNumber) => (
                                    <option value={data.id} key={data.id}>{data.part_number}</option>
                                ))}
                            </select>
                            <label htmlFor="etrformula" className="pl-2 self-center">ETR Formula</label>
                            <input defaultValue={etr} type="text" placeholder='ETR formula' id="etrformula" name="etrformula" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="curingtime" className="pl-2 self-center">Curing Time</label>
                            <input defaultValue={curing} type="number" placeholder="30(seconds)" id="curingtime" name="curingtime" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="settingtemphigh" className="pl-2 self-center">Setting Temp high</label>
                            <input defaultValue={temphigh} type="number" placeholder="100(celcius)" id="settingtemphigh" name="settingtemphigh" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="settingtemplow" className="pl-2 self-center">Setting Temp low</label>
                            <input  defaultValue={templow} type="number" placeholder="100(celcius)" id="settingtemplow" name="settingtemplow" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="actualtemphigh" className="pl-2 self-center">Actual Temp high</label>
                            <input  defaultValue={acthigh} type="number" placeholder="180(celcius)" id="actualtemphigh" name="actualtemphigh" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="actualtemplow" className="pl-2 self-center">Actual Temp low</label>
                            <input defaultValue={actlow} type="number" placeholder="180(celcius)" id="actualtemplow" name="actualtemplow" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="changepoint" className="pl-2 self-center">Change Point</label>
                            <input defaultValue={change} type="date" id="changepoint" name="changepoint" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="initialtrial" className="pl-2 self-center">Initial Trial</label>
                            <input defaultValue={initrial} type="date" id="initialtrial" name="initialtrial" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="commentontrial" className="pl-2 self-center">Comment on Trial</label>
                            <input defaultValue={comtrial} type="text" id="commentontrial" name="commentontrial" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="massproduction" className="pl-2 self-center">Mass production</label>
                            <input defaultValue={masspro} type="date" id="massproduction" name="massproduction" className='border border-gray-400 border-solid rounded pl-2 text-black h-10' />

                            <label htmlFor="remarks" className="pl-2 self-center">Remarks</label>
                            <input
                                defaultValue={remarks}
                                type="text"
                                id="remarks"
                                name="remarks"
                                placeholder="Remarks"
                                className='border border-gray-400 border-solid rounded pl-2 text-black h-10'
                            />
                        </div>
                        <button className='bg-green-500 text-white mx-auto px-4 py-2 rounded' type="submit">Save</button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}