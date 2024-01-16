'use client'

import { useFormState, useFormStatus } from "react-dom"
import { deleteUser } from "../actions"
import DeleteIcon from '@mui/icons-material/Delete';
import toast from "react-hot-toast";

function DeleteButton(){
    const {pending} = useFormStatus()
    return(
        <button className="text-red-500 border border-red-500 rounded" onClick={()=>toast.success('User deleted')}><DeleteIcon /></button>
    )
}

export default function DeleteAccount({id}:{id:number}){
    const [state,formAction] = useFormState(deleteUser,'')
    return(
        <>
        <form action={formAction}>
            <input type='hidden' name="id" value={id}/>
            <DeleteButton/>
        </form>
        </>
    )
}