import React from "react";
import Image from "next/image";
import {FaRegComment,FaRetweet} from "react-icons/fa"
import {AiOutlineHeart} from "react-icons/ai"

import {BsUpload} from "react-icons/bs"

const FeedCard: React.FC = () => {
        return <div className=" border border-gray-600 border-r-0 border-l-0 p-4 hover:bg-slate-900 cursor-pointer transition-all"  >
            <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2">
                    <Image src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg" alt="profile-image" height={50} width={50} className="rounded-full"/>
            </div>
            <div className="col-span-10">
                <h5>Shreerang Patil</h5>
                <p> Stick  to a programming language like C/C++ or Java. 
                Sell your digital products, not time! 🚀
I've developed "IdeaVault", a curated collection of 50+ innovative digital product ideas to get you started.
Today? It's FREE.
</p>
<div className="flex justify-between items-center mt-5 p-2 text-lg w-[90%]">
                <div >
                <FaRegComment/>
                </div>
                <div>
                <FaRetweet/>
                </div>
                <div>
                <AiOutlineHeart/>
                </div>
                <div>
                <BsUpload/>
                </div>
            </div>
            </div>
          
            </div>
        </div>
}

export default FeedCard;