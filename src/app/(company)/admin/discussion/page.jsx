'use client'
import ChatsPage from '@/components/chatsPage'
import { SlackChat } from '@/components/SlackChat'
import { checkToken } from '@/utils/getUserData'
import React, { useEffect, useState } from 'react'

const page = () => {
  //  let data =  await checkToken();
  //  console.log(data);
   const [data, setdata] = useState('')


  const fetchdata = async () => {
    let data = await checkToken();
    console.log(data.user.userName);

    setdata(data.user.userName);
  }

  useEffect(() => {
    fetchdata();
  }, [])


  return (
    <div className='w-full'>
      {/* <SlackChat /> */}
      <ChatsPage data={data} />
    </div>
  )
}

export default page