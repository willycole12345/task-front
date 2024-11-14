import React, { useEffect, useState } from 'react';
import AccountLayout from '../components/Layout/AccountLayout';
import Createform from '../components/Createform';
import CustomButton from '../components/Custombotton';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';
import EditForm from '../components/Editform';
import toast, { Toaster } from 'react-hot-toast';
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRecord, setEditRecord] = useState(false);
  const [error, setError] = useState(null);

  const [records, setRecords] = useState(false);
  const OpenClick = () => {
    console.log('yes');
    setShowModal(true);
  }

  useEffect(() => {
    getdetails();
  }, []);

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

  //const logout = () => {
  //  localStorage.removeItem("token-info");
  //  localStorage.setItem("access_token");
  //  localStorage.setItem("firstname");
  //  localStorage.setItem("lastname");
  //  localStorage.setItem("userid");
  // setIsLoggedin(false);
  // };



  const UpdateTask = (record) => {
    console.log(record);
    setShowEditModal(true);

    setEditRecord(record);
    // fetch(`http://taskmanagement.test/api/editrecord/${id}`)
    // .then(response => response.json())
    // .then(json => setEditRecord(json.data.message))
    // .catch(error => console.error(error));

  };

  const DeleteTask = async (id) => {
    fetch(`http://taskmanagement.test/api/delete/${id}`)
      .then(() => {
        getdetails();
      })
  }

  return (

    <AccountLayout>
      <Toaster />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="relative overflow-x-auto">
            <CustomButton title="Create"
              containerStyles="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              btnType="button" textStyles="" handleClick={() => setShowModal(true)}
            />
            <Modal open={showModal} onClose={() => setShowModal(false)}>
              <div className="text-center w-94">

                <div className="mx-auto my-4 w-96">

                  <Createform />

                </div>
                <div className="flex gap-4">
                  <button className="btn btn-success w-full"></button>
                  <CustomButton title="Cancel"
                    containerStyles="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 text-red-800"
                    btnType="button" textStyles="" handleClick={() => setShowModal(false)}
                  />


                </div>
              </div>
            </Modal>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Task Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Task Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {records ? (records.map(record => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={record.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {record.username}
                    </th>
                    <th scope="row" className="px-6 py-4">
                      {record.name}
                    </th>
                    <th scope="row" className="px-6 py-4">
                      {record.task_desc}
                    </th>
                    <th className="px-6 py-4 text-teal-800">
                      <CustomButton title="Edit"
                        containerStyles="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 text-lime-600	"
                        btnType="button" textStyles="" handleClick={(e) => UpdateTask(record)}
                      />

                    </th>
                    <th className="px-6 py-4 text-rose-900">
                      <CustomButton title="Delete"
                        containerStyles="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 text-red-800"
                        btnType="button" textStyles="" handleClick={(e) => DeleteTask(record.id)}
                      />
                    </th>
                  </tr>
                ))) : 'Loading...'}
              </tbody>
              <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
                <div className="text-center w-94">
                  <div className="mx-auto my-4 w-96">
                    <h3 className="text-lg font-black text-gray-800">Edit Task</h3>
                    <p className="text-sm text-gray-500"></p>
                    <EditForm record={editRecord} />
                  </div>
                  <div className="flex gap-4">
                    <button className="btn btn-success w-full">Continue</button>
                    <button onClick={() => setShowEditModal(false)} className="btn btn-light w-full">Cancel</button>

                  </div>
                </div>
              </Modal>

            </table>
          </div>
        </div>
      </div>

    </AccountLayout>

  )
}

export default Dashboard