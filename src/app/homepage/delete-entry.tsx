'use client'
import { useFormStatus } from "react-dom";
import { deleteEntry } from "../actions";
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton(){
    const {pending} = useFormStatus()
    return(
        <button className="text-red-500 border border-red-500 rounded" onClick={()=>toast.success('Successfully deleted')}><DeleteIcon /></button>
    )
}

export default function DeleteEntry({id}:{id:number}){
    return(
        <>
        <form action={(formData)=>deleteEntry(formData)}>
            <input type='hidden' name="id" value={id}/>
            <DeleteButton/>
        </form>
        </>
    )
}