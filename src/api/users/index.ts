import { supabase } from "@/lib/supabase";
import { UpadteTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminUsersList = ({ activated = false }) => {
  const active = activated ? ["Activated"] : ["Non-Activated"];
  return useQuery({
    queryKey: ["users", { activated }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .in("activation", active)
        .order("updated_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUserDetails = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({
      id,
      status,
    }: {
      id: string;
      status: UpadteTables<"profiles">;
    }) {
      const { data, error } = await supabase
        .from("profiles")
        .update(status)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["user", id] });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
