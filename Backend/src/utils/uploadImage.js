const cloudinary = require("cloudinary").v2

const uploadImage = async file => {
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path)

    // If the upload is successful, return the public URL of the uploaded image
    return result.secure_url
  } catch (error) {
    // If an error occurs during the upload process, handle it here
    console.error("Error uploading image to Cloudinary:", error)
    throw error // You may choose to handle the error differently
  }
}

module.exports = uploadImage
