import { Input, Tooltip, Button, Divider, Alert, Radio, DatePicker, Cascader  } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
import { useState } from 'react';
import bookImg from '../../assets/book.svg'
import employer from '../../assets/Employer.svg'
import axios from 'axios';
const SignUp = ()=>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, serErrorMessage] = useState("")
    const [choice, setChoice] = useState("")
    const [choiceDetail, setChoiceDetail] = useState("")
    const [cont, setContinue] = useState(false)
    const [dep, setDep] = useState("")
    const [ski, setSki] = useState([])

    const updateDep = (val)=>{
        setDep(val)
    }
    const updateSki = (val)=>{
        setSki(val)
    }
    const handleLogin = ()=>{
        const userName = document.getElementById("username").value
        const password = document.getElementById("password").value
        console.log(userName, password)
        setLoading(true)
    }
    const updateChoice = (id, name)=>{
        console.log(id, name)
        setChoiceDetail(name)
        setChoice(id)
    }
    const ChoiceCard = ({name, id, im})=>{
        return(
            <Radio.Button value={name} onChange={()=> updateChoice(id, name)} className='h-60 w-60 text-center align-middle pt-8' >
                <img src={im} className='h-20' />
                <h1 className='text-l font-Dongle'>{name}</h1>
            </Radio.Button>
        )
    }
    const Choices = ()=>{
        return(
            <Radio.Group defaultValue={choiceDetail} buttonStyle="solid" className='flex flex-row justify-center text-emerald-500'>
                <ChoiceCard name={'I’m a client, hiring for a project'} id={"user"} im={employer} />
                <ChoiceCard name={'I’m a student, looking for work'} id={"student"} im={bookImg} />
            </Radio.Group>
        )
    }
    const submitSignup = ()=>{
        setLoading(true)
        const firstName = document.getElementById("firstname").value
        const lastName = document.getElementById("lastname").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const location = document.getElementById("location").value
        const password = document.getElementById("password").value
        const passwordCom = document.getElementById("passwordCom").value
        if(choice == "user"){
            const website = document.getElementById("website").value
            // console.log(firstName,lastName, email, phone, birthday, location, university, password, passwordCom)
            const dat = {
                name: firstName+ " "+ lastName,
                phone,
                email, 
                address: location,
                website: "http://example.com",
                password,
            }
            console.log(JSON.stringify(dat))
            const sendReq = fetch("https://zenith-web.onrender.com/api/v1/auth/register", {
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
                    window.location.href = "/login"
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
            
            // const sendReq = axios.post("https://zenith-web.onrender.com/api/v1/auth/register", {data: JSON.stringify(dat)})
            // sendReq.then((res)=>{
            //     console.log(res)
            //     setLoading(false)
            //     if(res.data.status == "success"){
            //         window.location.href = "/login"
            //     }
            //     else{
            //         setError(true)
            //         console.log(res)
            //         serErrorMessage(res.data.message)
            //     }
            // });
        }
        else{
            const birthday = document.getElementById("birthday").value
            const university = document.getElementById("university").value
            const department = document.getElementById("department").value
            const skills = document.getElementById("skills").value

            console.log(document.getElementById("department"),skills)
            const dat = {
                name: firstName+ " "+ lastName,
                phone,
                email, 
                address: location,
                website: "http://example.com",
                password,
                dob: birthday,
                university,
                department,
                skillsRequired: [skills],
            }
            console.log(dat)
            const sendReq = fetch("https://zenith-web.onrender.com/api/v1/auth/register/stud", {
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
                    window.location.href = "/login"
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
            setLoading(false)
            // const dat = {
            //     name: firstName+ " "+ lastName,
            //     phone,
            //     email, 
            //     address: location,
            //     role:
            // }
        }
    }
    ['chemical engineering', 'civil engineering', 'electrical engineering', "mechanical engineering", "software engineering"]
    const SignupForm = ()=>{
        console.log(choice)
        const deps = [
            {
                value: "chemical engineering",
                label: "chemical engineering"
            },
            {
                value: "civil engineering",
                label: "civil engineering"
            },
            {
                value: "electrical engineering",
                label: "electrical engineering"
            },
            {
                value: "mechanical engineering",
                label: "mechanical engineering"
            },
            {
                value: "software engineering",
                label: "software engineering"
            }
        ]
        const skills = [
            {
                value: "Web Development",
                label: "Web Development"
            },
            {
                value: "UI/UX",
                label: "UI/UX"
            },
            {
                value: "Business",
                label: "Business"
            },
            {
                value: "web design",
                label: "web design"
            },
            {
                value: "web development",
                label: "web development"
            },
            {
                value: "graphic design",
                label: "graphic design"
            },
            {
                value: "digital marketing",
                label: "digital marketing"
            },
            {
                value: "seo",
                label: "seo"
            },
            {
                value: "data alalysis",
                label: "data alalysis"
            },
            {
                value: "mobile development",
                label: "mobile development"
            },
            {
                value: "video editing",
                label: "video editing"
            },
            {
                value: "translation",
                label: "translation"
            },
            {
                value: "Data Science",
                label: "Data Science"
            },
            {
                value: "Business",
                label: "Business"
            },
            {
                value: "Mobile Development",
                label: "Mobile Development"
            },
        ]
        if(choice == "user"){
            return(
                <form class="space-y-6 md:space-y-6" action="#" onSubmit={submitSignup}>
                    <div className='flex gap-4'>
                        <Input
                            placeholder="Firstname"
                            className='p-2'
                            required={true}
                            id='firstname'
                            status={error?'error':'success'}
                        />
                        <Input
                            placeholder="Lastname"
                            className='p-2'
                            required={true}
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
                                required={true}
                                status={error?'error':'success'}
                        />
                    </div>
                    <div>
                        <Input
                                type='phone'
                                id='phone'
                                placeholder="Phone"
                                className='p-2'
                                required={true}
                                status={error?'error':'success'}
                        />
                    </div>
                    <div>
                
                        <Input
                            placeholder="Location"
                            className='p-2'
                            required={true}
                            id='location'
                            status={error?'error':'success'}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Website"
                            className='p-2'
                            required={true}
                            id='website'
                            status={error?'error':'success'}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <Input
                                type='password'
                                id='password'
                                required={true}
                                placeholder="Password"
                                className='p-2'
                                status={error?'error':'success'}
                        />
                        <Input
                                type='password'
                                id='passwordCom'
                                required={true}
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
        else{
            return(
                <form class="space-y-6 md:space-y-6" action="#" onSubmit={submitSignup}>
                    <div className='flex gap-4'>
                        <Input
                            placeholder="Firstname"
                            className='p-2'
                            required={true}
                            id='firstname'
                            status={error?'error':'success'}
                        />
                        <Input
                            placeholder="Lastname"
                            className='p-2'
                            required={true}
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
                            required={true}
                            status={error?'error':'success'}
                        />
                    </div>
                    <div>
                        <Input
                            type='phone'
                            id='phone'
                            placeholder="Phone"
                            className='p-2'
                            required={true}
                            status={error?'error':'success'}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <DatePicker
                                id='birthday'
                                placeholder="Birthdate"
                                className='p-2'
                                required={true}
                                status={error?'error':'success'}
                        />
                        <Input
                            placeholder="Location"
                            className='p-2'
                            required={true}
                            id='location'
                            status={error?'error':'success'}
                        />
                    </div>
                    <div>
                        <Input 
                            id='department'
                            status={error?'error':'success'}
                            required={true}
                            // onChange={updateDep}
                            // options={deps}
                            className='w-full'
                            placeholder="Department" 
                        />
                    </div>
                    <div>
                        <Input
                            id='skills'
                            status={error?'error':'success'}
                            required={true}
                            // options={skills}
                            className='w-full'
                            placeholder="Skills" 
                            // multiple
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="University"
                            className='p-2'
                            required={true}
                            id='university'
                            status={error?'error':'success'}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <Input
                                type='password'
                                id='password'
                                required={true}
                                placeholder="Password"
                                className='p-2'
                                status={error?'error':'success'}
                        />
                        <Input
                                type='password'
                                id='passwordCom'
                                required={true}
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
    }
    return(
        <section class="bg-white-50 font-Dongle">
            {!cont&&(<div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                <div class="bg-slate-50 rounded-lg shadow dark:border dark:border-gray-900 p-12 pt-4">
                    <h1 className='text-center text-3xl text-emerald-700'>Join as a client or Student freelancer</h1>
                    <Choices />
                <div className='text-center mt-4'>
                    <Button type='primary' disabled={choice==""?true:false} className='text-center' onClick={()=> setContinue(true)}> Continue </Button>
                </div>
                </div>
            </div>)}

            {choice&&cont?(
                <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
                    <div class="bg-slate-50 rounded-lg shadow dark:border dark:border-gray-900 p-12 pt-4 w-2/5">
                        <h1 className='text-center text-3xl'>Signup as {choice}</h1>
                        {error&& <Alert type='error' message={errorMessage} className='mb-2'></Alert>}
                        <SignupForm />
                    </div>
                </div>
            ):null
            
            }

    </section>
    )
}

export default SignUp