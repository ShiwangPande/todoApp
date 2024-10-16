import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import { fetchTasks, deleteTask, updateTask, Task } from '../db/database';
import TaskItem from '../components/TaskItem';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const TodoListScreen: React.FC<TodoListScreenProps> = ({ route, navigation }) => {
    const { groupId } = route.params;
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Load tasks when the component is focused or when groupId changes
    useFocusEffect(
        React.useCallback(() => {
            loadTasks();

            // Reset tasks when the groupId changes
            return () => {
                setTasks([]);
            };
        }, [groupId])
    );

    const loadTasks = async () => {
        setLoading(true);
        try {
            const fetchedTasks = await fetchTasks(groupId);
            setTasks(fetchedTasks);
        } catch (error) {
            showAlert('Error', 'Failed to load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const showAlert = (title: string, message: string, buttons?: { text: string; onPress?: () => void; style?: string }[]) => {
        Alert.alert(title, message, buttons);
    };

    const handleAddTask = () => {
        navigation.navigate('TaskCreation', {
            groupId,
            onGoBack: loadTasks,
        });
    };

    const handleDeleteTask = (taskId: number) => {
        showAlert('Delete Task', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        await deleteTask(taskId);
                        loadTasks();
                        showAlert('Success', 'Task deleted successfully.');
                    } catch (error) {
                        showAlert('Error', 'Failed to delete task. Please try again.');
                    }
                },
                style: 'destructive',
            },
        ]);
    };

    const handleCompleteTask = async (task: Task) => {
        const updatedTask: Task = { ...task, done: !task.done };
        try {
            await updateTask(updatedTask.id, updatedTask.title, updatedTask.description, updatedTask.done);
            loadTasks();
            showAlert('Success', `Task marked as ${updatedTask.done ? 'complete' : 'incomplete'}.`);
        } catch (error) {
            showAlert('Error', 'Failed to update task. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text style={styles.loadingText}>Loading tasks...</Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={tasks}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TaskItem
                                task={item}
                                onEdit={() => navigation.navigate('TaskDetail', { task: item })}
                                onDelete={() => handleDeleteTask(item.id)}
                                onComplete={() => handleCompleteTask(item)}
                            />
                        )}
                        contentContainerStyle={styles.listContainer}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddTask}
                        disabled={loading}
                    >
                        <Ionicons name="add" size={24} color="white" />
                        <Text style={styles.addButtonText}>Add Task</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 100, // Add padding for the button
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 50,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
    },
});

export default TodoListScreen;
