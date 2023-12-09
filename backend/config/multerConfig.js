import multer from "multer";
import path from "path";

// console.log("multer")
const storage = multer.diskStorage({

  destination: (req, file, cb) => { cb(null, "backend/Public/UserProfileImages") },

  filename: (req, file, cb) => { cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) }

});


const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    
    cb(null, true);

  } else {

    cb(new Error("Only images are allowed!"), false);

  }

};

const postImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/Public/PostImages");
  
  },
  filename: (req, file, cb) => {
    const fileName = `post_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
  
});

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/Public/ProductImages");
  
  },
  filename: (req, file, cb) => {
    const fileName = `product_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
  
});

const restaurantStorage= multer.diskStorage({

  destination: (req, file, cb) => { cb(null, "backend/Public/restaurantImages") },

  filename: (req, file, cb) => { cb( null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) ) }

})


export const multerUploadRestaurantImages = multer({
  storage: restaurantStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // setting the limit for each image to 2MB
  }
})
.fields([
  { name: 'restaurantImages', maxCount: 3 },
  { name: 'menuImages', maxCount: 3},
  { name: 'foodImages', maxCount: 3}
  
])


 // Here, '3' is the maximum number of images you can upload at a time.

// export const cpUpload = multerUploadRestaurantImages.fields([
//   { name: 'restaurantImages', maxCount: 3 },
//   { name: 'menuImages', maxCount: 1 },
//   { name: 'foodImages', maxCount: 1 }
  
// ])

export const multerUploadUserProfile = multer({
  storage: storage,
  fileFilter: fileFilter,
});



export const multerUploadProductImages = multer({
  storage: productImageStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
}).array('images', 3) 

export const multerUploadPostImages = multer({
  storage: postImageStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }
}).array('images', 3) 
