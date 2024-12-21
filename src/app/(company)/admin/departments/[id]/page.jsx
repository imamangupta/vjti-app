import React from 'react'

const page = async ({params}) => {
    const slug = (await params).id
  return (
    <div className='p-10'>department Id :  {slug}</div>
  )
}

export default page