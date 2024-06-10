import { forwardRef } from "react";
import { Contact } from "../../../types/chat.types";
import { Popconfirm } from "antd";
interface UserCardProps {
  user: Contact;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Popconfirm
      placement="right"
      title="Are you sure you want to delete this user?"
      description="This action cannot be undone."
      okText="Yes"
      cancelText="No"
      onConfirm={() => console.log("Delete")}
    >
      <div
        // onContextMenu={(e) => onMenuClick(e)}
        className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3"
      >
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={user?.avatar}
          alt=""
        />

        <div className="flex flex-col justify-center">
          <h4 className="text-[13px] font-semibold text-[#030303]">
            {user?.firstName}
          </h4>
          <p className="text-xs text-[#7C7C7D]">{user?.about}</p>
        </div>
      </div>
    </Popconfirm>
  );
};

export default UserCard;
