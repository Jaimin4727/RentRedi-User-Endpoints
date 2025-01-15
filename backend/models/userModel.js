const { database } = require('../config/firebaseConfig');
const { ref, set, get, update, remove } = require('firebase/database');

exports.saveUser = async (user) => {
    const userId = `user_${Date.now()}`;
    const userRef = ref(database, `users/${userId}`);
    await set(userRef, { id: userId, ...user });
    return { id: userId, ...user };
};

exports.findAllUsers = async () => {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        const users = snapshot.val();
        return Object.keys(users).map(key => ({
            id: key,
            ...users[key],
        }));
    }
    return [];
};

exports.findUserById = async (userId) => {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.exists() ? snapshot.val() : null;
};

exports.updateUserById = async (userId, data) => {
    const userRef = ref(database, `users/${userId}`);
    await update(userRef, data);
    return { id: userId, ...data };
};

exports.deleteUserById = async (userId) => {
    const userRef = ref(database, `users/${userId}`);
    await remove(userRef);
};