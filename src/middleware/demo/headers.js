// Route-specific middleware that sets custom headers
const addDemoHeaders = (req, res, next) => {
    // X-Demo-Page header
    res.setHeader('X-Demo-Page', 'true');
    // X-Middleware-Demo header
    res.setHeader('X-Middleware-Demo', 'This is my demo page!');

    next();
};

export { addDemoHeaders };