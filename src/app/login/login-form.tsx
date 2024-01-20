'use client'

import { useFormState } from 'react-dom'
import { useTransition } from 'react'
import { loginForm } from '../actions'
import React, { useEffect, useState } from 'react'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast'

function SubmitButton() {

    return (
        <button type='submit' className='bg-green-500 p-2 rounded mx-5'>
            Login
        </button >
    )
}

export function LoginForm() {
    //const [state,formAction] = useFormState(loginForm,'')
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <form action={async (formData) => {
            const result = loginForm(formData)
            if ((await result).state == 'Failed') {
                return toast.error('Invalid credentials', {
                    duration: 3000
                })
            }
            // toast.promise(
            //     result,
            //     {
            //       loading: 'Loading',
            //       success: (data) => 'Login successfully',
            //       error: (err) => 'Login failed',
            //     },
            //   );

        }} className='flex flex-col w-max gap-y-5'>
            <TextField id="username" label="Username" variant="outlined" name='username' value={username} onChange={e => setUsername(e.target.value)} required />
            <FormControl variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <SubmitButton />
            {/* <p className='self-center'>{state}</p> */}
        </form>
    )
}
