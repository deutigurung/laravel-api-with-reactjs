import { useState, useEffect, useContext } from "react";
import { NavLink  } from "react-router-dom";
import ToastContext from "../../Layouts/ToastContext";
import Notification from "../../Layouts/Notification";

const  CompaniesIndex = () =>{

    const [companyList,setCompanyList] = useState([]);
    
    const {showToast,toastType,message,handleToast} = useContext(ToastContext); 

    const fetchCompanies = ()=>{
        async function getData(){
            const response = await fetch('/api/companies');
            const json = await response.json();
            const results = json.data;
            if(results && results.length > 0){
                setCompanyList(results);
            }
        }
        getData();
    }
    
    const deleteCompany = (e) => {
        // console.log('id',e.target.value);
        if(!window.confirm('Are you sure want to remove?')){
            return
        }
        const companyId = e.target.value;
        async function getData(){
            const response = await fetch('/api/companies/'+companyId,{
                method: 'DELETE'
            });
            //after delete fetch company list 
            fetchCompanies();
            handleToast('error', 'Delete successful');
        }
        getData();
    }

    const renderCompanies = () => {
        if(companyList.length > 0) {
            return companyList.map((company, index) => {
                 return (
                    <tr key={company.id}>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{company.name}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{company.email}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{company.phone}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{company.address}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">{company.website}</td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                            
                            <NavLink to={`/companies/edit/${company.id}`} id={company.id} className="px-4 py-2 rounded-md text-black bg-green-600 hover:bg-indigo-700">Edit</NavLink>

                            <button type="button" className="bg-red-600 hover:bg-red-700 rounded-md text-white px-4 py-2 font-semibold ease-in-out duration-150"
                                value={company.id} onClick={()=>deleteCompany(event)}
                            >Delete</button>
                        </td>
                    </tr>
               );
            })
        }    
    };

    //useEffect is a hook in functional component which call a function once when component is render
    //useEffect is similar to componentDidMount() but componentDidMount is used class component hook
    useEffect(()=>{
        fetchCompanies(); //call api once when component render
    },[]);

//    console.log('toast',showToast,toastType,message)
    return(
        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
            <div className="flex place-content-end mb-4">
                <NavLink to="/companies/create" className="px-4 py-2 rounded-md text-black bg-indigo-600 hover:bg-indigo-700">Create</NavLink>
            </div>
        <div className="min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200 border">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50">
                            <span className="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                        </th>
                        <th className="px-6 py-3 bg-gray-50">
                            <span className="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Email</span>
                        </th>
                        <th className="px-6 py-3 bg-gray-50">
                            <span className="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Contact Number</span>
                        </th>
                        <th className="px-6 py-3 bg-gray-50">
                            <span className="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Address</span>
                        </th>
                        <th className="px-6 py-3 bg-gray-50">
                            <span className="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Website</span>
                        </th>
                        <th className="px-6 py-3 bg-gray-50">
                        </th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {renderCompanies()}
                </tbody>
            </table>
        </div>
        {
            showToast && showToast ? <Notification status={toastType} message={message}></Notification> : null
        }
        
    </div>
    );
}
export default CompaniesIndex;