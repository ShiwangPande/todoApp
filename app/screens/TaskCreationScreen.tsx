import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import { insertTask } from '../db/database';

const TaskCreationScreen = ({ route, navigation }) => {
    const { groupId, onGoBack } = route.params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddTask = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a task title.');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Error', 'Please enter a task description.');
            return;
        }

        setLoading(true); 

        try {
            await insertTask(groupId, title, description);
            Alert.alert('Success', 'Task created successfully!');

       
            if (onGoBack) {
                onGoBack();
            }

            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Error', 'Failed to create task. Please try again.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Create New Task</Text>
            </View>
            <TextInput
                placeholder="Task Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                autoFocus
            />
            <TextInput
                placeholder="Task Description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleAddTask} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Create Task</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: '#FAFAFA',
        fontSize: 16,
        color: '#333',
    },
    createButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TaskCreationScreen;
