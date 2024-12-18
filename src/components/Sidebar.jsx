import React from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Sidebar = () => {
   const navigate = useNavigate();

   const logout = async () => {
      const token = localStorage.getItem('access_token');
      let res = await fetch("http://taskmanagement.test/api/auth/logout", {
         method: "POST",
         headers: {
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
         },
         //  body:JSON.stringify(allInputvalue)
      });

      const resData = await res.json();

      //  console.log(resData);
      //   setRecords(resData.data.message);
      if (resData.status === "success") {
         //  setRecords(resData.data.message);
         //    localStorage.removeItem("token-info");
         localStorage.removeItem("access_token");
         localStorage.removeItem("firstname");
         localStorage.removeItem("lastname");
         localStorage.removeItem("userid");
         toast.success(resData.message, {
            position: "top-right"
         });
         navigate("/");
      } else {
         //    setRecords([]);
         toast.error(resData.message, {
            position: "top-right"
         });
      }


      // localStorage.removeItem("token-info");
      // localStorage.setItem("access_token");
      // localStorage.setItem("firstname");
      // localStorage.setItem("lastname");
      // localStorage.setItem("userid");
      // setIsLoggedin(false);
      //  navigate("/");
   };
   return (
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
         <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
               <li>
                  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                     </svg>
                     <span className="ms-3">Dashboard</span>
                  </a>
               </li>
               <li>
                  <button onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                     <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                     </svg>
                     <span className="ms-3">Logout</span>
                  </button>
               </li>
            </ul>
         </div>
      </aside>
   )
}

export default Sidebar;