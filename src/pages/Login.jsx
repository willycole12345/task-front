import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const validationError = validateform(formData);
    //  setErrors(validationError);

    const allInputvalue = { email: formData.email, password: formData.password };
    console.log(allInputvalue);
    try {
      let res = await fetch("http://taskmanagement.test/api/auth/login", {
        method: "POST",
        headers: {
          //  'Accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(allInputvalue)
      });
    } catch (e) {
      console.log(e);
    }



    // let resjson = await res.json();
    // console.log(resjson);

    // if (resjson.status === "success") {
    //     toast.success( resjson.message , {
    //         position: "top-right"
    //     });
    //     navigate("/dashboard");
    //     localStorage.setItem("access_token", resjson.access_token);
    //     localStorage.setItem("firstname", resjson.userrecord.firstname);
    //     localStorage.setItem("lastname", resjson.userrecord.lastname);
    //     localStorage.setItem("userid", resjson.userrecord.id);
    // } else if(resjson.status === "failed") { 
    //     toast.error(resjson.message, {
    //         position: "top-right" 
    //       });
    // }

  }



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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <Toaster />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input

                name="email"
                type="text"

                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} value={formData.email} />
              {errors.email && <span>{errors.email}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input

                name="password"
                type="password"

                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={handleChange} value={formData.password} />
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="Register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login