import user from "../models/user.models";

const registerUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields aree required",
            })
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
          return res.status(409).json({
            message: "User already exists",
          });
        }

        const user =await User.create({
            name,
            email,
            password
        });

        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
          throw new ApiError(
            500,
            "Something went wrong while registering a user",
          );
        }
        return res.status(201).json({
          message: "User registered successfully",
          user: createdUser,
        });


    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong ",
            error: error.message,
        });
    }
}
export { registerUser };
