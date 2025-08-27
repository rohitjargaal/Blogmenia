import UserModel from "../models/User.js";
import Vlog from "../models/Vlog.js";


// all vlog data
export const getAllVlogs = async (req, res) => {
    const allVlog = await Vlog.find({}).populate('author', 'username');
    res.json({ message: "this is allvlog page", allVlog })
}

//dashboard data
export const getDashboard = async (req, res) => {
    const id = req.user;
    const vloglength = (await Vlog.find({ author: id })).length
    const user = await UserModel.findById(id)
    res.json({ message: 'hello buddy', user, vloglength, success: "true" });
}
//user vlog
export const getUserVlogs = async (req, res) => {
    try {
        const userId = req.user
        const vlogs = await Vlog.find({ author: userId }).populate("author", "username");
        res.json({ message: "this is myvlog page", vlogs: vlogs });
    } catch (error) {
        console.error("Error fetching user vlogs:", error);
        res.status(500).json({ message: "Error fetching user vlogs" });
    }
}

//create vlog
export const addVlog = async (req, res) => {
    try {
        const { title, description, location } = req.body;
        const userId = req.user;
        const url = req.file.path;
        const filename = req.file.filename

        if (!req.file || !req.file.path) {
            return res
                .status(400)
                .json({ message: "Please upload an image", success: false });
        }
        const newVlog = new Vlog({
            title: title,
            description: description,
            location: location,
            author: userId,
        });
        newVlog.image = { url, filename }
        console.log(newVlog)
        await newVlog.save();
        res.json({ message: "Vlog added successfully", success: true });
    } catch (cloudinaryError) {
        console.error("Cloudinary error:", cloudinaryError);
        res.status(500).json({ message: "Cloudinary error", success: false })
    }
}

// vlog data get
export const getVlogById = async (req, res) => {
    try {
        const token = req.token
        const userid = req.user;
        const { id } = req.params;
        const vlog = await Vlog.findById(id).populate('author', ['username','email']);
        if (!vlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }
        res.json({ message: 'Single vlog retrieved', vlog ,token,userid});
    } catch (error) {
        console.error('Error fetching vlog:', error);
        res.status(500).json({ message: 'Error fetching vlog' });
    }
}

//delete vlog
export const deleteVlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        const vlog = await Vlog.findById(id);

        if (!vlog) {
            return res.status(404).json({ message: 'Vlog not found' });
        }

        if (vlog.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized: You are not the author' });
        }

        await Vlog.findByIdAndDelete(id);
        res.json({success:true, message: 'Vlog deleted successfully' });
    } catch (error) {
        console.error('Error deleting vlog:', error);
        res.status(500).json({ message: 'Error deleting vlog' });
    }
}

//update vlog
export const updateVlog = async (req, res) => {
    const { id } = req.params;
    const {title,description,location} = req.body;
    const vlog = await Vlog.findById(id);
    if (!vlog) {
        return res.status(404).json({ message: 'Vlog not found' });
    }
    await Vlog.findByIdAndUpdate(
        id,
        { title,description,location },
    );
    res.json({ success: true, message:'Vlog are updated' })
}
