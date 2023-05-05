import { useState } from "react";
import { useNavigate } from "react-router-dom";

const  CompaniesCreate = () =>{

    const [name,setName] =  useState("");
    const [email,setEmail] =  useState("");
    const [phone,setPhone] =  useState("");
    const [address,setAddress] =  useState("");
    const [website,setWebsite] =  useState("");
    const [errors,setErrors] =  useState([]);

    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/companies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            website
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log('data',data.errors)
            if(data.errors){
                setErrors(data.errors)
            }else{
                navigate("/dashboard")
            }
        }) //redirect to dashboard after success response
          .catch(error => setErrors({ errors: error.errors }));
      };

    const errorMessage = (field) => {
        // console.log('error_field', errors);
        return (
            <div className="text-red-600 mt-1">
                {
                //errors?.[field] is optional chaining to access the error messages for the specific form field
                errors?.[field]?.map((message,index) => {
                    return (
                        <div key={index}>{message}</div>
                    )
                })
                }
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6 rounded-md shadow-sm">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1">
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name"
                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        {errorMessage('name')}
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <div className="mt-1">
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email"
                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                         {errorMessage('email')}
                    </div>
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <div className="mt-1">
                        <input value={phone} onChange={(e)=>setPhone(e.target.value)}  type="text" name="phone" id="phone"
                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                         {errorMessage('phone')}
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <div className="mt-1">
                        <input value={address} onChange={(e)=>setAddress(e.target.value)}  type="text" name="address" id="address"
                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                         {errorMessage('address')}
                    </div>
                </div>
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website Url</label>
                    <div className="mt-1">
                        <input value={website} onChange={(e)=>setWebsite(e.target.value)}  type="text" name="website" id="website"
                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    {errorMessage('website')}
                    </div>
                </div>
                
            </div>
            <button type="submit"
                    className="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
                Create
            </button>
        </form>
    );
}
export default CompaniesCreate;