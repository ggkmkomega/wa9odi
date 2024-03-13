import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Tables } from "../types";

type UserItemListItemProps = {
  User: Tables<"profiles">;
};

const UserItemListItem = ({ User }: UserItemListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {User.first_name + " " + User.last_name}
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>Status : {User.activation}</Text>
          <Text>0{User.phone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: "row",
    gap: 5,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
});

export default UserItemListItem;
