import {v2 as cloudinary} from "cloudinary";
//const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config.js');


cloudinary.config({ 
    cloud_name: 'drmcrdf4r', 
    api_key: '521116467426574', 
    api_secret: 'IyZYzTmTrxIpuEHp04kZ6lWk40g'
});

export default cloudinary