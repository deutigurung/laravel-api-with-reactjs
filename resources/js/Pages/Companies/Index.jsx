import { useState ,useCallback, useEffect } from "react";


const  CompaniesIndex = () =>{

    const [companyList,setCompanyList] = useState([]);
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
   
    return(
        <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
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
    </div>
    );
}
export default CompaniesIndex;