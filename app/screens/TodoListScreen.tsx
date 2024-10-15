import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import TodoList from '../components/TodoList';
import { getTasks, deleteTask } from '../database/database';

const TodoListScreen = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks(groupId);
      setTasks(tasksData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => navigation.navigate('TaskCreation', { groupId })} />
      <TodoList tasks={tasks} onEditTask={(task) => navigation.navigate('TaskDetail', { task })} onDeleteTask={handleDeleteTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default TodoListScreen;
