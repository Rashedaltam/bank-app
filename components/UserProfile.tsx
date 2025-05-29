import { GetProfile } from "@/api/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";


const UserProfile: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: GetProfile,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    console.error("Error fetching profile:", error?.message);
    return <Text>Error loading profile.</Text>;  // <-- valid ReactNode
  }

  if (!data) {
    return <Text>No data found</Text>;
  }

  return (
    <View>
      <Text>{data.username}</Text>
      {/* also fix your typo: iamge → image */}
      <Image source={{ uri: data.image }} />
    </View>
  );
};

export default UserProfile;

// const UserProfile = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["userProfile"],
//     queryFn: GetProfile,
//   });

//   if (isLoading) return <Text>loading...</Text>;
//   if (isError) return console.log("Error", error?.message); 

//   console.log("Fetching data: ", data);
//   if (!data) return <Text>No data found</Text>;

//   return (
//     <View>
//       <Text>{data.username}</Text>
//       <Image source={{ uri: data?.iamge }} />
//     </View>
//   );
// };

// export default UserProfile;

const styles = StyleSheet.create({});

// <View>
//       <Text>{data.username}</Text>
//       {data ? (
//         data?.image ? (
//           <Image source={{ uri: data?.iamge }} />
//         ) : (
//           <Text>No image exist.</Text>
//         )
//       ) : (
//         <Text>NO DATA</Text>
//       )}
//     </View>
