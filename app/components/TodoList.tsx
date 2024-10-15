import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const TodoList = ({ tasks, onEditTask, onDeleteTask }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <View style={styles.taskActions}>
              <Button title="Edit" onPress={() => onEditTask(item)} />
              <Button title="Delete" onPress={() => onDeleteTask(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTitle: {
    fontSize: 16,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default TodoList;
