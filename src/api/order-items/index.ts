import { useMutation } from "@tanstack/react-query";
import { InsertTables } from "@/types";
import { supabase } from "@/lib/supabase";

export const useInserItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { error, data: orderItem } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw error;
      }
      return orderItem;
    },
  });
};
