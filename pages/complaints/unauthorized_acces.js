import Link from 'next/link'
import React from 'react'

function unauthorized_acces() {
  return (
    <div className='md:ml-60'>
        <div className='flex flex-col md:flex-row h-screen p-6 md:p-12'>
            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-1/2'>
                <h1 className='text-4xl font-bold text-gray-800'>Unauthorized Access</h1>
                <p className='text-gray-500 mt-4'>You are not authorized to access this page.</p>
                <Link href="/complaints">
                    <a className='bg-zinc-700 text-white px-4 py-2 rounded-lg mt-4'>Go Back to your ward complaint</a>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default unauthorized_acces