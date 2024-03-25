import { supabase } from "@/lib/supabase";
import { UseAuth } from "@/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables, UpadteTables } from "@/types";
import { useLocation } from "@/providers/LocationProvider";

export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived
    ? ["Delivered"]
    : ["New", "Preparing", "Delivering"];

  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = UseAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = UseAuth();
  const user_id = session?.user.id;
  return useMutation({
    async mutationFn({ address, total }: { address: string; total: number }) {
      const { error, data: newOrder } = await supabase
        .from("orders")
        .insert({ user_id, address, total })
        .select()
        .single();

      if (error) {
        throw error;
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: UpadteTables<"orders">;
    }) {
      const { data, error } = await supabase
        .from("orders")
        .update(updatedFields)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      await queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
