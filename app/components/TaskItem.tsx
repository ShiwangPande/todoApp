import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../db/database';
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have this installed

interface TaskItemProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
    onComplete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onComplete }) => {
    return (
        <View style={styles.taskContainer}>
            <TouchableOpacity 
                style={styles.taskTitleContainer} 
                onPress={onComplete}
            >
                {/* Ensure task.title is a string */}
                <Text style={[styles.taskTitle, { textDecorationLine: task.done ? 'line-through' : 'none', color: task.done ? '#4CAF50' : '#333' }]}>
                    {task.title || "No Title"} {/* Fallback if title is missing */}
                </Text>
                <MaterialIcons 
                    name={task.done ? 'check-circle' : 'radio-button-unchecked'} 
                    size={28} // Increased icon size
                    color={task.done ? '#4CAF50' : '#007bff'} // Change icon color based on status
                />
            </TouchableOpacity>
            {/* Ensure task.description is a string */}
            <Text style={styles.taskDescription}>
                {task.description || "No Description"} {/* Fallback if description is missing */}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onEdit} style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 10, // Increased border radius for softer corners
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    taskTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskTitle: {
        fontSize: 18, // Increased font size for better readability
        fontWeight: '600', // Semi-bold for better hierarchy
        flex: 1,
    },
    taskDescription: {
        fontSize: 14,
        color: '#666', // Slightly lighter color for the description
        marginTop: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#4CAF50', // Green color for edit
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3, // Add elevation for Android
    },
    deleteButton: {
        backgroundColor: '#FF3D00', // A brighter red for better visibility
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 3, // Add elevation for Android
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16, // Increased font size for better readability
    },
});

export default TaskItem;
