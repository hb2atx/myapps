const bcrypt = require('bcrypt')
const db = require('../db')

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = async (req, res) => {
    try {
        // Get all users from PostgreSQL
        const result = await db.query('SELECT id, username, email FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// @desc Create new user
// @route POST /users
// @access Private

const createNewUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check for duplicate username or email
        const duplicate = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);

        if (duplicate.rows.length > 0) {
            return res.status(409).json({ message: 'Duplicate username or email' });
        }

        // Hash password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Insert new user
        const insertResult = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPwd]);

        const newUser = insertResult.rows[0];

        res.status(201).json({ message: `New user ${newUser.username} created`, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// @desc Update a user
// @route PATCH /users
// @access Private

const updateUser = async (req, res) => {
    
        const { id, username, email, password } = req.body;
    
        try {
            // Check if the user exists

            const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    
            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }
    
            // Check for duplicate username or email

            const duplicate = await db.query('SELECT * FROM users WHERE (username = $1 OR email = $2) AND id <> $3', [username, email, id]);
    
            if (duplicate.rows.length > 0) {
                return res.status(409).json({ message: 'Duplicate username or email' });
            }
    
            // Hash password

            const hashedPwd = password ? await bcrypt.hash(password, 10) : user.rows[0].password;
    
            // Update user

            await db.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, hashedPwd, id]);
    
            res.json({ message: `${username} updated` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

// @desc Delete a user
// @route DELETE /users
// @access Private

const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        // Check if the user exists

        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        // TODO: Check if the user has assigned notes (use your specific logic)

        // Delete user
        
        await db.query('DELETE FROM users WHERE id = $1', [id]);

        res.json({ message: `User with ID ${id} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}