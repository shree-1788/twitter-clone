import Image from 'next/image'
import {BsTwitter, BsSearch,BsBookmark} from 'react-icons/bs';
import {BiHomeCircle} from 'react-icons/bi';
import {IoIosNotificationsOutline} from 'react-icons/io';
import {MdOutlineAccountCircle} from 'react-icons/md';
import FeedCard from '@/components/FeedCard';

interface TwitterSideBarButtons {
    title: string,
    icons: React.ReactNode
}

const sidebarMenu: TwitterSideBarButtons[] = [
    {
        title: "Home",
        icons: <BiHomeCircle/>
    },
    {
        title: "Explore",
        icons: <BsSearch/>
    },
    {
        title: "Notifications",
        icons: <IoIosNotificationsOutline/>
    },
    {
        title: "Bookmark",
        icons: <BsBookmark/>
    },
    {
        title: "Profile",
        icons: <MdOutlineAccountCircle/>
    },
]



export default function Home() {
  return (
   <div className='grid grid-cols-12 h-screen w-s px-56'>
    <div className='col-span-3 '>
        <div className='text-3xl mt-8  ml-4 hover:bg-gray-800 h-fit rounded-full p-2 cursor-pointer w-fit'>
        <BsTwitter/>
        </div>
        <div className='mt-4 font-bold text-2xl cursor-pointer'>
        <ul>
            {sidebarMenu.map((item) => {
                return <li className='flex justify-start items-center gap-4 hover:bg-gray-600 rounded-2xl w-fit px-4 py-2' key={item.title}><span className='text-3xl'>{item.icons}</span>
                 <span> {item.title}</span></li>
            })}
        </ul>
        </div>
        <div className='mt-5 px-3 '>
        <button className='bg-[#1d9bf0] text-lg rounded-full p-4 w-full'>Post</button>
        </div>
    </div>
    <div className=' col-span-6 border-r-[1px] border-l-[1px] border-gray-600 overflow-scroll h-screen'>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>

       
    </div>
    <div className='col-span-3 '></div>
   </div>  )
}
