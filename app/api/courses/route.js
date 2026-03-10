// import promisePool from '../../../libs/db';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         console.log("API Received Body:", body);

//         const {
//             courseTitle,
//             batchNumber,
//             seatsLeft,
//             timeLeft,
//             starRating,
//             courseCost,
//             tutorVideo,
//             bannerImage,
//             instructorImage,
//             gifFile,
//             benefits,
//             projects,
//             courseOutlines
//         } = body;

//         // Convert arrays to JSON
//         const outlinesJSON = JSON.stringify(courseOutlines || []);
//         const benefitsJSON = JSON.stringify(benefits || []);
//         const projectsJSON = JSON.stringify(projects || []);

//         const query = `
//       INSERT INTO users_login.courses 
//       (course_title, batch_number, seats_left, time_left, star_rating, course_cost, 
//        uploaded_video, banner_image, instructor_image, uploaded_gif, 
//        Course_Benifits, Course_Projects, Course_Outlines)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//         const values = [
//             courseTitle,
//             batchNumber,
//             seatsLeft,
//             timeLeft,
//             starRating,
//             courseCost,
//             tutorVideo,
//             bannerImage,
//             instructorImage,
//             gifFile,
//             benefitsJSON,
//             projectsJSON,
//             outlinesJSON
//         ];

//         console.log("API Query Values:", values);

//         const [result] = await promisePool.execute(query, values);

//         return NextResponse.json(
//             { success: true, message: "Course added successfully", courseId: result.insertId },
//             { status: 201 }
//         );

//     } catch (error) {
//         console.error("Database error:", error);
//         return NextResponse.json(
//             { success: false, message: "Error adding course", error: error.message },
//             { status: 500 }
//         );
//     }
// }


// // GET method 
// // export async function GET() {
// //     try {
// //         const query = 'SELECT * FROM users_login.courses';
// //         const [rows] = await promisePool.execute(query);

// //         return NextResponse.json({
// //             success: true,
// //             course: rows
// //         }, { status: 200 });
// //     } catch (error) {
// //         console.log("Error fetching courses:", error);
// //         return NextResponse.json({
// //             success: false,
// //             message: "Error fetching courses",
// //             error: error.message
// //         }, { status: 500 });
// //     }
// // }
// // GET method
// export async function GET() {
//     try {
//         const query = 'SELECT * FROM users_login.courses';
//         const [rows] = await promisePool.execute(query);

//         // Safely parse JSON fields
//         const courses = rows.map((course) => {
//             let benefits = [];
//             let projects = [];
//             let outlines = [];

//             try {
//                 benefits = Array.isArray(course.Course_Benifits)
//                     ? course.Course_Benifits
//                     : JSON.parse(course.Course_Benifits || '[]');
//             } catch (e) {
//                 console.warn(`Failed to parse benefits for course ${course.id}`);
//             }

//             try {
//                 projects = Array.isArray(course.Course_Projects)
//                     ? course.Course_Projects
//                     : JSON.parse(course.Course_Projects || '[]');
//             } catch (e) {
//                 console.warn(`Failed to parse projects for course ${course.id}`);
//             }

//             try {
//                 outlines = Array.isArray(course.Course_Outlines)
//                     ? course.Course_Outlines
//                     : JSON.parse(course.Course_Outlines || '[]');
//             } catch (e) {
//                 console.warn(`Failed to parse outlines for course ${course.id}`);
//             }

//             return {
//                 id: course.id,
//                 course_title: course.course_title,
//                 batch_number: course.batch_number,
//                 seats_left: course.seats_left,
//                 time_left: course.time_left,
//                 star_rating: course.star_rating,
//                 course_cost: course.course_cost,
//                 uploaded_video: course.uploaded_video,
//                 banner_image: course.banner_image,
//                 instructor_image: course.instructor_image,
//                 uploaded_gif: course.uploaded_gif,
//                 Course_Benifits: benefits,
//                 Course_Projects: projects,
//                 Course_Outlines: outlines,
//             };
//         });

//         return NextResponse.json({ success: true, course: courses }, { status: 200 });
//     } catch (error) {
//         console.log('Error fetching courses:', error);
//         return NextResponse.json(
//             { success: false, message: 'Error fetching courses', error: error.message },
//             { status: 500 }
//         );
//     }
// }



// export async function PUT(req) {
//     try {
//         const body = await req.json();

//         // Get ID from body or query param
//         const url = new URL(req.url);
//         const idFromQuery = url.searchParams.get('id');
//         const courseId = body.id || idFromQuery;

//         if (!courseId) {
//             return NextResponse.json(
//                 { success: false, message: 'Missing course ID' },
//                 { status: 400 }
//             );
//         }

//         // Normalize fields (accept snake_case or camelCase)
//         // Accept either camelCase or snake_case
//         const course = {
//             courseTitle: body.courseTitle || body.course_title,
//             batchNumber: body.batchNumber || body.batch_number,
//             seatsLeft: body.seatsLeft || body.seats_left,
//             timeLeft: body.timeLeft || body.time_left,
//             starRating: body.starRating || body.star_rating,
//             courseCost: body.courseCost || body.course_cost,
//             courseOutlineTitle: body.courseOutlineTitle || body.course_outline_title,
//             courseOutlineDesc: body.courseOutlineDesc || body.course_outline_description,
//             tutorVideo: body.tutorVideo || body.uploaded_video,
//             instructorImage: body.instructorImage || body.instructor_image,
//             gifFile: body.gifFile || body.uploaded_gif,
//             benefits: body.benefits || body.Course_Benifits,
//             projects: body.projects || body.Course_Projects,
//         };

//         // Replace strict validation with:
//         for (const key in course) {
//             if (course[key] === undefined || course[key] === null) {
//                 return NextResponse.json(
//                     { success: false, message: `Missing field: ${key}` },
//                     { status: 400 }
//                 );
//             }
//         }


//         const query = `
//       UPDATE users_login.courses
//       SET
//         course_title = ?,
//         batch_number = ?,
//         seats_left = ?,
//         time_left = ?,
//         star_rating = ?,
//         course_cost = ?,
//         course_outline_title = ?,
//         course_outline_description = ?,
//         uploaded_video = ?,
//         instructor_image = ?,
//         uploaded_gif = ?,
//         Course_Benifits = ?,
//         Course_Projects = ?
//       WHERE id = ?
//     `;

//         await promisePool.execute(query, [
//             course.courseTitle,
//             course.batchNumber,
//             course.seatsLeft,
//             course.timeLeft,
//             course.starRating,
//             course.courseCost,
//             course.courseOutlineTitle,
//             course.courseOutlineDesc,
//             course.tutorVideo,
//             course.instructorImage,
//             course.gifFile,
//             JSON.stringify(course.benefits),
//             JSON.stringify(course.projects),
//             courseId
//         ]);

//         return NextResponse.json(
//             { success: true, message: 'Course updated successfully' },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error('Error updating course:', error);
//         return NextResponse.json(
//             { success: false, message: 'Error updating course', error: error.message },
//             { status: 500 }
//         );
//     }
// }







// // DELETE 

// export async function DELETE(req) {
//     try {
//         const url = new URL(req.url);
//         const id = url.searchParams.get("id");

//         if (!id) {
//             return NextResponse.json(
//                 { success: false, message: "Missing course ID" },
//                 { status: 400 }
//             );
//         }

//         await promisePool.execute(
//             "DELETE FROM users_login.courses WHERE id = ?",
//             [id]
//         );

//         return NextResponse.json(
//             { success: true, message: "Deleted successfully" },
//             { status: 200 }
//         );
//     } catch (err) {
//         console.error("Delete error:", err);
//         return NextResponse.json(
//             { success: false, message: "Error deleting course", error: err.message },
//             { status: 500 }
//         );
//     }
// }

// import promisePool from '../../../libs/db';
// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const {
//       courseTitle,
//       batchNumber,
//       seatsLeft,
//       timeLeft,
//       starRating,
//       courseCost,
//       tutorVideo,
//       bannerImage,
//       instructorImage,
//       gifFile,
//       benefits,
//       projects,
//       courseOutlines,
//       startDate,
//       numberOfClasses,
//       classSchedule
//     } = body;

//     const outlinesJSON = JSON.stringify(courseOutlines || []);
//     const benefitsJSON = JSON.stringify(benefits || []);
//     const projectsJSON = JSON.stringify(projects || []);
//     const scheduleJSON = JSON.stringify(classSchedule || []);

//     const query = `
//       INSERT INTO users_login.courses
//       (course_title, batch_number, seats_left, time_left, star_rating, course_cost,
//        uploaded_video, banner_image, instructor_image, uploaded_gif,
//        Course_Benifits, Course_Projects, Course_Outlines,
//        start_date, number_of_classes, class_schedule)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [
//       courseTitle,
//       batchNumber,
//       seatsLeft,
//       timeLeft,
//       starRating,
//       courseCost,
//       tutorVideo,
//       bannerImage,
//       instructorImage,
//       gifFile,
//       benefitsJSON,
//       projectsJSON,
//       outlinesJSON,
//       startDate,
//       numberOfClasses,
//       scheduleJSON
//     ];

//     const [result] = await promisePool.execute(query, values);

//     return NextResponse.json(
//       { success: true, message: "Course added successfully", courseId: result.insertId },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json(
//       { success: false, message: "Error adding course", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // GET Method
// export async function GET() {
//   try {
//     const query = 'SELECT * FROM users_login.courses';
//     const [rows] = await promisePool.execute(query);

//     const courses = rows.map(course => {
//       let benefits = [], projects = [], outlines = [], classSchedule = [];
//       try { benefits = JSON.parse(course.Course_Benifits || '[]'); } catch {}
//       try { projects = JSON.parse(course.Course_Projects || '[]'); } catch {}
//       try { outlines = JSON.parse(course.Course_Outlines || '[]'); } catch {}
//       try { classSchedule = JSON.parse(course.class_schedule || '[]'); } catch {}

//       return {
//         id: course.id,
//         course_title: course.course_title,
//         batch_number: course.batch_number,
//         seats_left: course.seats_left,
//         time_left: course.time_left,
//         star_rating: course.star_rating,
//         course_cost: course.course_cost,
//         uploaded_video: course.uploaded_video,
//         banner_image: course.banner_image,
//         instructor_image: course.instructor_image,
//         uploaded_gif: course.uploaded_gif,
//         Course_Benifits: benefits,
//         Course_Projects: projects,
//         Course_Outlines: outlines,
//         startDate: course.start_date,
//         numberOfClasses: course.number_of_classes,
//         classSchedule: classSchedule
//       };
//     });

//     return NextResponse.json({ success: true, course: courses }, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     return NextResponse.json({ success: false, message: 'Error fetching courses', error: error.message }, { status: 500 });
//   }
// }

// // PUT Method
// export async function PUT(req) {
//   try {
//     const body = await req.json();
//     const url = new URL(req.url);
//     const courseId = body.id || url.searchParams.get('id');
//     if (!courseId) return NextResponse.json({ success: false, message: 'Missing course ID' }, { status: 400 });

//     const {
//       courseTitle,
//       batchNumber,
//       seatsLeft,
//       timeLeft,
//       starRating,
//       courseCost,
//       tutorVideo,
//       bannerImage,
//       instructorImage,
//       gifFile,
//       benefits,
//       projects,
//       courseOutlines,
//       startDate,
//       numberOfClasses,
//       classSchedule
//     } = body;

//     const query = `
//       UPDATE users_login.courses
//       SET
//         course_title = ?,
//         batch_number = ?,
//         seats_left = ?,
//         time_left = ?,
//         star_rating = ?,
//         course_cost = ?,
//         uploaded_video = ?,
//         banner_image = ?,
//         instructor_image = ?,
//         uploaded_gif = ?,
//         Course_Benifits = ?,
//         Course_Projects = ?,
//         Course_Outlines = ?,
//         start_date = ?,
//         number_of_classes = ?,
//         class_schedule = ?
//       WHERE id = ?
//     `;

//     await promisePool.execute(query, [
//       courseTitle,
//       batchNumber,
//       seatsLeft,
//       timeLeft,
//       starRating,
//       courseCost,
//       tutorVideo,
//       bannerImage,
//       instructorImage,
//       gifFile,
//       JSON.stringify(benefits || []),
//       JSON.stringify(projects || []),
//       JSON.stringify(courseOutlines || []),
//       startDate,
//       numberOfClasses,
//       JSON.stringify(classSchedule || []),
//       courseId
//     ]);

//     return NextResponse.json({ success: true, message: 'Course updated successfully' }, { status: 200 });

//   } catch (error) {
//     console.error('Error updating course:', error);
//     return NextResponse.json({ success: false, message: 'Error updating course', error: error.message }, { status: 500 });
//   }
// }

// // DELETE Method
// export async function DELETE(req) {
//   try {
//     const url = new URL(req.url);
//     const id = url.searchParams.get("id");
//     if (!id) return NextResponse.json({ success: false, message: "Missing course ID" }, { status: 400 });

//     await promisePool.execute("DELETE FROM users_login.courses WHERE id = ?", [id]);

//     return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
//   } catch (err) {
//     console.error("Delete error:", err);
//     return NextResponse.json({ success: false, message: "Error deleting course", error: err.message }, { status: 500 });
//   }
// }
import promisePool from '../../../libs/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            courseTitle,
            batchNumber,
            seatsLeft,
            timeLeft,
            starRating,
            courseCost,
            tutorVideo,
            bannerImage,
            instructorImage,
            gifFile,
            benefits,
            projects,
            courseOutlines,
            startDate,
            numberOfClasses,
            classSchedule
        } = body;

        const outlinesJSON = JSON.stringify(courseOutlines || []);
        const benefitsJSON = JSON.stringify(benefits || []);
        const projectsJSON = JSON.stringify(projects || []);
        const scheduleJSON = JSON.stringify(classSchedule || []);

        const query = `
      INSERT INTO users_login.courses
      (course_title, batch_number, seats_left, time_left, star_rating, course_cost,
       uploaded_video, banner_image, instructor_image, uploaded_gif,
       Course_Benifits, Course_Projects, Course_Outlines,
       start_date, number_of_classes, class_schedule)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

        const values = [
            courseTitle,
            batchNumber,
            seatsLeft,
            timeLeft,
            starRating,
            courseCost,
            tutorVideo,
            bannerImage,
            instructorImage,
            gifFile,
            benefitsJSON,
            projectsJSON,
            outlinesJSON,
            startDate,
            numberOfClasses,
            scheduleJSON
        ];

        const [result] = await promisePool.execute(query, values);

        return NextResponse.json(
            { success: true, message: "Course added successfully", courseId: result.insertId },
            { status: 201 }
        );

    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json(
            { success: false, message: "Error adding course", error: error.message },
            { status: 500 }
        );
    }
}

//
// ✅ FIXED GET METHOD (returns correct array data)
//
export async function GET() {
    try {
        const query = `
      SELECT 
        id,
        course_title,
        batch_number,
        seats_left,
        time_left,
        star_rating,
        course_cost,
        uploaded_video,
        banner_image,
        instructor_image,
        uploaded_gif,
        Course_Benifits AS course_benefits,
        Course_Projects AS course_projects,
        Course_Outlines AS course_outlines,
        start_date,
        number_of_classes,
        class_schedule
      FROM users_login.courses
    `;

        const [rows] = await promisePool.execute(query);

        // 🧩 Safe JSON parser that fixes escaped / double-encoded data
        const safeParse = (value) => {
            if (!value) return [];
            try {
                if (typeof value === "string") {
                    const cleaned = value.trim();

                    // case 1: regular JSON
                    if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
                        return JSON.parse(cleaned);
                    }

                    // case 2: double-encoded JSON (escaped inside quotes)
                    if (cleaned.startsWith('"[') && cleaned.endsWith(']"')) {
                        return JSON.parse(JSON.parse(cleaned));
                    }

                    // fallback attempt
                    return JSON.parse(value);
                }
                if (Array.isArray(value)) return value;
                return [];
            } catch (e) {
                console.error("❌ JSON parse failed:", value);
                return [];
            }
        };

        const courses = rows.map(course => ({
            id: course.id,
            course_title: course.course_title,
            batch_number: course.batch_number,
            seats_left: course.seats_left,
            time_left: course.time_left,
            star_rating: course.star_rating,
            course_cost: course.course_cost,
            uploaded_video: course.uploaded_video,
            banner_image: course.banner_image,
            instructor_image: course.instructor_image,
            uploaded_gif: course.uploaded_gif,
            startDate: course.start_date,
            numberOfClasses: course.number_of_classes,

            Course_Benifits: safeParse(course.course_benefits),
            Course_Projects: safeParse(course.course_projects),
            Course_Outlines: safeParse(course.course_outlines),
            classSchedule: safeParse(course.class_schedule),
        }));

        return NextResponse.json({ success: true, course: courses }, { status: 200 });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { success: false, message: "Error fetching courses", error: error.message },
            { status: 500 }
        );
    }
}


//
// PUT METHOD (same as yours)
//
export async function PUT(req) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const courseId = body.id || url.searchParams.get('id');
    if (!courseId)
      return NextResponse.json(
        { success: false, message: 'Missing course ID' },
        { status: 400 }
      );

    const {
      courseTitle,
      batchNumber,
      seatsLeft,
      timeLeft,
      starRating,
      courseCost,
      tutorVideo,
      bannerImage,
      instructorImage,
      gifFile,
      benefits,
      projects,
      courseOutlines,
      startDate,
      numberOfClasses,
      classSchedule
    } = body;

    // ✅ Convert ISO date to MySQL DATETIME
    const formatDateForMySQL = (dateValue) => {
      if (!dateValue) return null;
      try {
        const d = new Date(dateValue);
        if (isNaN(d)) return null;
        return d.toISOString().slice(0, 19).replace('T', ' ');
      } catch {
        return null;
      }
    };

    const formattedStartDate = formatDateForMySQL(startDate);

    const query = `
      UPDATE users_login.courses
      SET
        course_title = ?,
        batch_number = ?,
        seats_left = ?,
        time_left = ?,
        star_rating = ?,
        course_cost = ?,
        uploaded_video = ?,
        banner_image = ?,
        instructor_image = ?,
        uploaded_gif = ?,
        Course_Benifits = ?,
        Course_Projects = ?,
        Course_Outlines = ?,
        start_date = ?,
        number_of_classes = ?,
        class_schedule = ?
      WHERE id = ?
    `;

    const values = [
      courseTitle || '',
      batchNumber || '',
      seatsLeft || 0,
      timeLeft || '',
      starRating || 0,
      courseCost || 0,
      tutorVideo || '',
      bannerImage || '',
      instructorImage || '',
      gifFile || '',
      JSON.stringify(benefits || []),
      JSON.stringify(projects || []),
      JSON.stringify(courseOutlines || []),
      formattedStartDate,
      numberOfClasses || 0,
      JSON.stringify(classSchedule || []),
      courseId
    ];

    const [result] = await promisePool.execute(query, values);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: 'No course found with this ID' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Course updated successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating course', error: error.message },
      { status: 500 }
    );
  }
}

//
// DELETE METHOD (same as yours)
//
export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, message: "Missing course ID" }, { status: 400 });

        await promisePool.execute("DELETE FROM users_login.courses WHERE id = ?", [id]);

        return NextResponse.json({ success: true, message: "Deleted successfully" }, { status: 200 });
    } catch (err) {
        console.error("Delete error:", err);
        return NextResponse.json({ success: false, message: "Error deleting course", error: err.message }, { status: 500 });
    }
}
