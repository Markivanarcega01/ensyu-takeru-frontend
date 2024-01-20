import { TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddAccount from "./add-account";
import EditAccount from "./edit-account";
import DropdownMenu from "../dropdown";
import axios from "axios";
import DeleteAccount from "./delete-account";
import { Toaster } from "react-hot-toast";
import { getUsers } from "../actions";

enum UserRole{
    Admin,
    QA,
    QC
}

type User = {
    id:number,
    username:string,
    password:string,
    name:string,
    position:UserRole
}

export default async function Accounts() {
    // const { data } = await axios.get('http://localhost:3000/users')
    const data = await getUsers()
    return (
        <div className="pl-10 pr-5 flex flex-col pt-2 gap-y-2">
            <Toaster position={'top-center'} />
            <div className="flex flex-row gap-x-7 items-center justify-end">
                <AddAccount />
                <TextField id="search" label="Search" variant="outlined" className="w-max ml-3" size="small" />
                <DropdownMenu />
            </div>
            <table className="table-auto border border-slate-500">
                <caption className="caption-top bg-blue-500 py-2 font-bold text-white">
                    Accounts
                </caption>
                <thead className="border border-slate-500 text-left">
                    <tr>
                        <th className="p-2">ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user: User) => (
                        <tr key={user.id}>
                            <td className="p-2">{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>
                                <div className="flex flex-row gap-x-2">
                                    <EditAccount data={[user.id,user.username,user.name,user.position]}/>
                                    <DeleteAccount id={user.id}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="p-2">{'xxxxx-xxxx'}</td>
                        <td>{'xxxxx-xxxx'}</td>
                        <td>{'xxxxx-xxxx'}</td>
                        <td>{'xxxxx-xxxx'}</td>
                        <td>{'xxxxx-xxxx'}</td>
                        <td>
                            <div className="flex flex-row gap-x-2">
                                <button className="text-red-500 border border-red-500 rounded"><DeleteIcon /></button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}