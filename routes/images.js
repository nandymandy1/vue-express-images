const fs = require("fs");
const multer = require("multer");
const Image = require("../models/Image");
const router = require("express").Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    let lastIndex = file.originalname.lastIndexOf(".");
    // Get Original File Extension
    let extension = file.originalname.substring(lastIndex);
    // Create the file on the server
    cb(null, file.fieldname + "-" + Date.now() + extension);
  }
});

// Image Upload function
const upload = multer({ storage: storage });

/**
 * @DESC Route to upload single Image
 * @TYPE POST (multipart-form-data)
 */
router.post("/upload-single", upload.single("file"), async (req, res) => {
  let imagePath = req.file.path.replace("public", "");
  let newImage = new Image({
    imagePath
  });
  await newImage
    .save()
    .then(image => {
      return res
        .status(201)
        .json({ message: "File Uploaded successfully", success: true, image });
    })
    .catch(err => {
      // Implement the logger here
      console.log(err);
      return res
        .status(400)
        .json({ message: "File Uploading failed", success: false });
    });
});

/**
 * @DESC Route to Multiple Images
 * @TYPE POST (multipart-form-data)
 */
router.post("/upload-multiple", upload.array("files"), async (req, res) => {
  let { files } = req;
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    file.path = file.path.replace("public", "");
    let newImage = new Image({
      imagePath: file.path
    });
    let savedFile = await newImage.save();
    files[i]["_id"] = savedFile._id;
  }
  return res.json(files);
});

/**
 * @DESC Route to Dropzone Upload Images
 * @TYPE POST (multipart-form-data)
 */
router.post("/upload-dropzone", upload.single("file"), async (req, res) => {
  let imagePath = req.file.path.replace("public", "");
  let newImage = new Image({
    imagePath
  });
  await newImage
    .save()
    .then(image => {
      return res
        .status(201)
        .json({ message: "File Uploaded successfully", success: true, image });
    })
    .catch(err => {
      // Implement the logger here
      console.log(err);
      return res
        .status(400)
        .json({ message: "File Uploading failed", success: false });
    });
});

/**
 * @DESC Route to delete a particular Image
 * @TYPE POST
 */
router.delete("/delete-image", async (req, res) => {
  let { id } = req.query;
  try {
    let image = await Image.findByIdAndDelete(id);
    let imageurl = "./public" + image.imagePath;
    // Delete the image from the folder
    await fs.unlinkSync(imageurl);
    return res
      .status(200)
      .json({ message: "Image deleted successfully", success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Image not deleted", success: false });
  }
});

/**
 * @DESC Route to Get all the uploaded Images
 * @TYPE GET
 */
router.get("/get-images", async (req, res) => {
  const paginationLabels = {
    totalDocs: "itemCount",
    docs: "photos",
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pageCount",
    pagingCounter: "slNo",
    meta: "paginator"
  };
  const options = {
    sort: {
      date: -1
    },
    page: req.query.page,
    limit: 10,
    collation: {
      locale: "en"
    },
    customLabels: paginationLabels
  };

  await Image.paginate({}, options)
    .then(results => res.json(results))
    .catch(err =>
      res.json({ message: "Something went wrong please try again" })
    );
});

module.exports = router;
