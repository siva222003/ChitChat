import { ChatCircleDots, Users, Phone, Gear } from "phosphor-react";
import logo from '../assets/images/logo.svg'
const SideNavSM = () => {
  return (
    <section className="flex px-2 border-2 h-screen flex-col items-center justify-between bg-[#F0F4FA]">
      <div className="flex  flex-col items-center">
        <div className="py-6 gap-6 border-b-2 w-1/2 border-[#B4B4B4] flex flex-col items-center b-2">
          <div className="h-16 mb-4 w-16 bg-[#AFBBF7] rounded-xl flex justify-center items-center">
            <img
              src={logo}
              alt=""
              className="w-10 h-10"
            />
          </div>
          <div className="h-12 w-12 cursor-pointer bg-[#5B96F7] rounded-xl  flex justify-center items-center ">
            <ChatCircleDots size={23} className="text-white" />
          </div>
          <div className="h-10 w-10 cursor-pointer  flex justify-center items-center ">
            <Users size={23} />
          </div>
          <div className="h-10 w-10 cursor-pointer  flex justify-center items-center ">
            <Phone size={23} />
          </div>
        </div>
        <div className="h-10 w-10 cursor-pointer  flex justify-center items-center mt-5">
          <Gear size={23} />
        </div>
      </div>
      <div className="flex  flex-col items-center gap-6 my-10">
        <div className="h-10 w-10 cursor-pointer  flex justify-center items-center ">
          <Users size={23} />
        </div>
        <div className="h-14 w-14 rounded-full bg-blue-400 cursor-pointer  flex justify-center items-center ">
        </div>
      </div>
    </section>
  );
};

export default SideNavSM;
