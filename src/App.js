import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { loginSuccess } from './redux/actions/authActions';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Provider } from 'react-redux';
import store from './redux/store';
import TaskModal from "./components/TaskModal";
import {fetchTasks} from "./redux/actions/taskActions";
import './App.css'

const App = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleTaskAdded = () => {
        dispatch(fetchTasks());
        handleCloseModal();
    };

    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
            dispatch(loginSuccess(token));
        }
    }, [dispatch]);

    return (
        <Router>
            {accessToken ? (
                <>
                    <Header onOpenModal={handleOpenModal} />
                    <TaskModal open={modalOpen} onClose={handleCloseModal} onTaskAdded={handleTaskAdded} />

                    <Routes>
                        <Route path="/" element={<TaskList />} />
                        <Route path="/new-task" element={<TaskForm />} />
                        <Route path="/edit-task/:id" element={<TaskForm />} />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
};

const RootApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default RootApp;
