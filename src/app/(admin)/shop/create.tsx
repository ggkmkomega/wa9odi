import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import React, { Component, useState } from "react";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");
  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const ValidateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("name is required");
      return false;
    }
    if (!price) {
      setErrors("price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("price is not a number");
    }
    return true;
  };
  const onDelete = () => {
    console.warn("DELETED");
  };
  const confirmDelete = () => {
    Alert.alert("Confirm ", "are you sure you want to delete the product ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  const onCreate = () => {
    if (!ValidateInput()) {
      return;
    }
    console.warn("create product");
    //save to DB
    resetFields();
  };
  const onUpdate = () => {
    if (!ValidateInput()) {
      return;
    }
    console.warn("Updating product");
    //save to DB
    resetFields();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: isUpdating ? "Updating A Product" : "Create A Product",
        }}
      />

      <Image
        style={styles.image}
        source={{ uri: image || "https://source.unsplash.com/lP1RhcNrENM" }}
      />
      <Text onPress={pickImage} style={styles.textBtn}>
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="name"
        style={styles.input}
      />

      <Text style={styles.label}>Price (DZD)</Text>
      <TextInput
        onChangeText={setPrice}
        value={price}
        keyboardType="numeric"
        placeholder="9.25"
        style={styles.input}
      />
      {errors && <Text style={styles.errors}>{errors}</Text>}
      <Button text={isUpdating ? "Update " : "Create"} onPress={onSubmit} />
      {isUpdating ? (
        <Text onPress={confirmDelete} style={styles.textBtn}>
          Delete
        </Text>
      ) : (
        "Create"
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  errors: {
    color: "red",
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textBtn: {
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
    alignSelf: "center",
  },
});

export default CreateProductScreen;
