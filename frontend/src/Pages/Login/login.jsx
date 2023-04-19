import { Input, Tooltip, Button, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useState } from 'react';
const Login = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, serErrorMessage] = useState("")

    const handleLogin = ()=>{
        const userName = document.getElementById("username").value
        const password = document.getElementById("password").value
        console.log(userName, password)
        setLoading(true)
    }
    return(
        <section class="bg-white-50 font-Dongle">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div class="w-full bg-white-50  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-900">
                    <div class=" bg-white-50 p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-4xl text-center text-gray-00 md:text-2xl dark:text-gray-700">
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