import React from "react"
import { FaFacebookSquare, FaGithubSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa"

function Footer() {
  return (
    <div className="w-full bg-[#FAF9F6]">
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-black'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#0197b2]'>SenDigi</h1>
        <p className='py-4 text-gray-800'>
          We are your trusted solution for parents to monitor and manage children's gadget usage in the digital age.
          With our user-friendly platform accessible via web and mobile devices, we provide extensive access for parents
          to monitor children's online activities in real-time. With SenDigi, you can mitigate the risks of exposure to
          inappropriate content, screen addiction, and the dangers of gadget dependency. Join us at SenDigi and be part
          of the effort to safeguard the digital well-being of the next generation!.
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaGithubSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between ml-6 mr-6 mt-6'>
        <div>
          <h6 className='font-medium text-black'>Solutions</h6>
          <ul>
            <li className='py-2 text-sm text-gray-800'>Monitoring</li>
            <li className='py-2 text-sm text-gray-800'>App Time Usage</li>
            <li className='py-2 text-sm text-gray-800'>Lock Application</li>
            <li className='py-2 text-sm text-gray-800'>Lock Scheduling</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-black'>Support</h6>
          <ul>
            <li className='py-2 text-sm text-gray-800'>Documentation</li>
            <li className='py-2 text-sm text-gray-800'>Guides</li>
            <li className='py-2 text-sm text-gray-800'>API Status</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-black'>Company</h6>
          <ul>
            <li className='py-2 text-sm text-gray-800'>About</li>
            <li className='py-2 text-sm text-gray-800'>Blog</li>
            <li className='py-2 text-sm text-gray-800'>Jobs</li>
            <li className='py-2 text-sm text-gray-800'>Careers</li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-black'>Legal</h6>
          <ul className="text-gray-800">
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer
