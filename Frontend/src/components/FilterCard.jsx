import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-select';

const filterData = [
    {
        filterType:"Location",
        array:['Delhi NCR','Banglore','Hyderabad','Punr','Mumbai','Chennai','Goa','Surat']
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","DevOps Engineer","Cloud Engineer","FullStack Developer","Cyber-Security Expert","Data-Analyst","Data-Engineer","Machine Engineer","Graphic Designer"]
    },
    {
        filterType:"Salary",
        array:["0-40k","41k-2LPA","1LPA-4LPA","4LPA and Above"]
    },
]



const FilterCard = () => {
    const [selectedVal,setSelectedVal] = useState('');
   
    const ChangeHandler = (val)=>{
        setSelectedVal(val);
    }

        useEffect(()=>{
            console.log(selectedVal);
        },[selectedVal]);
        
  return (
    <div className='p-2.5 rounded-lg w-full'>
      <h1 className='sm:text-2xl text-lg font-bold'>Filter Jobs</h1>
      <hr className='mt-2'/>
      <RadioGroup value={selectedVal} onValueChange={ChangeHandler}>
        {
           filterData.map((v,i)=>(
            <div key={i}>
                <h1 className='font-bold sm:text-lg text-[14px]'>{v.filterType}</h1>
                {
                    v.array.map((vv,i)=>{
                        return(
                            <div key={i} className='flex gap-2 items-center my-2 sm:text-sm text-[10px]'>
                                <input type='radio' id="harsh101" name={v.filterType}/>
                                <label htmlFor="harsh101">{vv}</label>
                            </div>
                        )
                    })
                }
            </div>
           )) 
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
