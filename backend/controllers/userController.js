const geoService = require('../services/geoService');
const { saveUser, findAllUsers, findUserById, updateUserById, deleteUserById } = require('../models/userModel');

// Create a user
exports.createUser = async (req, res) => {
    const { name, zip_code } = req.body;
    try {
        const { latitude, longitude, timezone } = await geoService.fetchGeoData(zip_code);
        const newUser = await saveUser({ name, zip_code, latitude, longitude, timezone });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
};

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
};

// Fetch user
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await findUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user', details: error.message });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, zip_code } = req.body;
    try {
        let updatedData = { name };
        const user = await findUserById(userId);
        if (user.zip_code !== zip_code) {
            const { latitude, longitude, timezone } = await geoService.fetchGeoData(zip_code);
            updatedData = { ...updatedData, zip_code, latitude, longitude, timezone };
        }
        const updatedUser = await updateUserById(userId, updatedData);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await deleteUserById(userId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
};