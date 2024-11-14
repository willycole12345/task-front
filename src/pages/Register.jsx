import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [records, setRecords] = useState({});
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateform(formData);
        setErrors(validationError);

        const allInputvalue = { firstname: formData.firstname, lastname: formData.lastname, email: formData.email, password: formData.password };
        console.log(allInputvalue);
        let res = await fetch("http://taskmanagement.test/api/createUsers", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(allInputvalue)
        });
        ;
        let resjson = await res.json();
        // console.log(resjson.data);
        if (resjson.data.status === "success") {
            toast.success(resjson.data.message, {
                position: "top-right"
            });
            navigate("/");
        } else {
            toast.error(resjson.data.message, {
                position: "top-right"
            });
        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const validateform = (data) => {
        let errors = {};

        if (!data.firstname) {
            errors.firstname = "firstname is required";
        }
        if (!data.lastname) {
            errors.lastname = "lastname is required";
        }
        if (!data.password) {
            errors.password = "Password is required";
        }
        if (!data.password) {
            errors.password = "Password is required";
        } else if (!data.repassword) {

        } else if (data.password != data.repassword) {
            errors.password = "Password is required";
            errors.repassword = "Re-Password is do not match";
        }
        if (!data.email) {
            errors.email = "Email Address is required";
        } else if (!validateEmail(data.email)) {
            errors.email = "invalid Email address";
        }

        return errors;
    }

    function validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <Toaster />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input name="firstname" type="text" required autoComplete=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange} value={formData.firstname} />
                            {errors.firstname && <span>{errors.firstname}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input name="lastname" type="text" required autoComplete=""
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange} value={formData.lastname} />
                            {errors.firstname && <span>{errors.firstname}</span>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input name="email" type="email" required autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange} value={formData.email} />
                            {errors.firstname && <span>{errors.firstname}</span>}
                        </div>
                    </div>

                    <div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>

                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange} value={formData.password} />
                            {errors.firstname && <span>{errors.firstname}</span>}
                        </div>
                    </div>

                    <div>
                        <button type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register