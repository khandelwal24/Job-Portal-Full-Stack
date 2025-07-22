import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setloading, setUser } from '@/Redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileModal = ({open,setOpen}) => {
    
    const {user,loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();

    const [Uinput,setUinput] = useState({
        fullname:user?.fullname,
        email:user?.email,
        phone:user?.phone,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills.map(ski=>ski),
        file:user?.profile?.resume,
        // profilePic:user.profile?.profilePic
    })

    const getVal = (e) =>{
        const oldValue = {...Uinput}
        const InputName = e.target.name
        const InputValue = e.target.value
        oldValue[InputName] = InputValue
        setUinput(oldValue);
    }

    const filehandler = (e) => {
        setUinput({...Uinput,file:e.target.files?.[0]})
    }

    const submitHandler = async (e) =>{
        e.preventDefault();
        console.log(Uinput);
        const formData = new FormData();
        formData.append('fullname',Uinput.fullname)
        formData.append('email',Uinput.email)
        formData.append('phone',Uinput.phone)
        formData.append('bio',Uinput.bio)
        formData.append('skills',Uinput.skills)
        if(Uinput?.file) formData.append('file',Uinput?.file)
        // if(Uinput?.profilePic) formData.append('profilePic',Uinput?.profilePic)
        
            try{
                dispatch(setloading(true));
                const res = await axios.post(`https://job-portal-full-stack.pages.dev/api/v1/user/edits/profile`,formData,{headers:{"Content-Type":'multipart/form-data'}, withCredentials:true})
                if(res.data.success){
                    dispatch(setUser(res.data.rsp));
                    toast.success(res.data.message);
                }
            }
            catch(error){
                toast.error(error.response.data.message);
            }
            finally{
                dispatch(setloading(false));
            }
            
            setOpen(false);
    }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent onInteractOutside={()=>setOpen(!open)}>
            <DialogHeader>
                <DialogTitle>
                    Update Profile
                </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={submitHandler} className='p-3' method='POST' encType='multipart/form-data'>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='fullname' className='text-right'>Name:</label>
                    <input onChange={getVal} value={Uinput.fullname} type='text' id='fullname' name='fullname' className='border w-full p-2 rounded-xl'/>
                </p>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='email' className='text-right'>Email:</label>
                    <input onChange={getVal} value={Uinput.email} type='email' id='email' name='email' placeholder='ABC@gmail.com' className='border w-full p-2 rounded-xl'/>
                </p>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='phone' className='text-right'>Phone:</label>
                    <input onChange={getVal} value={Uinput?.phone} type='tel' id='phone' name='phone' placeholder='9456XXX89X' className='border w-full p-2 rounded-xl'/>
                </p>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='bio' className='text-right'>bio:</label>
                    <input onChange={getVal} value={Uinput?.bio} type='text' id='bio' name='bio' placeholder='' className='border w-full p-2 rounded-xl'/>
                </p>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='skills' className='text-right'>Skills:</label>
                    <input onChange={getVal} value={Uinput.skills} type='text' id='skills' name='skills' placeholder='HTML, CSS, JAVA' className='border w-full p-2 rounded-xl'/>
                </p>
                <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='file' className='text-right'>Resume:</label>
                    <input onChange={filehandler} value={Uinput.resume} type='file' accept='application/pdf' id='file' name='file' placeholder='' className='border bg-gray-300 w-full p-2 rounded-xl'/>
                </p>
                {/* <p className='flex items-center gap-2 mb-2'>
                    <label htmlFor='profilePic' className='text-right'>D.Picture:</label>
                    <input onChange={filehandler} value={Uinput.profilePic} type='file' accept='images/*' id='profilePic' name='profilePic' placeholder='' className='border bg-gray-300 w-full p-2 rounded-xl'/>
                </p> */}
                <DialogFooter>
                <button className='w-full hover:cursor-pointer p-2 my-3 bg-black hover:bg-gray-800 rounded-lg text-white font-medium text-lg'>{loading ? 'Please wait...' : 'Update'}</button>
                </DialogFooter>       
            </form>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileModal
