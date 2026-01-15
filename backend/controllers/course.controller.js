import { Course } from '../models/course.model.js';
import { Lecture } from '../models/lecture.model.js';
import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js';

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: 'Course title and category is required.',
        success: true,
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      course,
      message: 'Course created.',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed create course',
      success: false,
    });
  }
};

// start here 15.41
export const searchCourse = async (req, res) => {
  try {
    const {query="",  categories=[], sortByPrice=""} = req.query;

    const searchCriteria = {
      isPublished:true,
      $or:[
        {courseTitle: {$regex:query, $options:"i"}},
        {subTitle: {$regex:query, $options:"i"}},
        {category: {$regex:query, $options:"i"}},
      ]
    }

    if(categories.length > 0){
      searchCriteria.category = {$in:categories};
    }

    const sortOptions = {};
    if(sortByPrice === "low"){
      sortOptions.coursePrice = 1;
    } else if(sortByPrice === "high"){
      sortOptions.coursePrice = -1;
    }

    let courses = await Course.find(searchCriteria).populate({path:"creator", select:"name photoUrl"}).sort(sortOptions);
    return res.status(200).json({
      success:true,
      courses:courses || []
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed search course',
      success: false,
    });
  }
}

export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({isPublished:true}).populate({path:"creator", select:"name photoUrl"});
    if(!courses){
      return res.status(404).json({
        message:"Course not found!"
      });
    }

    return res.status(200).json({
      courses,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed create course',
      success: false,
    });
  }
}

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        courses: [],
        message: 'Course not found',
        success: false,
      });
    }

    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed create course',
      success: false,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: 'Course not found!',
        success: false,
      });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      course,
      message: 'Course updated successfully!',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed Create Course!',
      success: false,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: 'Course not found!',
        success: false,
      });
    }

    return res.status(200).json({
      course,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed get course by id!',
      success: false,
    });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: 'Lecture title is required',
        success: false,
      });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({
      lecture,
      message: 'Lecture Created Successfully!',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed create lecture!',
      success: false,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate('lectures');
    if (!course) {
      return res.status(404).json({
        message: 'Course not found!',
        success: false,
      });
    }

    return res.status(200).json({
      lectures: course.lectures,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed Get lectures!',
      success: false,
    });
  }
};


export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;

    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: 'Lecture not found!',
      });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;
    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res.status(200).json({
      lecture,
      message: 'Lecture updated successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed to edit lectures',
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: 'Lecture not found',
        success: false,
      });
    }

    if (lecture.publicId) {
      await deleteMediaFromCloudinary(lecture.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: 'Lecture removed successfully!🤔',
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed remove lecture!',
      success: false,
    });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: 'Lecture not found!☹️',
        success: false,
      });
    }

    return res.status(200).json({
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed remove lecture!',
      success: false,
    });
  }
};

export const publishCourse = async (req, res) => {
  try {
    const {courseId} = req.params;
    const {publish} = req.query;
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        message:"Course not found!",
        success:false
      });
    }

    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      message:`Course is ${statusMessage}`
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Failed update status!',
      success: false,
    });
  }
}