import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TaskForm from '../components/TaskForm';
import { insertTask } from '../database/database';

const TaskCreationScreen = ({ route, navigation }) => {
  const { groupId, task } = route.params || {};

  const handleSave = async (taskData) => {
    await insertTask(groupId, taskData.title, taskData.description);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TaskForm task={task} onSave={handleSave} onCancel={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TaskCreationScreen;
