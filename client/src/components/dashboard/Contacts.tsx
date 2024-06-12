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
      const response = await api.get("/user/all");
      return response.data.data;
    },
    retry: 1,
    refetchOnMount: false,
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
