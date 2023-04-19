import { Input, Tooltip, Button, Divider, Alert, Radio, DatePicker  } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useState } from 'react';
import bookImg from '../../assets/book.svg'
import employer from '../../assets/Employer.svg'

const ChoiceCard = ({name, im})=>{
    return(
        <Radio.Button value={name} className='h-60 w-60 text-center align-middle pt-8' >
            <img src={im} className='h-20' />
            <h1 className='text-l font-Dongle'>{name}</h1>
        </Radio.Button>
    )
}
const SignUp = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, serErrorMessage] = useState("")

    const handleLogin = ()=>{
        const userName = document.getElementById("username").value
        const password = document.getElementById("password").value
        console.log(userName, password)
        setLoading(true)
    }
    const Choices = ()=>{
        return(
            <Radio.Group defaultValue="" buttonStyle="solid" className='flex flex-row justify-center text-emerald-500'>
                <ChoiceCard name={'I’m a client, hiring for a project'} im={employer}/>
                <ChoiceCard name={'I’m a student, looking for work'} im={bookImg}/>
            </Radio.Group>
        )
    }
    const SignupForm = ()=>{
        return(
            <form class="space-y-6 md:space-y-6" action="#">
                <div className='flex gap-4'>
                    <Input
                        placeholder="Firstname"
                        className='p-2'
                        id='firstname'
                        status={error?'error':'success'}
                    />
                    <Input
                        placeholder="Lastname"
                        className='p-2'
                        id='lastname'
                        status={error?'error':'success'}
                    />
                </div>
                <div>
                    <Input
                            type='email'
                            id='email'
                            placeholder="Email"
                            className='p-2'
                            status={error?'error':'success'}
                    />
                </div>
                <div>
                    <Input
                            type='phone'
                            id='phone'
                            placeholder="Phone"
                            className='p-2'
                            status={error?'error':'success'}
                    />
                </div>
                <div className='flex gap-4'>
                    <DatePicker
                            id='birthday'
                            placeholder="Birthdate"
                            className='p-2'
                            status={error?'error':'success'}
                    />
                    <Input
                        placeholder="Location"
                        className='p-2'
                        id='location'
                        status={error?'error':'success'}
                    />
                </div>
                <div>
                    <Input
                        placeholder="University"
                        className='p-2'
                        id='university'
                        status={error?'error':'success'}
                    />
                </div>
                <div className='flex gap-4'>
                    <Input
                            type='password'
                            id='password'
                            placeholder="Password"
                            className='p-2'
                            status={error?'error':'success'}
                    />
                    <Input
                            type='password'
                            id='passwordCom'
                            placeholder="Confirm Password"
                            className='p-2'
                            status={error?'error':'success'}
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        loading={loading}
                        onClick={handleLogin}
                    >
                        Signup
                    </Button>
                </div>
                <Divider>Have an account?</Divider>
                <div className='text-center'>
                <div className='text-center'>
                    <a href="/login" class="font-medium text-center text-green-600 hover:underline dark:text-green-500">Login</a>
                </div>
                </div>
            </form>


        )
    }
    return(
        <section class="bg-white-50 font-Dongle">
            {/* <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div class="bg-slate-50 rounded-lg shadow dark:border dark:border-gray-900 p-12 pt-4">
                    <h1 className='text-center text-3xl'>Join as a client or Student freelancer</h1>
                    <Choices />
                </div>
            </div> */}
            <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div class="bg-slate-50 rounded-lg shadow dark:border dark:border-gray-900 p-12 pt-4 w-2/5">
                    <h1 className='text-center text-3xl'>Signup</h1>
                    <SignupForm />
                </div>
            </div>

    </section>
    )
}

export default SignUp