'use client'

import { useFormState, useFormStatus } from "react-dom"
import { deletePartNumber } from "../actions"
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";

function DeleteButton(){
    const {pending} = useFormStatus()
    return(
        <button className="text-red-500 border border-red-500 rounded" onClick={()=>toast.success('Part no. deleted')}><DeleteIcon /></button>
    )
}

export default function DeletePartNumber({id}:{id:number}){
    const [state,formAction] = useFormState(deletePartNumber,'')
    return(
        <>
        <form action={formAction}>
            <input type='hidden' name="id" value={id}/>
            <DeleteButton/>
        </form>
        </>
    )
}