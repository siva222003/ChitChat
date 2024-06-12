import { ConversationType } from "../../types/chat.types";
import ConversationList from "../ui/dashboard/ConversationList";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";
import DashboardLoader from "../ui/loaders/DashboardLoader";

type ConversationsProps = {
  archived?: boolean;
};

const Conversations = ({ archived = false }: ConversationsProps) => {
  const {
    data: conversations,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<ConversationType[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await api.get("/chat");
      return data.data;
    },
    retry: 1,
    refetchOnMount: false,
  });

  if (isLoading) return <DashboardLoader />;

  if (isError) return <div>Error fetching data</div>;

  if (isSuccess && conversations)
    return (
      <div>
        {archived ? (
          <div>Archived</div>
        ) : (
          <>
            <div className="py-4">
              <p className="text-[13px] font-semibold text-[#676667]">
                All Chats
              </p>
              <ConversationList conversations={conversations} />
            </div>
          </>
        )}
      </div>
    );
};

export default Conversations;
