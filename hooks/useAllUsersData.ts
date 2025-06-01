// call all users profile data
import { GetAllUsers } from "@/api/services";
import { useQuery } from "@tanstack/react-query";

export function useAllUsersData() {
  return useQuery({
    queryKey: ["getAllUsersData"],
    queryFn: GetAllUsers,
  });
}
