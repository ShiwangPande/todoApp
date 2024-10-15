import React from 'react';
import { View, StyleSheet } from 'react-native';
import TaskDetail from '../components/TaskDetail';

const TaskDetailScreen = ({ route, navigation }) => {
  const { task } = route.params;

  const handleEdit = () => {
    navigation.navigate('TaskCreation', { task });
  };

  const handleDelete = async () => {
    // Call your delete function and navigate back
  };

  return (
    <View style={styles.container}>
      <TaskDetail task={task} onEdit={handleEdit} onDelete={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TaskDetailScreen;
