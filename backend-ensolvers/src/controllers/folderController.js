const { Folder } = require('../database/models')
const { Task } = require('../database/models')

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
    },
    deleteFolder: async (req, res) => {
        let result;
        try {
            const user = await req.user;
            const folder = await Folder.destroy({
                where: {
                    id: req.params.id,
                    userId: user.dataValues.id
                }
            })
            if(!folder){
                result = {success: false, msg: 'Document does not exist or you are not authorized to delete it.'}
                return res.status(401).json(result);
            }
            result = {success: true, msg: 'Folder deleted successfully.'}
            return res.status(200).json(result);
            
        } catch (err) {
            result = {success: false, msg: err};
            return res.status(500).json(result);
        }
    },
    // TASKS
    getTasks: async (req, res) => {
        let result, tasks;
        try {
            const user = await req.user;
            const folder = await Folder.findByPk(req.params.id);
            if(folder.userId !== user.dataValues.id){
                return res.status(401).json({success: false, msg: 'Unauthorized to get tasks'}) 
            }
            tasks = await Task.findAll({
                where: {
                    folderId: folder.id
                },                
                attributes: {exclude: ['folderId']}               
            })   
                               
            return res.status(200).json({
                folder: folder.name,
                tasks: tasks
            })
        } catch (err) {
            result = {success: false, msg: err}
            console.log(err)
            return res.status(500).json(result);
        }
    },    
    createTask: async (req, res) => {
        let result;
        try {
            const user = await req.user;
            const folder = await Folder.findOne({
                where: {
                    id: req.params.id,
                    userId: user.dataValues.id
                }
            })
            if(!folder){
                result = {success: false, msg: 'Folder not found or you are not authorized to create a task on this folder.'}
                return res.status(401).json(result);
            }
            const task = await Task.create({
                name: req.body.name,
                folderId: folder.id,
                done: false
            })
            result = {
                success: true,
                msg: 'Task created successfully',
                task: task
            }
            return res.status(201).json(result);
        } catch (err) {
            console.log(err)
            //result = {success: false, msg: err}
            return res.status(500).send(err);
        }
    }   
}

module.exports = folderController;