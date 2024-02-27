import { StyleSheet, View, Text, SafeAreaView, Pressable } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { ITheme } from "@/components/ThemeSelector";

const Themes: ITheme[] = [
  { mainColor: "#0047FF", activeTextColor: "#fff" },
  { mainColor: "#00D27A", activeTextColor: "#fff" },
  { mainColor: "#F5803E", activeTextColor: "#fff" },
  { mainColor: "#E63757", activeTextColor: "#fff" },
  { mainColor: "#D8E3FF", activeTextColor: "#0047FF" },
  { mainColor: "#CCF6E4", activeTextColor: "#00864E" },
  { mainColor: "#FDE6D8", activeTextColor: "#9D5228" },
  { mainColor: "#FAD7DD", activeTextColor: "#932338" },
];

type Props = {
  date: DateType;
  setDate: (date: DateType) => void;
};

export default function DatePicker({ date, setDate }: Props) {
  const mode = "single";
  const timePicker = true;

  const theme = Themes[4];
  const locale = "en";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 13, color: "gray" }}>
            (Quantity is agreed upon IRL)
          </Text>
        </View>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePicker}>
            <DateTimePicker
              mode={mode}
              date={date}
              locale={locale}
              //minDate={dayjs().startOf('day')}
              //maxDate={dayjs().add(3, 'day').endOf('day')}
              //firstDayOfWeek={1}
              displayFullDays
              timePicker={timePicker}
              onChange={({ date }) => {
                setDate(date);
              }}
              headerButtonColor={theme?.mainColor}
              selectedItemColor={theme?.mainColor}
              // eslint-disable-next-line react-native/no-inline-styles
              selectedTextStyle={{
                fontWeight: "bold",
                color: theme?.activeTextColor,
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              todayContainerStyle={{
                borderWidth: 1,
              }}
            />
            <View style={styles.footer}>
              {mode === "single" ? (
                <View style={styles.footerContainer}>
                  <Text>
                    {date
                      ? dayjs(date)
                          .locale(locale)
                          .format(
                            timePicker
                              ? "MMMM, DD, YYYY - HH:mm"
                              : "MMMM, DD, YYYY"
                          )
                      : "..."}
                  </Text>
                  <Pressable
                    onPress={() => setDate(dayjs())}
                    accessibilityRole="button"
                    accessibilityLabel="Today"
                  >
                    <View
                      style={[
                        styles.todayButton,
                        { backgroundColor: theme?.mainColor },
                      ]}
                    >
                      <Text
                        style={[
                          styles.todayButtonText,
                          { color: theme?.activeTextColor },
                        ]}
                      >
                        Today
                      </Text>
                    </View>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  datePickerContainer: {
    alignItems: "center",
  },
  datePicker: {
    width: 330,
    backgroundColor: "#F5FCFF",
    padding: 15,
    borderRadius: 15,
    shadowRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  footer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 15,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  todayButtonText: {
    fontWeight: "bold",
  },
});
