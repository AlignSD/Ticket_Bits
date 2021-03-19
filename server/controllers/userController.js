// import userSaved from '../models/user.js/index.js';
// // route for posts.js
// export const getPosts = async (req, res) => {
//     try {
//         const usersSaved = await userSaved.find();
//         console.log(usersSaved);
//         res.status(200).json(usersSaved);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
//     res.send('This Works')
// }

// export const createUser = async (req, res) => {
//     const user = req.body;
//     const newUser = new userSaved(user)
//     try { 
//         await newUser.save()
//         res.status(201).json(newUser)
//     } catch (error) {
//         res.status(409).json({ message: error.json })
//     }
// }