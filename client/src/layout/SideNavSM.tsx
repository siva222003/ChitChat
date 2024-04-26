import { ChatCircleDots, Users, Phone, Gear } from "phosphor-react";
import logo from "../assets/images/logo.svg";
import { Dashboard, DashboardEnum } from "../types/chat.types";
import useAuth from "../hooks/useAuth";

type SideNavSMProps = {
  currentTab: Dashboard;
  setCurrentTab: React.Dispatch<React.SetStateAction<Dashboard>>;
};

const SideNavSM = ({ currentTab, setCurrentTab }: SideNavSMProps) => {
  const {user} = useAuth()
  return (
    <nav className="flex px-3 border-2 h-screen flex-col items-center justify-between bg-[#F0F4FA]">
      <div className="flex  flex-col items-center">
        <div className="py-6 gap-6 border-b-2 w-1/2 border-[#B4B4B4] flex flex-col items-center b-2">
          <div className="h-16 mb-4 w-16 bg-[#AFBBF7] rounded-xl flex justify-center items-center">
            <img src={logo} alt="" className="w-10 h-10" />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Conversations)}
            className={`h-12 w-12 cursor-pointer rounded-xl flex justify-center items-center ${
              currentTab === DashboardEnum.Conversations ||
              currentTab === DashboardEnum.Archived
                ? "bg-[#5B96F7] text-white"
                : ""
            }`}
          >
            <ChatCircleDots size={23} />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Groups)}
            className={`h-12 w-12 cursor-pointer rounded-xl  flex justify-center items-center ${
              currentTab === DashboardEnum.Groups ? "bg-[#5B96F7] text-white" : ""
            }`}
          >
            <Users size={23} />
          </div>
          <div
            onClick={() => setCurrentTab(DashboardEnum.Contacts)}
            className={`h-12 w-12 cursor-pointer rounded-xl  flex justify-center items-center ${
              currentTab === DashboardEnum.Contacts
                ? "bg-[#5B96F7] text-white"
                : ""
            }`}
          >
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
        <div className="h-14 w-14 rounded-full  cursor-pointer">
          <h1>{user?.data?.firstName}</h1>
          <img
            className="inline-block h-14 w-14 rounded-full"
            src={user?.data?.avatar}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default SideNavSM;
