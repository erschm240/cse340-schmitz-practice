import { getFacultyBySlug, getSortedFaculty } from "../../models/faculty/faculty.js";

// Route handler for the faculty list page
const facultyListPage = async (req, res) => {
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'department';
    const sortedFaculty = await getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: sortedFaculty,
        currentSort: sortBy,
    });
};

// Route handler for the faculty details page
const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultyId;
    const facultyMember =  await getFacultyBySlug(facultySlug);

    // If ID doesn't exist, create 404 error
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty Member '${facultyId}' not found`)
        err.status = 404;
        return next(err);
    }

    res.render('faculty/details', {
        title: `${facultyMember.name} - Faculty Profile`,
        faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };