const users = new Map();

/**
 * Add a user
 */
function addUser(socketId, username) {

    username = username.trim();

    users.set(socketId, {
        socketId,
        username,
        joinedAt: new Date()
    });

    return users.get(socketId);

}

/**
 * Remove a user
 */
function removeUser(socketId) {

    const user = users.get(socketId);

    if (!user) {
        return null;
    }

    users.delete(socketId);

    return user;

}

/**
 * Get user by socket id
 */
function getUser(socketId) {

    return users.get(socketId) || null;

}

/**
 * Check if username already exists
 * (Case insensitive)
 */
function usernameExists(username) {

    username = username.trim().toLowerCase();

    for (const user of users.values()) {

        if (user.username.toLowerCase() === username) {
            return true;
        }

    }

    return false;

}

/**
 * Get all online users
 */
function getUsers() {

    return Array.from(users.values())
        .sort((a, b) => a.username.localeCompare(b.username));

}

/**
 * Online count
 */
function getUserCount() {

    return users.size;

}

/**
 * Clear all users
 * (Useful during development)
 */
function clearUsers() {

    users.clear();

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    usernameExists,
    getUsers,
    getUserCount,
    clearUsers
};