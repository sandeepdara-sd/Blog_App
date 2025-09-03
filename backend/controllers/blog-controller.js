import Blog from "../model/Blog.js";
import mongoose from "mongoose";
import User from "../model/User.js";

export const getAllBlogs = async(req,res,next)=> {
    let  blogs;
    try{
        blogs = await Blog.find().populate('user')
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:'No Blogs Found'})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
         
    } catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({ message: 'Unable to find the user with this ID' });
    }    

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });

        await session.commitTransaction();
        session.endSession();
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err})
    }
    return res.status(200).json({ blog });
};


export const updateBlog = async(req,res,next)=>{
    const {title,description, image} = req.body;
    const blogId = req.params.id;
    let blog
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description,
            image,
        })

    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"});
    }
    return res.status(200).json({blog})
}
export const getById=async(req,res,next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id).populate('user')
    }catch(err){
        return console.log(err);
    }

    if(!blog){
        return res.status(404).json({message: "No blog found with the given ID!"})
    }
    return res.status(200).json({blog})

}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');       
        const user = blog.user;
        user.blogs.pull(blogId);
        await user.save();

        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error occurred while deleting the blog' });
    }
    if (!blog) {
        return res.status(400).json({ message: 'The blog was not found' });
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};

export const getByUserId= async(req,res,next)=>{
    const id = req.params.id;
    let userBlog;
    try{
        userBlog = await User.findById(id).populate('blogs')
    }catch(err){
        return console.log(err);
    }

    if(!userBlog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({user:userBlog})
}

// Migration function to add timestamps to existing blogs
export const migrateBlogTimestamps = async(req,res,next)=>{
    try{
        const blogs = await Blog.find({ createdAt: { $exists: false } });
        
        for (const blog of blogs) {
            // Extract timestamp from ObjectId
            const timestamp = blog._id.getTimestamp();
            
            // Update the blog with timestamps
            await Blog.findByIdAndUpdate(blog._id, {
                $set: {
                    createdAt: timestamp,
                    updatedAt: timestamp
                }
            });
        }
        
        console.log(`Migrated ${blogs.length} blogs with timestamps`);
        return res.status(200).json({ 
            message: `Successfully migrated ${blogs.length} blogs with timestamps`,
            migratedCount: blogs.length 
        });
    }catch(err){
        console.error('Migration error:', err);
        return res.status(500).json({ message: 'Migration failed', error: err.message });
    }
}