import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/actions/taskActions';
import { Card, CardContent, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleToggleCompleted = () => {
        const updatedCompletedStatus = !isCompleted;
        setIsCompleted(updatedCompletedStatus);

        dispatch(updateTask({ ...task, isCompleted: updatedCompletedStatus }));
    };

    return (
        <Card style={{ margin: '10px 0' }}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2">{task.description}</Typography>
                <Typography variant="body2">Due: {task.dueDate}</Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isCompleted}
                            onChange={handleToggleCompleted}
                        />
                    }
                    label="Completed"
                />
                <Button onClick={handleDelete} color="secondary">
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default TaskItem;
