import {FaSearch} from  'react-icons/fa'
import './searchbar.css'
import { useState } from 'react';
import { api } from '../../../service/api';
export const SearchBar = ({setresults,selecteduser,selectclean})=> {
    const[texbusc,settextbusc] = useState('')
    const ApiSearch = async (value)=>{
        const res = await api.get('users/profile')
        const results = res.data.filter(item =>{
            return item.name && item.name.toLowerCase().includes(value)
        })
        setresults(results)
    }
    const HandleBusc = (value)=>{
        settextbusc(value)
        ApiSearch(value)
    }
    const HandleClean = ()=>{
        selectclean = ''
    }
    return (
        <div className="input-wrapper">
            <FaSearch id='search-icon'/>
            <input placeholder='André...' value={selecteduser} onChange={(e)=> HandleBusc(e.target.value)}></input>
            <button onClick={()=> HandleClean} className='btn_clean'>x</button>
        </div>
    );
}