import { Button, Modal, Form, Input, Cascader, DatePicker } from "antd";
import { document } from "postcss";
import { useState, useRef } from 'react';
const { TextArea } = Input;
import {reactLocalStorage} from 'reactjs-localstorage';
const id = reactLocalStorage.get('id')


const Post = () => {
    const [postModalLoading, setpostModalLoading] = useState(false);
    const [openPostModal, setopenPostModal] = useState(false);
    const [loading, setLoading] = useState(false)
    
    const showModal = () => {
        setopenPostModal(true);
    };
    const handleOk = () => {
        setpostModalLoading(true);
        setTimeout(() => {
        setpostModalLoading(false);
        setopenPostModal(false);
        }, 3000);
    };
    const handleCancel = () => {
        setopenPostModal(false);
    };

    function pst(res){
        const newObj = {
            title: res.title,
            description: res.description,
            website: res.website,
            phone: res.phone,
            email: res.email,
            address: res.location,
            careers: res.skill,
            deadline: res.date? Date.parse(res.date.$d): null,
            jobType: res.type[0],
            jobCategory: res.category[0],
            paymentAmount: res.amount
        };
        console.log(newObj)
        const sendReq = fetch(`https://zenith-web.onrender.com/api/v1/users/${id}/jobs`, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newObj)
        }).then(async (res)=>{
            res = await res.json()
            console.log(res)
            setLoading(false)
            if(res.success){
                handleCancel()
            }
            else{
                console.log(res)
            }
            })
            .then(fin=>{
                console.log(fin)
            })
        // console.log(title.input.value, description.input.value, skill.input.value, amount.input.value, phone.input.value, website.input.value, date.input.value, location.input.value, type.input.value, category.input.value)
    }
    
    const FormModal = ()=>{
        const [form] = Form.useForm();
        const skilloptions = [
            {
              label: 'web design',
              value: 'web design',
            },
            {
              label: 'web development',
              value: 'web development',
            },
            {
                label: 'graphic design',
                value: 'graphic design',
            },
            {
                label: 'digital marketing',
                value: 'digital marketing',
            },
            {
                label: 'seo',
                value: 'seo',
            },
            {
                label: 'data alalysis',
                value: 'data alalysis',
            },
            {
                label: 'mobile development',
                value: 'mobile development',
            },
            {
                label: 'video editing',
                value: 'video editing',
            },
            {
                label: 'translation',
                value: 'translation',
            },
          ];
        const jobtypeoptions = [
            {
                value: 'Full Time',
                label: 'Full Time',
            },
            {
                value: 'Part Time',
                label: 'Part Time',
            },
            {
                value: 'Onetime',
                label: 'Onetime',
            },
        ]
        const jobcategoryeoptions = [
            {
                value: 'Web development',
                label: 'Web development',
            },
            {
                value: 'mobile development',
                label: 'mobile development',
            },
            {
                value: 'graphic design',
                label: 'graphic design',
            },
            {
                value: 'Content Writing',
                label: 'Content Writing',
            },
            {
                value: 'Data Entry',
                label: 'Data Entry',
            },
            {
                value: 'Translation',
                label: 'Translation',
            },
            {
                value: 'video editing',
                label: 'video editing',
            },
            {
                value: 'Audio Editing',
                label: 'Audio Editing',
            },
            {
                value: 'Photography',
                label: 'Photography',
            },
            {
                value: "seo",
                label: "seo",
            },
            {
                value: "Digital Marketing",
                label: "Digital Marketing",
            },
            {
                value: "Social Media Marketing",
                label: "Social Media Marketing",
            },
            {
                value: "Data Analysis",
                label: "Data Analysis",
            },
        ]
        const paymentoptions = [
            {
              value: 'Telebirr',
              label: 'Telebirr',
            },
        ]
          const onChange = (value) => {
            // console.log(value, form);
            console.log(form.values)
          };
          
        return (
              <Modal
                open={openPostModal}
                title={<h1 className="text-xl font-semibold">Add job posting</h1>}
                onCancel={handleCancel}
                className="relative top-[0px]"
                footer={[
                //   <Button key="back" onClick={handleCancel}>
                //     Cancel
                //   </Button>,
                //   <Button key="submit" type="primary" postModalLoading={postModalLoading} onClick={postJob}>
                //     Post
                //   </Button>
                ]}
              >
                <p className="mt-4"> Fill the following form to add your job posting</p>
                <Form 
                    layout={"vertical"}
                    form={form} 
                    onFinish={pst}
                    className="mt-4"
                    style={{
                        maxWidth: 600,
                    }}>
                    <Form.Item name={"title"} required label={<p className="text-l font-semibold">Job description</p>}>
                        <Input id="title" name="title" placeholder="Job Title" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"description"} required label={<p className="text-l font-semibold">Job description</p>}>
                        <TextArea id="description" placeholder="Job description" showCount maxLength={300} style={{height: 120,}}className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"skill"} required label={<p className="text-l font-semibold">Skill required</p>}>
                        <Cascader
                            style={{
                            width: '100%',
                            }}
                            id="skill"
                            options={skilloptions}
                            onChange={onChange}
                            multiple
                            maxTagCount="responsive"
                            placeholder=""
                        />
                    </Form.Item>
                    <Form.Item name={"amount"} required label={<p className="text-l font-semibold">Payment Amount</p>}>
                        <Input id="amount" type="number" placeholder="Payment Amount" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"phone"} required label={<p className="text-l font-semibold">Phone</p>}>
                        <Input id="phone"  type="number" placeholder="Phone" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"website"} required label={<p className="text-l font-semibold">Website</p>}>
                        <Input id="website"  type="text" placeholder="Website" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"email"} required label={<p className="text-l font-semibold">Email</p>}>
                        <Input id="email"  type="email" placeholder="Email" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item name={"date"} required label={<p className="text-l font-semibold">Project deadline</p>}>
                            <DatePicker id="date" className="w-full"/>
                    </Form.Item>
                    <Form.Item name={"location"} required label={<p className="text-l font-semibold">Job location</p>}>
                        <Input id="location"  onChange={onChange} placeholder="Enter location" />
                    </Form.Item>
                    <Form.Item name={"type"} required label={<p className="text-l font-semibold">Job Type</p>}>
                        <Cascader id="type"  options={jobtypeoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item name={"category"} required label={<p className="text-l font-semibold">Job Category</p>}>
                        <Cascader id="category"  options={jobcategoryeoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                    <Button htmlType="submit" type="primary"  postModalLoading={postModalLoading}>
                       Post
                    </Button>
                </Form>
              </Modal>
          );
    }
    return( 
    <div className="">
        <Button onClick={showModal}> Create Job Posting </Button>
        <FormModal />
    </div>
    );
}


export default Post