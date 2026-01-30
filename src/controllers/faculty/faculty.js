import { getAllFaculty, getFacultyById, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    const faculty = getAllFaculty();

    res.render('list', {
        title: 'Faculty List',
        faculty: faculty
    });
};

// Route handler for the faculty details page
const facultyDetailPage = (req, res) => {
    const facultyId = req.params.facultyId;
    const faculty = getFacultyById();

    // If ID doesn't exist, create 404 error
    if (!faculty) {
        const err = new Error(`Faculty Member with ${facultyId} ID not found`)
        err.status(404);
        return next(err);
    }

    res.render('details', {
        title: 'Faculty Details',
        details: faculty
    })
};

export { facultyListPage, facultyDetailPage };