import { ContactType } from "../../../types/user.types";
import { Popconfirm } from "antd";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../api/axios";
interface ContactCardProps {
  contact: ContactType;
}

const ContactCard = ({ contact }: ContactCardProps) => {

  const { mutate, isPending, isError, error } = useMutation({
    
    mutationFn: async (data: { friendId: string }) => {
      const response = await api.post("/user/add-friend", data);
      return response.data;
    },
    // onSuccess: (data) => {
    //   localStorage.setItem("accessToken", data.data.accessToken || "");
    //   queryClient.invalidateQueries({ queryKey: ["contact"] });
    //   navigate(HOME_ROUTE);
    // },
    // onError: (err: AxiosError) => {
    //   console.error(
    //     "Error from server:",
    //     (err.response?.data as Error).message
    //   );
    // },
  });

  const handleConfirm = () => {
    if (contact) {
      mutate({ friendId: contact._id });
    }
  };

  return (
    <Popconfirm
      placement="right"
      title=""
      icon={null}
      description=""
      overlayInnerStyle={{
        paddingRight: "10px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "7px",
      }}
      okText="Add Friend"
      showCancel={false}
      okButtonProps={{ className: "bg-blue-500 text-white" }}
      onConfirm={handleConfirm}
    >
      <div
        // onContextMenu={(e) => onMenuClick(e)}

        className="w-full flex my-3 bg-white rounded-lg py-3 px-3 gap-3 cursor-pointer "
      >
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={contact?.avatar}
          alt=""
        />

        <div className="flex flex-col justify-center">
          <h4 className="text-[13px] font-semibold text-[#030303]">
            {contact?.firstName}
          </h4>
          <p className="text-xs text-[#7C7C7D]">{contact?.about}</p>
        </div>
      </div>
    </Popconfirm>
  );
};

export default ContactCard;
