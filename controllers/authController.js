const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../db')
require('dotenv').config();

// @desc Login
// @route POST /auth
// @access Public

const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Query to find the user by username
        const query = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(query, [username]);
    
        const foundUser = result.rows[0];
    
        if (!foundUser || !foundUser.active) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
        // Compare the password using bcrypt
    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    // Create access token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

     // Create refresh token
     const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

      // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      // Send accessToken containing username and roles
      res.json({ accessToken });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  // @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired

const refresh = async (req, res) => {
    const cookies = req.cookies;
  
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
  
    const refreshToken = cookies.jwt;
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
  
        try {
          // Query to find the user by username
          const query = 'SELECT * FROM users WHERE username = $1';
          const result = await db.query(query, [decoded.username]);
  
          const foundUser = result.rows[0];
  
          if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
  
          // Create access token
          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.username,
                roles: foundUser.roles,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
          );
  
          res.json({ accessToken });
        } catch (error) {
          console.error('Error during refresh:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    );
  };

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists

const logout = (req, res) => {
    const cookies = req.cookies;
  
    if (!cookies?.jwt) return res.sendStatus(204); // No content
  
    // Clearing the refresh token cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  
    // Perform any additional cleanup or logging out logic here if needed
  
    res.json({ message: 'Cookie cleared' });
  };


module.exports = {
    login,
    refresh,
    logout
}