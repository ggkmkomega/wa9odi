import { StyleSheet, Text, View, TextInput, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Colors from "@/constants/Colors";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/api/products";
import { useRouter } from "expo-router";
import { randomUUID } from "expo-crypto";
import { supabase } from "@/lib/supabase";
import { decode } from "base64-arraybuffer";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState("");

  const router = useRouter();

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0]
  );
  const isUpdating = !!id;

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { data: UpdatingProduct } = useProduct(id);

  useEffect(() => {
    if (UpdatingProduct) {
      setName(UpdatingProduct?.name);
      setPrice(UpdatingProduct?.price.toString());
      setImage(UpdatingProduct?.image);
    }
  }, [UpdatingProduct]);
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
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)");
      },
    });
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  const onCreate = async () => {
    if (!ValidateInput()) {
      return;
    }
    const imagePath = await uploadImage();
    //save to DB
    insertProduct(
      { name, image: imagePath, price: parseFloat(price) },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };
  const onUpdate = () => {
    if (!ValidateInput()) {
      return;
    }
    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });
    if (data) {
      return data.path;
    }
    if (error) {
      throw new Error(error.message);
    }
  };

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
      ) : null}
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
