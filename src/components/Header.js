import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onOpenModal }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Task Manager
                </Typography>
                <Button color="inherit" onClick={onOpenModal}>
                    Add Task
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
