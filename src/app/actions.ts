'use server'

import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"

export async function loginForm(formData: FormData) {
    const token = cookies()
    const username = formData.get('username')
    const password = formData.get('password')
    try {
        const { data } = await axios.post('http://localhost:3000/users/login', {
            username: username,
            password: password
        })
        if (data.username) {
            token.set({
                name: 'token',
                value: data.id,
                httpOnly: true
            })
        } else {
            return {state:'Failed'}
        }
    } catch (error) {
        return {state:'Failed'}
    }
    redirect('/homepage')
}

export async function verifyToken(token: string) {
    const id = parseInt(token)
    try {
        //const id: number = parseInt(token?.value!) / 1
        const { data } = await axios.get(`http://localhost:3000/users/${id}`)
        console.log(data)
        if (data.username) {
            return true
        }
        return false
    } catch (error: any) {
        console.log(error)
        return false
    }
}

export async function logoutUser() {
    const token = cookies()
    token.delete('token')
    redirect('/login')

}

//Start User.........................................................................


export async function getUsers() {
    const { data } = await axios.get('http://localhost:3000/users')
    return data
}

export async function createUser(state: string, formData: FormData) {

    const dataFromUserForm: any = {
        username: formData.get('username')?.toString().trim(),
        password: formData.get('password')?.toString().trim(),
        name: formData.get('name')?.toString().trim(),
        position: formData.get('position')?.toString()
    }
    for (const property in dataFromUserForm) {
        // console.log(dataFromUserForm[property])
        if (!dataFromUserForm[property]) {
            return state = 'Fields are missing'
        }
    }
    try {
        const { data } = await axios.post('http://localhost:3000/users', {
            username: dataFromUserForm.username,
            password: dataFromUserForm.password,
            name: dataFromUserForm.name,
            position: dataFromUserForm.position
        })
        revalidatePath('/accounts')
        return state = data
    } catch (error: any) {
        console.log(error)
        return state = 'Error'
    }
}

export async function updateUser(state: string, formData: FormData) {
    const id = formData.get('id')

    const dataFromUserForm: any = {
        username: formData.get('username')?.toString().trim(),
        password: formData.get('password')?.toString().trim(),
        name: formData.get('name')?.toString().trim(),
        position: formData.get('position')?.toString()
    }

    for (const property in dataFromUserForm) {
        //console.log(dataFromUserForm[property])
        if (!dataFromUserForm.password) {

        } else if (!dataFromUserForm[property]) {
            return state = 'Some fields are invalid'
        }
    }
    try {
        const { data } = await axios.patch(`http://localhost:3000/users/${id}`, {
            username: dataFromUserForm.username,
            password: dataFromUserForm.password,
            name: dataFromUserForm.name,
            position: dataFromUserForm.position
        })
        //console.log(data)
        revalidatePath('/accounts')
        return state = data
    } catch (error: any) {
        console.log('error')
        return state = 'Error'
    }
}

export async function deleteUser(state: string, formData: FormData) {
    const id = formData.get('id')
    try {
        const data = axios.delete(`http://localhost:3000/users/${id}`)
        revalidatePath('/accounts')
        return state = 'User successfully deleted'
    } catch (error: any) {
        console.log(error)
        return state = 'Error in request'
    }
}
//End User........................................................................

//Part number....................................................................
export async function getPartNumbers(): Promise<[]> {
    const { data } = await axios.get('http://localhost:3000/part-number')
    return data
}

export async function createPartNumber(state: string, formData: FormData) {
    const dataFromUserForm: any = {
        partNumber: formData.get('partNumber')?.toString().trim(),
        formula: formData.get('formula')?.toString().trim(),
        material: formData.get('material')?.toString().trim(),
    }
    for (const property in dataFromUserForm) {
        // console.log(dataFromUserForm[property])
        if (!dataFromUserForm[property]) {
            return state = 'Fields are missing'
        }
    }
    try {
        const { data } = await axios.post('http://localhost:3000/part-number', {
            part_number: dataFromUserForm.partNumber,
            ecn_number: dataFromUserForm.formula,
            material: dataFromUserForm.material
        })
        state = data
        revalidatePath('/part-number')
        return state
    } catch (error) {
        return 'Error in creating a part number'
    }
}

export async function updatePartNumber(state: string, formData: FormData) {
    const id = formData.get('id')
    const dataFromUserForm: any = {
        partNumber: formData.get('partNumber')?.toString().trim(),
        formula: formData.get('formula')?.toString().trim(),
        material: formData.get('material')?.toString().trim(),
    }
    for (const property in dataFromUserForm) {
        // console.log(dataFromUserForm[property])
        if (!dataFromUserForm[property]) {
            return state = 'Fields are missing'
        }
    }
    try {
        const { data } = await axios.patch(`http://localhost:3000/part-number/${id}`, {
            part_number: dataFromUserForm.partNumber,
            ecn_number: dataFromUserForm.formula,
            material: dataFromUserForm.material
        })
        state = data
        revalidatePath('/part-number')
        return state
    } catch (error) {
        return 'Error in updating a part number'
    }
}

export async function deletePartNumber(state: string, formData: FormData) {
    const id = formData.get('id')
    try {
        const data = axios.delete(`http://localhost:3000/part-number/${id}`)
        revalidatePath('/part-number')
        return state = 'Part number successfully deleted'
    } catch (error: any) {
        console.log(error)
        return state = 'Error in request'
    }
}

//End of part number........................................................................


//Start of ChangePoint Entry................................................................

export async function getEntries(): Promise<[]> {
    const { data } = await axios.get('http://localhost:3000/change-point')
    //console.log(typeof(data[0].change_point))
    return data
}


export async function createEntry(formData: FormData) {
    const userId = parseInt(cookies().get('token')?.value!)
    const dataFromUserForm: any = {
        partNumber: formData.get('partnumber')?.toString().trim(),
        etrformula: formData.get('etrformula')?.toString().trim(),
        curingtime: formData.get('curingtime')?.toString().trim(),
        settingtemphigh: formData.get('settingtemphigh')?.toString().trim(),
        settingtemplow: formData.get('settingtemplow')?.toString().trim(),
        actualtemphigh: formData.get('actualtemphigh')?.toString().trim(),
        actualtemplow: formData.get('actualtemplow')?.toString().trim(),
        changepoint: formData.get('changepoint')?.toString().trim(),
        initialtrial: formData.get('initialtrial')?.toString().trim(),
        commentontrial: formData.get('commentontrial')?.toString().trim(),
        massproduction: formData.get('massproduction')?.toString().trim(),
        remarks: formData.get('remarks')?.toString().trim(),
    }
    for (const property in dataFromUserForm) {
        // console.log(dataFromUserForm[property])
        if (!dataFromUserForm[property]) {
            return { state: 'Fields are missing' }
        }
    }
    try {
        const { data } = await axios.post('http://localhost:3000/change-point', {
            part_number: dataFromUserForm.partNumber,
            createdByUser: userId,
            etr_formula_code: dataFromUserForm.etrformula,
            curing_time: dataFromUserForm.curingtime,
            setting_temp_high: dataFromUserForm.settingtemphigh,
            setting_temp_low: dataFromUserForm.settingtemplow,
            actual_temp_high: dataFromUserForm.actualtemphigh,
            actual_temp_low: dataFromUserForm.actualtemplow,
            change_point: dataFromUserForm.changepoint,
            initial_trial: dataFromUserForm.initialtrial,
            comment_trial: dataFromUserForm.commentontrial,
            mass_production: dataFromUserForm.massproduction,
            remarks: dataFromUserForm.remarks
        })
        //console.log(data)
        revalidatePath('/homepage')
        //console.log({userId, partNumber, etrformula, curingtime, settingtemp, actualtemp, changepoint, initialtrial, commentontrial, massproduction, remarks })
        return { state: 'ok' }
    } catch (error) {
        console.log('Error')
        return { state: 'failed' }
    }
}

export async function editEntry(formData: FormData) {
    const userId = parseInt(cookies().get('token')?.value!)
    const id = formData.get('id')
    const dataFromUserForm: any = {
        partNumber: formData.get('partnumber')?.toString().trim(),
        etrformula: formData.get('etrformula')?.toString().trim(),
        curingtime: formData.get('curingtime')?.toString().trim(),
        settingtemphigh: formData.get('settingtemphigh')?.toString().trim(),
        settingtemplow: formData.get('settingtemplow')?.toString().trim(),
        actualtemphigh: formData.get('actualtemphigh')?.toString().trim(),
        actualtemplow: formData.get('actualtemplow')?.toString().trim(),
        changepoint: formData.get('changepoint')?.toString().trim(),
        initialtrial: formData.get('initialtrial')?.toString().trim(),
        commentontrial: formData.get('commentontrial')?.toString().trim(),
        massproduction: formData.get('massproduction')?.toString().trim(),
        remarks: formData.get('remarks')?.toString().trim(),
    }
    for (const property in dataFromUserForm) {
        // console.log(dataFromUserForm[property])
        if (!dataFromUserForm[property]) {
            return { state: 'Fields are missing' }
        }
    }
    try {
        const { data } = await axios.patch(`http://localhost:3000/change-point/${id}`, {
            part_number: dataFromUserForm.partNumber,
            createdByUser: userId,
            etr_formula_code: dataFromUserForm.etrformula,
            curing_time: dataFromUserForm.curingtime,
            setting_temp_high: dataFromUserForm.settingtemphigh,
            setting_temp_low: dataFromUserForm.settingtemplow,
            actual_temp_high: dataFromUserForm.actualtemphigh,
            actual_temp_low: dataFromUserForm.actualtemplow,
            change_point: dataFromUserForm.changepoint,
            initial_trial: dataFromUserForm.initialtrial,
            comment_trial: dataFromUserForm.commentontrial,
            mass_production: dataFromUserForm.massproduction,
            remarks: dataFromUserForm.remarks
        })
        //console.log(data)
        revalidatePath('/homepage')
        //console.log({userId, partNumber, etrformula, curingtime, settingtemp, actualtemp, changepoint, initialtrial, commentontrial, massproduction, remarks })
        return { state: 'ok' }
    } catch (error) {
        console.log('Error')
        return { state: 'failed' }
    }
}

export async function deleteEntry(formData:FormData){
    const id = formData.get('id')
    try {
        const data = axios.delete(`http://localhost:3000/change-point/${id}`)
        revalidatePath('/homepage')
        return {state : 'Successfully deleted'}
    } catch (error: any) {
        console.log(error)
        return {state : 'Error in request'}
    }
}



//End of ChangePoint Entry...............................................................