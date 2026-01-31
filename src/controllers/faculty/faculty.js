import { getAllFaculty, getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    const faculty = getAllFaculty();

    const viewType = req.query.view;

    // Valid options
    const validViews = ['name', 'department', 'title'];

    // Validate provided view
    if(viewType && !validViews.includes(viewType)) {
        return res.status(400);
    };

    // Handle sorting if requested
    let sortBy = req.query.sort || 'name';
    const sortedFaculty = getSortedFaculty(faculty, sortBy);
    
    // Validate sortBy
    if(sortBy && !validViews.includes(sortBy)) {
        sortBy = 'name';
    };

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: sortedFaculty,
        currentSort: sortBy,
    });
};

// Route handler for the faculty details page
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById(facultyId);

    // If ID doesn't exist, create 404 error
    if (!faculty) {
        const err = new Error(`Faculty Member with ${facultyId} ID not found`)
        err.status = 404;
        return next(err);
    }

    res.render('faculty/details', {
        title: `${faculty.name}`,
        faculty: faculty
    });
};

export { facultyListPage, facultyDetailPage };