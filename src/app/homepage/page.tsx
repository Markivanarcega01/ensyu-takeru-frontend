import { TextField } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import AddEntryModal from "./add-entry";
import EditEntryModal from "./edit.entry";
import DropdownMenu from "../dropdown";
import { Toaster } from "react-hot-toast";



export default function Homepage() {
    return (
        <main>
            <Toaster position="bottom-right"/>
            <div className="flex flex-row gap-x-7 mt-5 mb-2 pr-5 items-center justify-end">
                {/* <select name="filterByChangePoint" id="filterByChangePoint" defaultValue={'default'} className="border-2 rounded">
                    <option disabled value={'default'}>Filter by change point</option>
                    <option value="2019">2019</option>
                    <option value="2019">2020</option>
                    <option value="2019">2021</option>
                    <option value="2019">2022</option>
                    <option value="2019">2023</option>
                </select>
                <select name="filterByCuring" id="filterByCuring" defaultValue={'default'} className="border-2 rounded">
                    <option disabled value={'default'}>Filter by curing</option>
                    <option value="2019">2019</option>
                    <option value="2019">2020</option>
                    <option value="2019">2021</option>
                    <option value="2019">2022</option>
                    <option value="2019">2023</option>
                </select>
                <select name="filterByActualTemp" id="filterByActualTemp" defaultValue={'default'} className="border-2 rounded">
                    <option disabled value={'default'}>Filter by actual temp</option>
                    <option value="2019">2019</option>
                    <option value="2019">2020</option>
                    <option value="2019">2021</option>
                    <option value="2019">2022</option>
                    <option value="2019">2023</option>
                </select> */}
                {/* <Link href={'/part-number'}><button className="border bg-blue-300 px-2 rounded">Part no.</button></Link>
                <Link href={'/accounts'}><button className="border bg-green-300 px-2 rounded">Accounts</button></Link> */}
                <AddEntryModal />
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />
                <DropdownMenu />
                {/* <button className="bg-red-500 text-white rounded px-2">Logout</button> */}
            </div>
            <div className="pl-10 pr-5">
                <table className="table-fixed border border-slate-500">
                    <caption className="caption-top bg-blue-500 py-2 font-bold text-white">
                        Change points
                    </caption>
                    <thead className="border border-slate-500 text-left text-sm">
                        <tr>
                            <th className="pr-4">Part No.</th>
                            <th className="pr-4">ECN No.</th>
                            <th className="pr-4">Material</th>
                            <th className="pr-4">ETR Formula</th>
                            <th className="pr-4">Curing Time</th>
                            <th className="pr-4">Setting Temp</th>
                            <th className="pr-4">Actual Temp</th>
                            <th className="pr-4">Change Point</th>
                            <th className="pr-4">Initial Trial</th>
                            <th className="pr-4">Comment on Trial</th>
                            <th className="pr-4">Mass Production</th>
                            <th className="pr-4">Remarks</th>
                            <th className="pr-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="pr-4">{'1xxxx-xxxx'}</td>
                            <td className="pr-4">{'2xxxx-xxxx'}</td>
                            <td className="pr-4">{'3xxxx-xxxx'}</td>
                            <td className="pr-4">{'4xxxx-xxxx'}</td>
                            <td className="pr-4">{'5xxxx-xxxx'}</td>
                            <td className="pr-4">{'6xxxx-xxxx'}</td>
                            <td className="pr-4">{'7xxxx-xxxx'}</td>
                            <td className="pr-4">{'8xxxx-xxxx'}</td>
                            <td className="pr-4">{'9xxxx-xxxx'}</td>
                            <td className="pr-4">{'1xxxx-xxxx'}</td>
                            <td className="pr-4">{'2xxxx-xxxx'}</td>
                            <td className="pr-4">{'3xxxx-xxxx'}</td>
                            <td className="pr-4">
                                <div className="flex flex-row gap-x-2">
                                    <EditEntryModal />
                                    <button className="text-red-500 border border-red-500 rounded"><Delete /></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    )
}