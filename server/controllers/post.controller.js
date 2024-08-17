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
    const { title, description, imageURL } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return handleError(res, "Post not found", 404);
    }

    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company || post.companyId.toString() !== company._id.toString()) {
      return handleError(res, "Not authorized to update this post", 403);
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.imageURL = imageURL || post.imageURL;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    handleError(req, res, error);
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return handleError(res, "Post not found", 404);
    }

    const company = await Company.findOne({ createdBy: req.user.id });
    if (!company || post.companyId.toString() !== company._id.toString()) {
      return handleError(res, "Not authorized to delete this post", 403);
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    handleError(req, res, error);
  }
};
