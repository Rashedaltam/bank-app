// import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
// import React, { useEffect } from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// const UserProfile: React.FC = () => {
//   const { data, isLoading, isError, error } = useFetchUserProfileData();

//   // for debugging and identifying data interface
//   useEffect(() => {
//     if (data) {
//       console.log("User Profile:", data);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   if (isError) {
//     console.error("Error fetching profile:", error?.message);
//     return <Text>Error loading profile.</Text>;
//   }

//   if (!data) {
//     return <Text>No data found</Text>;
//   }

//   return (
//     <View>
//       <Text>{data.username}</Text>
//       {/* also fix your typo: iamge → image */}
//       <Image source={{ uri: data.image }} />
//     </View>
//   );
// };

// export default UserProfile;

// const styles = StyleSheet.create({});

import { useFetchUserProfileData } from "@/hooks/useUserProfileData";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const UserProfile: React.FC = () => {
  const { data, isLoading, isError, error } = useFetchUserProfileData();

  useEffect(() => {
    if (data) {
      console.log("User Profile:", data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (isError) {
    console.error("Error fetching profile:", error?.message);
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>Error loading profile.</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.errorText}>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: data.image }} style={styles.profileImage} />
      </View>
      <View>
        <Text style={styles.username}>{data.username}</Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
    flexDirection: "row",
  },
  centeredContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ffffff22",
  },
  username: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#cccccc",
  },
  loadingText: {
    marginTop: 10,
    color: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
