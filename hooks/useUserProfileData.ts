//Custom hook to fetch the current user's profile data, instead of rewriting useQuery everytime
import { GetProfile } from "@/api/services";
import { UserProfileDataType } from "@/types/UserProfileDataType";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserProfileData() {
  return useQuery<UserProfileDataType>({
    queryKey: ["GetProfile"],
    queryFn: GetProfile,
  });
}
