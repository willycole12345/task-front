import React, {useEffect, useState } from 'react'

const EditForm = ({ record }) => {
    //const [formValue, setFormValue] = useState({ username: '', name: '', task_desc: '' });

    const handleSubmit = async(e) => {
        // Prevent the browser from reloading the page
        e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
        console.log(formData);
        const formJson = Object.fromEntries(formData.entries());
        const recordarr = {
            "username": formJson.username,
            "name": formJson.name,
            "task_desc": formJson.task_desc
        }

        console.log(recordarr);
    let res = await fetch(`http://taskmanagement.test/api/updaterecord/${formJson.id}`,
            {
                method: "POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify(recordarr)
        });
        let resData = await res.json();
        console.log(resData.data.message.message);
    setRecords([...records, resData.data.message.message]);

    }

    // const [formValue, setFormValue] = useState({ record });
    // const [formValue, setFormValue] = useState({ username: '', name: '', task_desc: '' , created_at:'', updated_at:''});

  return (
      <div >
      
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <input type="hidden" name="id"  value={record.id}/>
        <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input type="text" name="username" aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={record.username} 
                        placeholder="name@flowbite.com"   />
        </div>
         <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Users</label>
                  <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option >Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
         </div>
            <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Name</label>
        <input type="text" aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={record.name}  name="name"    placeholder="name@flowbite.com" />
            </div>

            <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Task Description</label>
        <textarea  rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="task_desc"  defaultValue={record.task_desc}      placeholder="Leave a comment..."></textarea>
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

export default EditForm;