import { TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddPartNumberModal from "./add-partnumber";
import EditPartNumberModal from "./edit-partnumber";
import DropdownMenu from "../dropdown";
import axios from "axios";


type PartNumber = {
    id: number,
    part_number: string,
    ecn_number: string,
    material: string,
}

export default async function PartNumber() {
    const { data } = await axios.get('http://localhost:3000/part-number')
    return (
        <>
            <div className="flex flex-row">
                <div className="w-1/2 pl-10 mt-5">
                    <div className="flex flex-row mb-5 justify-end items-center gap-x-2">
                        <AddPartNumberModal />
                        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />
                        <DropdownMenu />
                    </div>
                    <table className="table-fixed border border-slate-500">
                        <caption className="caption-top bg-blue-500 py-2 font-bold text-white">
                            List of part numbers
                        </caption>
                        <thead className="border border-slate-500 text-left">
                            <tr>
                                <th className="w-52">Part number</th>
                                <th className="w-52">ECN number</th>
                                <th className="w-52">Material</th>
                                <th className="w-52">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((part: PartNumber) => (
                                <tr key={part.id}>
                                    <td className="p-2">{part.part_number}</td>
                                    <td>{part.ecn_number}</td>
                                    <td>{part.material}</td>
                                    <td>
                                        <div className="flex flex-row gap-x-2">
                                            <EditPartNumberModal data={[part.id,part.part_number,part.ecn_number,part.material]}/>
                                            <button className="text-red-500 border border-red-500 rounded"><DeleteIcon /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="w-52">XXXX-XXXXX</td>
                                <td className="w-52">XXXX-XXXXX</td>
                                <td className="w-52">XXXX-XXXXX</td>
                                <td className="w-52">
                                    <div className="flex flex-row gap-x-2">
                                        <button className="text-red-500 border border-red-500 rounded"><DeleteIcon /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

{/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Part number</TableCell>
                                    <TableCell>ECN number</TableCell>
                                    <TableCell>Material</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={0}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">XXXX-XXXXX</TableCell>
                                    <TableCell>XXXX-XXXXX</TableCell>
                                    <TableCell>XXXX-XXXXX</TableCell>
                                    <TableCell>
                                        <div className="flex flex-row gap-x-2">
                                            <button className="text-blue-500 border border-blue-500 rounded"><EditIcon /></button>
                                            <button className="text-red-500 border border-red-500 rounded"><DeleteIcon /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer> */}