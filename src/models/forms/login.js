import bcrypt from 'bcrypt';
import db from '../db.js';

/**
 * Find a user by email address for login verification.
 * 
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} User object with password hash or nul if not found
 */
const findUserByEmail = async (email) => {
    const query = `
        SELECT id, name, LOWER(email), password, created_at
        FROM users
        ORDER BY created_at DESC
    `;
}