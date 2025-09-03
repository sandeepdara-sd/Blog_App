import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    }
}, { 
    timestamps: true, // This adds createdAt and updatedAt fields automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Add a virtual field that ensures createdAt is always available
blogSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt || this._id.getTimestamp();
});

export default mongoose.model("Blog",blogSchema)