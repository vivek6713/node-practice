const {Teacher, Subject, Student} = require("../models");

exports.getReport = async (req, res, next) => {
  try {
    const reportData = await Teacher.findAll({
      include: [
        {
          model: Subject,
          through: {attributes: []},
          include: [
            {
              model: Student,
              attributes: ["id", "name", "email"],
              through: {attributes: []},
            },
          ],
        },
      ],
    });

    const formattedReport = [];

    reportData?.forEach((teacher) => {
      teacher?.subjects?.forEach((subject) => {
        formattedReport.push({
          teacher: teacher?.name,
          subject: subject?.name,
          students: subject?.students,
        });
      });

      // If no subjects are associated, still show teacher with an empty subject array
      //   if (teacher?.subjects?.length === 0) {
      //     formattedReport.push({
      //       teacher: teacher.name,
      //       subject: null,
      //       students: [],
      //     });
      //   }
    });

    return res.status(200).json({success: true, data: formattedReport});
  } catch (error) {
    next(error);
  }
};
