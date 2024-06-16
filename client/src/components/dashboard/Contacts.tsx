import { useMemo } from "react";
import { sortContacts } from "../../utils/helper";
import { ContactType } from "../../types/user.types";
import ContactList from "../ui/dashboard/ContactList";
import DashboardLoader from "../ui/loaders/DashboardLoader";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

const Contacts = () => {
  const { data, isLoading, isSuccess, isError } = useQuery<ContactType[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      console.log("Fetching data");
      const response = await api.get("/user/all");
      return response.data.data;
    },
    retry: 1,

    //when set to false, the query will not refetch on mount (default: true)
    // refetchOnMount: false,

    //its denoting the time after which the data will be considered stale
    // staleTime : Infinity -> data will never be considered stale
    // so the data will be refetched only when the query is invalidated
    staleTime: Infinity,
  });


  const contacts = useMemo(() => sortContacts(data), [data]);

  if (isLoading) return <DashboardLoader />;

  if (isError) return <div>Error</div>;

  if (isSuccess)
    return (
      <div>
        <ContactList contacts={contacts} />
      </div>
    );
};

export default Contacts;
