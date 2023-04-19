import { Button, Input } from "antd"
import React from 'react'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import im from '../../assets/Search.svg'
import { useState, useEffect } from "react";
import axios from "axios";
import { reactLocalStorage } from 'reactjs-localstorage';
import Post from "../Post/post";
import ContentLoader, { Facebook, List } from 'react-content-loader'

const Tag = ({tag})=>{
    return(
        <div className="rounded-full bg-emerald-100 border-solid border-[1px] border-emerald-900 p-[2px] px-[10px]">
            {tag}
        </div>
    )
}
const role = reactLocalStorage.get("role")
const IndCard = ({job})=>{
    return(
        <div className="hover:bg-green-50 hover:text-emerald-700 px-4 mt-4 pb-4 text-gray-700 border-solid border-[1px] border-gray-300 border-l-0 border-r-0 border-t-0">
            <div className="flex justify-between  mb-0">
                <h2 className="font-Dongle">{job.title}</h2>
                <div className="flex gap-2">
                    <span className="rounded-full border-gray-500 border-1 p-2"><LikeOutlined /></span>
                    <span className="rounded-full border-gray-500 p-2"><DislikeOutlined /></span>
                </div>
            </div>

            <div>
                <div className="flex gap-3">
                    <p>2000 ETB</p>
                    <p> {new Date(job.deadline).toLocaleDateString('en-US',{
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</p>
                </div>
                <p>
                {job.description}
                </p>
                <div className="flex gap-2">
                {job.skillsRequired.map((ind)=>{
                    return(<Tag tag={ind} />)
                })}
                </div>
            </div>

            <div>

            </div>
        </div>
    )
}

const ALlJobs = ({jobs})=>{
    return(
        jobs.map((job)=>{
            console.log(job)
            return( <IndCard job={job}/>)
        })
    )   
}
const Home = ()=>{
    const [activeNav, setActiveNav] = useState(0)
    const [jobs, setJobs] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=>{
        axios.get('https://zenith-web.onrender.com/api/v1/jobs',{
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            // handle success
            setJobs(response.data.data)
            setIsLoaded(true)
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
    })
    const changeActiveNav = (val)=>{
        setActiveNav(val)
    }
    return(
        <div className="w-full">
            <div className="w-full bg-emerald-800 h-60 p-4 rounded-xl">
                <div className="flex flex-row justify-between mt-4 ml-4">
                    <div>
                        <p className="text-4xl font-bold text-white py-0 my-0">{role=="Publisher"? "Post jobs you want to get done":"Find Jobs around you"}</p>
                        <p className="text-l font-semibold text-white py-0">{role=="Publisher"? "Search for student tallent to get the job done":"Find works easily that suits your skillset"}</p>
                        
                        
                    </div>
                    <img src={im} className="h-40 mt-4 mr-20"/>
                </div>
            </div>
            <div className="text-center w-full flex justify-center">
                <div className="text-center w-2/3">
                    <Input placeholder="Search" className="w-full p-2 mt-4" />
                    <Button className="mt-2" type="primary"> Search </Button>
                </div>
            </div>
            <div className=" border-black shadow-xl p-4 pl-0 pr-0 border-2 rounded-lg mt-10  text-gray-700">
                <div className="px-4">
                    <h1 className="text-2xl">Jobs you might</h1>
                    <div className="flex gap-4 font-thin border-solid border-t-0 border-l-0 border-r-0 border-b-[1px] border-gray-300 ">
                        <h1 className={activeNav==0? "mb-0 border-solid border-0 border-b-2 cursor-pointer": "mb-[4px] cursor-pointer"} onClick={()=> changeActiveNav(0)}>Best matches</h1> 
                        <h1 className={activeNav==1? "mb-0 border-solid border-0 border-b-2 cursor-pointer": "mb-[4px] cursor-pointer"} onClick={()=> changeActiveNav(1)}>Most recent</h1> 
                    </div>
                </div>
                {!isLoaded? <List /> : !jobs? <h1> No job listing found </h1> : <ALlJobs jobs={jobs}/>}

                {/* <IndCard /> */}

            </div>
        </div>
    )
}

export default Home