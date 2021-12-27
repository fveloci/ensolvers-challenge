const { Folder } = require('../database/models')
const folderController = {
    /* list: async (req, res) => {
        let result, folders;
        try {
            folders = await Folder.findAll();
            result = {success: true, folders: folders}
            return res.status(200).json(folders);
        } catch(err){
            result = {success: false, msg: err}
            return res.status(500).json(result)
        }
    }, */
    listByUser: async (req, res) => {
        let result, folders;
        try {
            const user = await req.user;
            folders = await Folder.findAll({
                where: {
                    userId: user.dataValues.id
                }
            });         
            result = {success: true, folders: folders}
            return res.status(200).json(folders);
        } catch (err) {
            result = {success: false, msg: err}
            return res.status(500).json(result)
        }
    },
    createFolder: async (req, res) => {
        let result;
        try {       
            const user = await req.user;               
            const folder = await Folder.create({
                name: req.body.name,
                userId: user.dataValues.id
            })            
            result = {
                success: true,
                msg: 'Folder created successfully',
                folder: folder
            }
            return res.status(201).json(result);
        } catch (err) {
            result = {success: false, msg: err}
            console.log('Error: ', err)            
            return res.status(500).json(result);
        }
    } 
}

module.exports = folderController;