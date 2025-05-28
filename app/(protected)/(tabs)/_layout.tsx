import Tabs from "expo-router/build/layouts/Tabs";
import React from "react";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
};

export default _layout;
