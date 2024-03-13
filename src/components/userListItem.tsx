import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Tables } from "../types";
import { Link, useSegments } from "expo-router";

type UserListItemProps = {
  user: Tables<"profiles">;
};

const UserListItem = ({ user }: UserListItemProps) => {
  const segments = useSegments();

  return (
    <Link href={`/${segments[0]}/users/${user.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.title}>
            {user.first_name + " " + user.last_name}
          </Text>
          <Text style={styles.time}>ID: {user.id}</Text>
        </View>

        <Text style={styles.status}>
          {user.activation === "Activated" ? "Activated" : "Non-Activated"}
        </Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  time: {
    color: "gray",
  },
  status: {
    fontWeight: "500",
  },
});

export default UserListItem;
