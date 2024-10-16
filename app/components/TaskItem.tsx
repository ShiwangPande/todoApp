import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../db/database';
import { MaterialIcons } from '@expo/vector-icons'; 

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
               
                <Text style={[styles.taskTitle, { textDecorationLine: task.done ? 'line-through' : 'none', color: task.done ? '#4CAF50' : '#333' }]}>
                    {task.title || "No Title"} 
                </Text>
                <MaterialIcons 
                    name={task.done ? 'check-circle' : 'radio-button-unchecked'} 
                    size={28} 
                    color={task.done ? '#4CAF50' : '#007bff'} 
                />
            </TouchableOpacity>
           
            <Text style={styles.taskDescription}>
                {task.description || "No Description"}
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
        borderRadius: 10, 
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
        fontSize: 18,
        fontWeight: '600', 
        flex: 1,
    },
    taskDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#4CAF50',
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
        elevation: 3, 
    },
    deleteButton: {
        backgroundColor: '#FF3D00', 
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
        elevation: 3, 
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16, 
    },
});

export default TaskItem;
