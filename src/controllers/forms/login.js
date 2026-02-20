import { body, validationResult } from 'express-validator';
import { findUserByEmail, verifyPassword } from '../../models/forms/login.js';
import { Router } from 'express';

const router = Router();

/**
 * Validation rules for login form
 */
const loginValidation = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
        .isLength({max: 255})
        .withMessage('Email Address is too long'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 8, max: 128})
    .withMessage('Password must be between 8 and 128 characters')
];

/**
 * Display the login form page.
 */
const showLoginForm = (req, res) => {
    res.render('forms/login/form', {
        title: 'User Login'
    });
};

/**
 * Process login form submission.
 */
const processLogin = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Client-side error message
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('/login');
    }

    // Extract name, email and password from req.body
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            // Client-side error message
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        const verifyPwd = await verifyPassword(password, user.password);
        if (!verifyPwd) {
            // Client-side error message
            req.flash('error', 'Invalid email or password');
            return res.redirect('/login');
        }

        // Remove password from user object before storing in session
        delete user.password;

        req.session.user = user;

        // Client-side error message
        req.flash('success', `Welcome, ${user.name}!`);
        res.redirect('/dashboard');
    } catch (error) {
        // Server-side error message
        console.error('Error during login: ', error);
        // Client-side error message
        req.flash('error', 'Unable to log in. Please try again later.');
        return res.redirect('/login');
    }
};

/**
 * Handle user logout.
 * 
 * NOTE: connect.sid is the default session cookie name since we did not specify a custom name when creating the session in server.js.
 */
const processLogout = (req, res) => {
    // Check if there is a session object on the request
    if (!req.session) {
        // If no session exists, there's nothing to destroy, so we just redirect the user back to the home page
        return res.redirect('/');
    }

    // Call destroy() to remove this session from the store (PostgreSQL in our case)
    req.session.destroy((err) => {
        if (err) {
            // If something goes wrong while removing the session from the database:
            console.error('Error destroying session: ', err);

            /**
             * Clear the session cookie from the browser anyway, so the client does not keep sending an invalid session ID.
             */
            res.clearCookie('connect.sid');

            /**
             * Redirect to the home page since this is a practice site.
             * 
             * Normally we would respond with a 500 error since logout did not fully succeed.
             * Example: return res.status(500).send('Error logging out');
             */
            return res.redirect('/');
        }

        // If session destruction succeeded, clear the session cookie from the browser
        res.clearCookie('connect.sid');

        // Redirect the user to the home page
        res.redirect('/');
    });
};

/**
 * Display protected dashboard (requires login).
 */
const showDashboard = (req, res) => {
    const user = req.session.user;
    const sessionData = req.session;

    // Ensure user and sessionData do not contain password field
    if (user && user.password) {
        console.error('Security error: password found in user object');
        delete user.password;
    }
    if (sessionData.user && sessionData.user.password) {
        console.error('Security error: password found in sessionData.user');
        delete sessionData.user.password;
    }

    res.render('dashboard', {
        title: 'Dashboard',
        user,
        sessionData
    })
};

// Routes
router.get('/', showLoginForm);
router.post('/', loginValidation, processLogin);

// Export router as default, and specific functions for root-level routes
export default router;
export { processLogout, showDashboard };