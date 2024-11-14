import React, { useState } from 'react'
// import CustomButton from '../components/CustomButtom';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from "react-router-dom";

const Createform = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [formValue, setFormValue] = useState({ username: '', name: '', task_desc: '' });
    const [errors, setErrors] = useState({});

    const getdetails = async () => {
        const reqData = await fetch(`http://taskmanagement.test/api/auth/view`);
        const resData = await reqData.json();
        console.log(resData.data);
        // setRecords(resData.data.message);
        if (resData.data.status === "success") {
            setRecords(resData.data.message);
        } else {
            setRecords([]);
            toast.error(resData.data.message, {
                position: "top-right"
            });
        }
    }


    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateform(formValue);
        setErrors(validationError);
        const allInputvalue = { username: "testting", name: formValue.name, task_desc: formValue.task_desc };
        console.log(allInputvalue);
        let res = await fetch("http://taskmanagement.test/api/create", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(allInputvalue)
        });
        ;
        let resjson = await res.json();
        console.log(resjson.data);
        if (resjson.data.status === "success") {
            toast.success(resjson.data.message, {
                position: "top-right"
            });
            setFormValue({ username: '', name: '', task_desc: '' })
            showModal(false);
            // getdetails();
        } else {
            toast.error(resjson.data.message, {
                position: "top-right"
            });
        }
        // getdetails();
    }

    const validateform = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = "Task name is required";
        }
        if (!data.task_desc) {
            errors.task_desc = "Task Description is required";
        }


        return errors;
    }

    return (

        <div className='relative p-4 w-full max-w-2xl max-h-full'>

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="relative mb-6">

                    <input type="hidden" name="username"
                        // className={`flex-1 ${textStyles}`       
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500${errorsClass"
                        placeholder="name@flowbite.com"
                        value={formValue.username} onChange={handleInput}
                    />


                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
                    <input type="text" name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        value={formValue.name} onChange={handleInput} />
                    {errors.name && <span className='text-orange-900'>{errors.name}</span>}
                </div>

                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
                    <textarea rows="4" name="task_desc"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Leave a comment..."
                        value={formValue.task_desc} onChange={handleInput} ></textarea>
                    {errors.task_desc && <span className='text-orange-900'>{errors.task_desc}</span>}

                </div>
                <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="submit"
                >Create Task
                </button>
            </form>
        </div>
    )
}

export default Createform;