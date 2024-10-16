import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';

interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

interface TaskDetailScreenProps {
  route: {
    params: {
      task: Task;
      onUpdate: (task: Task) => void;
      onDelete: (id: number) => void;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ route, navigation }) => {
  const { task, onUpdate, onDelete } = route.params || {};

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No task found.</Text>
      </View>
    );
  }

  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);
  const [done, setDone] = useState<boolean>(task.done);

  const handleSave = async () => {
    try {
      await updateTask(task.id, title, description, done);
      Alert.alert('Success', 'Task updated successfully!');
      const updatedTask = { ...task, title, description, done };
      if (onUpdate) {
        onUpdate(updatedTask);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update task. Please try again.');
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteTask(task.id);
            if (onDelete) {
              onDelete(task.id);
            }
            navigation.goBack();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete task. Please try again.');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.textArea]}
        placeholderTextColor="#999"
        multiline={true}
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={() => setDone(!done)}>
        <Text style={styles.buttonText}>{done ? "Mark as Undone" : "Mark as Done"}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginRight: 5,
    padding: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    flex: 1,
    marginLeft: 5,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default TaskDetailScreen;
