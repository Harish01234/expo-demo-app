import { Button, Platform, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {useReminderStore} from '@/store/store';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");

  const {taskName, reminderTime, second} = useReminderStore();
  console.log(taskName, reminderTime, second);
  console.log(typeof(second));
  
 
  
  
  useEffect(() => {
    console.log("Registering for push notifications...");
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token: ", token);
        setExpoPushToken(token || " ");
      })
      .catch((err) => console.log(err));
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "2480a0d6-80be-471d-8522-69cbf62e0daa",
        })
      ).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const sendNotification = async () => {
    console.log("Scheduling push notification...");

    // Schedule the notification to be triggered after 5 seconds
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "My first scheduled push notification!",
        body: taskName,
      },
      trigger: {
        seconds: second, // trigger after 5 seconds
      },
    });
  };

  return (
    <View style={{ marginTop: 100, alignItems: "center" }}>
      <Text style={{ marginVertical: 30 }}>Expo RN Push Notifications</Text>
      <Button title="Send push notification" onPress={sendNotification} />
    </View>
  );
}
