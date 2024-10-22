import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { TextField, Button, Checkbox, FormControlLabel, Paper } from '@mui/material';

const TaskForm = ({ onTaskAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        isCompleted: false,
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (name === 'dueDate') {
            setError('');
        }
    };

    const isValidDueDate = (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidDueDate(formData.dueDate)) {
            setError('Due date must be today or in the future.');
            return;
        }

        const now = new Date().toISOString();
        const result = await dispatch(addTask({
            ...formData,
            createdAt: now,
            updatedAt: now
        }));

        if (result) {
            onTaskAdded(); // Вызов функции обновления задач
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                isCompleted: false,
            });
            setError('');
        }
    };

    return (
        <Paper style={{ padding: '16px', margin: '20px 0' }}>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={handleOnChange}
                    placeholder="Task Title"
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    placeholder="Task Description"
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleOnChange}
                    required
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    error={!!error}
                    helperText={error}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isCompleted"
                            checked={formData.isCompleted}
                            onChange={handleOnChange}
                        />
                    }
                    label="Completed"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Save Task
                </Button>
            </form>
        </Paper>
    );
};

export default TaskForm;
