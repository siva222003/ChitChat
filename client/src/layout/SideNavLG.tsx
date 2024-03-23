import { useState } from "react";
import ContactsHeader from "../components/chat/ContactsHeader";
import Menu from "../components/ui/Menu";
import { contacts } from "../utils/constants";

const SideNavLG = () => {
  // const [showMenu, setShowMenu] = useState(false);
  // const [points, setPoints] = useState({
  //   x: 0,
  //   y: 0,
  // });

  // console.log(showMenu)
  // const onMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   e.preventDefault()
  //   e.stopPropagation();
  //   setShowMenu(!showMenu)
  //   setPoints({
  //     x: e.pageX,
  //     y: e.pageY
  //   })
  // }

  // const { data } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: getAllUsers,
  // });

  return (
    <nav className="bg-[#F8FAFF] px-6 py-6  max-h-screen overflow-auto">
      <ContactsHeader />

      <div className="py-3">
        <p className="text-[13px] font-semibold text-[#676667]">Pinned</p>

        {contacts.map((e, index) => {
          return (
            <div
              // onContextMenu={(e) => onMenuClick(e)} 
              key={index}
              className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
            >
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={e.src}
                alt=""
              />

              <div className="flex flex-col justify-center">
                <h4 className="text-[13px] font-semibold text-[#030303]">
                  {e.name}
                </h4>
                <p className="text-xs text-[#7C7C7D]">{e.content}</p>
              </div>

              <div className="flex flex-col justify-center ml-auto gap-1">
                <p className="text-[10px] text-[#686768] font-[580]">9:36 PM</p>

                <p
                  className={` ${
                    index % 2 ? "" : "hidden"
                  } rounded-full text-center w-[14px] h-[14px] bg-[#5B96F7] text-white text-[10px] ml-auto`}
                >
                  {index}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="py-4">
        <p className="text-[13px] font-semibold text-[#676667]">All Chats</p>

        {contacts.map((e, index) => {
          return (
            <div
              key={index}
              className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
            >
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src={e.src}
                alt=""
              />

              <div>
                <h4 className="text-[13px] font-semibold text-[#030303]">
                  {e.name}
                </h4>
                <p className="text-xs text-[#7C7C7D]">{e.content}</p>
              </div>

              <p className="text-[10px] text-[#686768] font-[580] ml-auto">
                9:36 PM
              </p>
            </div>
          );
        })}
      </div>

      {/* {showMenu && <Menu points={points} />} */}
    </nav>
  );
};

export default SideNavLG;
