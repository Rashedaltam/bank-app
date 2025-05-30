//Custom hook to fetch the current user's profile data, instead of rewriting useQuery everytime
import { GetProfile } from "@/api/services";
import { useQuery } from "@tanstack/react-query";

export function useUserProfileData() {
  return useQuery({
    queryKey: ["GetProfile"],
    queryFn: GetProfile,
  });
}
