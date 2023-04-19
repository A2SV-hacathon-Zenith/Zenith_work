import { Button, Modal, Form, Input, Cascader, DatePicker } from "antd";
import { useState } from 'react';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Post = () => {
    const [postModalLoading, setpostModalLoading] = useState(false);
    const [openPostModal, setopenPostModal] = useState(false);
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
    const FormModal = ()=>{
        const [form] = Form.useForm();
        const locationoptions = [
            {
                label: 'Addis Ababa',
                value: 'Addis Ababa',
            },
            {
                label: 'Dire Dawa',
                value: 'Dire Dawa',
            },
            {
                label: 'Bahir Dar',
                value: 'Bahir Dar',
            },
            {
                label: 'Gondar',
                value: 'Gondar',
            },
            {
                label: 'Jimma',
                value: 'Jimma',
            },
            {
                label: 'Jijiga',
                value: 'Jijiga',
            },
            {
                label: 'Mekele',
                value: 'Mekele',
            },
            {
                label: 'Adama',
                value: 'Adama',
            },
            {
                label: 'Debre Markos',
                value: 'Debre Markos',
            },
            {
                label: 'Debre Tabor',
                value: 'Debre Tabor',
            },
        ]
        const skilloptions = [
            {
              label: 'Light',
              value: 'light',
            },
            {
              label: 'Bamboo',
              value: 'bamboo',
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
                value: 'Mobile development',
                label: 'Mobile development',
            },
            {
                value: 'Graphic Design',
                label: 'Graphic Design',
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
                value: 'Video Editing',
                label: 'Video Editing',
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
                value: "SEO",
                label: "SEO",
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
            console.log(value);
          };
        return (
              <Modal
                open={openPostModal}
                title={<h1 className="text-xl font-semibold">Add job posting</h1>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" postModalLoading={postModalLoading} onClick={handleOk}>
                    Post
                  </Button>
                ]}
              >
                <p className="mt-4"> Fill the following form to add your job posting</p>
                <Form 
                    layout={"vertical"}
                    form={form} 
                    className="mt-4"
                    style={{
                        maxWidth: 600,
                    }}>
                    <Form.Item label={<p className="text-l font-semibold">Job Title</p>}>
                        <Input placeholder="Job Title" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Job description</p>}>
                        <TextArea placeholder="Job description" showCount maxLength={300} style={{height: 120,}}className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Skill required</p>}>
                        <Cascader
                            style={{
                            width: '100%',
                            }}
                            options={skilloptions}
                            onChange={onChange}
                            multiple
                            maxTagCount="responsive"
                            placeholder=""
                        />
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Payment Amount</p>}>
                        <Input type="number" placeholder="Payment Amount" className="border-gray-200 border-2"/>
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Payment Amount</p>}>
                        <Cascader options={paymentoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Application Period</p>}>
                        <RangePicker className="w-full"/>
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Project deadline</p>}>
                            <DatePicker className="w-full"/>
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Job location</p>}>
                        <Cascader options={locationoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Job Type</p>}>
                        <Cascader options={jobtypeoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                    <Form.Item label={<p className="text-l font-semibold">Job Category</p>}>
                        <Cascader options={jobcategoryeoptions} onChange={onChange} placeholder="Please select" />
                    </Form.Item>
                </Form>
              </Modal>
          );
    }
    return( 
    <div className="bg-slate-50 rounded-lg border-gray-400 h-80 w-40">
        <Button type="primary" onClick={showModal}> Create Job Posting </Button>
        <FormModal />
    </div>
    );
}


export default Post