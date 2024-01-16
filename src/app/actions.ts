'use server'

import axios from "axios"
import { revalidatePath } from "next/cache"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"


export async function loginForm(state: string, formData: FormData) {
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
            state = 'User successfully login'
        } else {
            state = data
            return state
        }
    } catch (error: any) {
        state = 'Error in request'
        console.log(state)
        return state
    }
    redirect('/homepage')
}

export async function verifyToken(token: string) {
    const id = parseInt(token)
    try {
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

export async function deleteUser(state:string, formData: FormData) {
    const id = formData.get('id')
    try {
        const data = axios.delete(`http://localhost:3000/users/${id}`)
        revalidatePath('/accounts')
        return state = 'User successfully deleted'
    } catch (error : any) {
        console.log(error)
        return state = 'Error in request'
    }
}

//Part number
export async function createPartNumber(state:string,formData:FormData){
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
        const {data} = await axios.post('http://localhost:3000/part-number',{
            part_number:dataFromUserForm.partNumber,
            ecn_number:dataFromUserForm.formula,
            material:dataFromUserForm.material
        })
        state = data
        revalidatePath('/part-number')
        return state
    } catch (error) {
        return 'Error in creating a part number'
    }
}

export async function createEntry(prevState: { message: string }, formData: FormData) {
    try {
        const partNumber = formData.get('partnumber')
        const etrformula = formData.get('etrformula')
        const curingtime = formData.get('curingtime')
        const settingtemp = formData.get('settingtemp')
        const actualtemp = formData.get('actualtemp')
        const changepoint = formData.get('changepoint')
        const initialtrial = formData.get('initialtrial')
        const commentontrial = formData.get('commentontrial')
        const massproduction = formData.get('massproduction')
        const remarks = formData.get('remarks')
        console.log({ partNumber, etrformula, curingtime, settingtemp, actualtemp, changepoint, initialtrial, commentontrial, massproduction, remarks })
        return { message: 'Entry success' }
    } catch (error) {
        return { message: 'Entry failed' }
    }
}