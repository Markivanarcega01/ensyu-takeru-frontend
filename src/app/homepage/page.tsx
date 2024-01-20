import { TextField } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import AddEntryModal from "./add-entry";
import EditEntryModal from "./edit.entry";
import DropdownMenu from "../dropdown";
import { Toaster } from "react-hot-toast";
import { getEntries, getPartNumbers } from "../actions";
import DeleteEntry from "./delete-entry";

// {
//     id: 3,
//     etr_formula_code: 'XXX-XXXRev1',
//     curing_time: 150,
//     setting_temp: 180,
//     actual_temp: 200,
//     change_point: '2024-01-18T10:05:08.000Z',
//     initial_trial: 'Passed',
//     comment_trial: 'Good',
//     mass_production: 'Testing',
//     remarks: 'Testing the entry',
//     updatedDate: '2024-01-18T10:05:08.325Z',
//     deletedDate: null,
//     user_id: {
//       id: 1,
//       username: 'markivan1',
//       password: '123',
//       name: 'ivan2',
//       position: 'Admin'
//     },
//     part_number: {
//       id: 3,
//       part_number: 'test7',
//       ecn_number: 'test7',
//       material: 'test7',
//       updatedDate: '2024-01-17T04:36:07.544Z',
//       deletedDate: null
//     }
//   },

type User = {
    id: number,
    username: string,
    password: string,
    name: string,
    position: string
}

type PartNumber = {
    id: number,
    part_number: string,
    ecn_number: string,
    material: string,
    updatedDate: string|null,
    deletedDate: string|null
}

type ChangePoint = {
    id: number,
    etr_formula_code: string,
    curing_time: number,
    setting_temp_high: number,
    setting_temp_low: number,
    actual_temp_high: number,
    actual_temp_low: number,
    change_point: string,
    initial_trial: string,
    comment_trial: string,
    mass_production: string,
    remarks: string,
    updatedDate: string|null,
    deletedDate: string|null,
    user_id:User,
    part_number:PartNumber
}
function dateFormatter(date:string){
    const newDate = date.split('T')[0]
    const [year,month,day]= newDate.split('-')
    const formattedDate = `${month}/${day}/${year}`
    return newDate
}

export default async function Homepage() {
    const data = await getEntries()
    const partNumber = await getPartNumbers()
    return (
        <main>
            <Toaster position="bottom-right" />
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
                <AddEntryModal data={partNumber}/>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" />
                <DropdownMenu />
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
                    {/* style={{display:'block',overflowY:'auto',height:'50vh'}} */}
                    <tbody className="">
                        {data.map((changePoint: ChangePoint) => (
                            <tr key={changePoint.id}>
                                <td className="pr-4">{changePoint.part_number.part_number}</td>
                                <td className="pr-4">{changePoint.part_number.ecn_number}</td>
                                <td className="pr-4">{changePoint.part_number.material}</td>
                                <td className="pr-4">{changePoint.etr_formula_code}</td>
                                <td className="pr-4">{changePoint.curing_time}</td>
                                <td className="pr-4">{changePoint.setting_temp_high}/{changePoint.setting_temp_low}</td>
                                <td className="pr-4">{changePoint.actual_temp_high}/{changePoint.actual_temp_low}</td>
                                <td className="pr-4">{dateFormatter(changePoint.change_point)}</td>
                                <td className="pr-4">{dateFormatter(changePoint.initial_trial)}</td>
                                <td className="pr-4">{changePoint.comment_trial}</td>
                                <td className="pr-4">{dateFormatter(changePoint.mass_production)}</td>
                                <td className="pr-4">{changePoint.remarks}</td>
                                <td className="pr-4">
                                    <div className="flex flex-row gap-x-2">
                                        <EditEntryModal
                                            data={partNumber} 
                                            id={changePoint.id}
                                            partNumber={changePoint.part_number.part_number}
                                            etr={changePoint.etr_formula_code}
                                            curing={changePoint.curing_time}
                                            temphigh={changePoint.setting_temp_high}
                                            templow={changePoint.setting_temp_low}
                                            acthigh={changePoint.actual_temp_high}
                                            actlow={changePoint.actual_temp_low}
                                            change={dateFormatter(changePoint.change_point)}
                                            initrial={dateFormatter(changePoint.initial_trial)}
                                            comtrial={changePoint.comment_trial}
                                            masspro={dateFormatter(changePoint.mass_production)}
                                            remarks={changePoint.remarks}
                                        />
                                        <DeleteEntry id={changePoint.id}/>
                                    </div>
                                </td>
                            </tr>
                        ))}
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
                                    <button><Edit/></button>
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