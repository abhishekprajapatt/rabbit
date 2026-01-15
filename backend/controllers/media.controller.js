import { uploadMedia } from "../utils/cloudinary.js";

export const mediaCourseLecture = async (req, res) => {
    try {
        const result = await uploadMedia(req.file.path);
        if(!result){
            return res.status(404).json({
                message:"File not uploaded!",
                success:false
            });
        }
        return res.status(200).json({
            data:result,
            message:"File uploaded Successfully!",
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: 'Error uploading file!',
          success: false,
        });
    }
  }