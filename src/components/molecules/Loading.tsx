import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";

const Loader: React.FC<any> = () => {
  return (
    <View>
      <ActivityIndicator color={"red"} size="large" />
    </View>
  );
};

export default Loader;
