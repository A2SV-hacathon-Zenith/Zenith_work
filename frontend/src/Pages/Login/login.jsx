import { Input, Tooltip, Button, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useState } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import logo from '../../assets/z.png'

const id = reactLocalStorage.get('id')
const Login = ()=>{
    if(id){
        window.location.href = "/"
    }
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, serErrorMessage] = useState("")

    const handleLogin = ()=>{
        setLoading(true)
        const email = document.getElementById("username").value
        const password = document.getElementById("password").value
        const dat = {
            email,
            password, 
        }
        const sendReq = fetch("https://zenith-web.onrender.com/api/v1/auth/login", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dat)
            }).then(async (res)=>{
                res = await res.json()
                console.log(res)
                setLoading(false)
                if(res.success){
                    reactLocalStorage.set('role', res.role);
                    reactLocalStorage.set('name', res.name);
                    reactLocalStorage.set('id', res.id)
                    window.location.href = "/"
                }
                else{
                    setError(true)
                    console.log(res)
                    serErrorMessage(res.error)
                }
                })
                .then(fin=>{
                    console.log(fin)
                })
    }
    return(
        <section class="bg-white-50 font-Dongle">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white-50  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-900">
                    <div class=" bg-white-50 p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='text-center'>
                            <img src={logo} className='h-20' />
                        </div>
                        <h1 class="text-4xl text-center text-gray-00 md:text-2xl dark:text-emerald-700">
                            Login in to Zenith
                        </h1>
                        {error ? <Alert message={errorMessage?errorMessage:"Error Logging in"}  className="text-center" type="error" /> : null}
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>   
                                <Input
                                    placeholder="Enter your username"
                                    className='p-2'
                                    id='username'
                                    status={error?'error':'success'}
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                />
                            </div>
                            <div>
                                <Input
                                        type='password'
                                        id='password'
                                        placeholder="Enter your password"
                                        className='p-2'
                                        status={error?'error':'success'}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                />
                            </div>
                            <div class="flex items-center justify-between">
                                <a href="#" class="text-sm font-medium text-green-600 hover:underline dark:text-green-500">Forgot password?</a>
                            </div>
                            <div className='text-center'>
                                <Button type="primary" loading={loading} onClick={handleLogin} className='text-center w-40'>Login</Button>
                            </div>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            <Divider plain>Don’t have an account yet?</Divider>
                            <div className='text-center'>
                                 <a href="/signup" class="font-medium text-center text-green-600 hover:underline dark:text-green-500">Sign up</a>
                            </div>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
    </section>
    )
}

export default Login