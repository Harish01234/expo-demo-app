import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


function secondsUntil(dateString: Date): number {
  // Get the current time
  const now = new Date();

  // Calculate the difference in milliseconds
  const timeDifference = dateString.getTime() - now.getTime();

  // Convert the difference to seconds
  const seconds = Math.floor(timeDifference / 1000);

  // Return the number of seconds
  return seconds;
}

const ReminderForm = () => {
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Function to handle time change
  const onChange = (event: any, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowPicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  // Function to show the time picker
  const showTimepicker = () => {
    setShowPicker(true);
  };

  const handleSubmit = () => {
    console.log(taskName, time);
    console.log(secondsUntil(time));
    
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter Task:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          padding: 10,
        }}
        placeholder="Task Name"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
      />

      <Text>Select Time:</Text>
      <Button onPress={showTimepicker} title="Pick Time" />
      
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Set Reminder" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default ReminderForm;