import { View, Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
type Props = {
  date: Date;
  setDate: (date: Date) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function ModalDatePicker({
  date,
  setDate,
  open,
  setOpen,
}: Props) {
  //set minimum date allowed
  return (
    <View>
      <Button title="Select Date & Time" onPress={() => setOpen(true)} />
      <DateTimePickerModal
        isVisible={open}
        mode="datetime"
        date={date}
        minimumDate={new Date()}
        onConfirm={(date) => {
          // console.warn("A date has been picked: ", date);
          setDate(date);
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}
