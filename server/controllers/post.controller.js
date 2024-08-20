import Post from "../models/post.model.js";
import Company from "../models/company.model.js";
import handleError from "../errors/errorHandler.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    console.log(req.file);
    const { title, description } = req.body;

    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company) {
      return handleError(res, "Company not found", 404);
    }

    const newPost = new Post({
      title,
      description,
      imageURL: req.file.filename,
      companyId: company._id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    handleError(req, res, error, "Failed to create posts");
  }
};

// Get all posts by the job giver's company
export const getPosts = async (req, res) => {
  try {
    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company) {
      return handleError(res, "Company not found", 404);
    }

    const posts = await Post.find({ companyId: company._id });
    res.status(200).json(posts);
  } catch (error) {
    handleError(req, res, error, "Failed to get posts");
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Fetch the post to be updated
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Retrieve the company associated with the job giver
    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company) {
      return res.status(403).json({ message: "Company not found" });
    }

    // Check if the post belongs to the job giver's company
    if (post.companyId.toString() !== company._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
    }

    // Update post fields
    post.title = title || post.title;
    post.description = description || post.description;
    if (req.file) {
      post.imageURL = req.file.filename; // Assuming you're using multer for file uploads
    }

    // Save the updated post
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    handleError(res, error);
  }
};
// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }

    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company || post.companyId.toString() !== company._id.toString()) {
      res.status(403).json({ message: "Unauthorised to delete the post." });
    }

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to delete post.");
  }
};

export const addReaction = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if the reaction already exists
    const post = await Post.findOne({
      _id: postId,
      "reactedBy.userId": req.user.id,
    });
    if (post) {
      return res
        .status(400)
        .json({ message: "You have already reacted to this post" });
    }

    // Add the reaction
    await Post.updateOne(
      { _id: postId },
      {
        $push: {
          reactedBy: {
            userId: req.user.id,
            role: "jobseeker", // Assuming the role is jobseeker
          },
        },
        $inc: { reactions: 1 },
      }
    );

    res.status(200).json({ message: "Reaction added successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to add reaction to post");
  }
};

// Remove a reaction from a post
export const removeReaction = async (req, res) => {
  try {
    const { postId } = req.params;

    // Check if the reaction exists
    const post = await Post.findOne({
      _id: postId,
      "reactedBy.userId": req.user.id,
    });
    if (!post) {
      return res.status(400).json({ message: "No reaction found to remove" });
    }

    // Remove the reaction
    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          reactedBy: {
            userId: req.user.id,
            role: "jobseeker", // Assuming the role is jobseeker
          },
        },
        $inc: { reactions: -1 },
      }
    );

    res.status(200).json({ message: "Reaction removed successfully" });
  } catch (error) {
    handleError(req, res, error, "Failed to remove reaction");
  }
};
