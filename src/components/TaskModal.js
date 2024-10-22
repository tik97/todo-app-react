import React from 'react';
import { Modal, Button, Paper } from '@mui/material';
import TaskForm from './TaskForm';

const TaskModal = ({ open, onClose, onTaskAdded }) => {
    return (
        <Modal className="add-modal" open={open} onClose={onClose}>
            <Paper style={{ padding: '16px', margin: 'auto', maxWidth: 400, top: '20%', position: 'absolute' }}>
                <h2>Add New Task</h2>
                <TaskForm onTaskAdded={onTaskAdded} />
                <Button onClick={onClose} color="secondary">Cancel</Button>
            </Paper>
        </Modal>
    );
};

export default TaskModal;
