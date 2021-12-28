const { Task } = require('../database/models')
const { Folder } = require('../database/models')

const taskController = {
    deleteTask: async (req, res) => {
        let result;
        try {
            const user = await req.user;
            const task = await Task.findByPk(req.params.id)
            if(!task){
                result = {success: false, msg: 'Document does not exist or you are not authorized to delete it.'}
                return res.status(401).json(result);
            }
            const folder = await Folder.findByPk(task.folderId);
            if(folder.userId == user.dataValues.id){
                await Task.destroy({where: {id: task.id}})
                result = {success: true, msg: 'Task deleted successfully.'}
                return res.status(200).json(result);
            } else {
                return res.status(401).json({success: false, msg: 'Not authorized to delete'})
            }              
        } catch (err) {
            result = {success: false, msg: err};
            console.log(err)
            return res.status(500).json(result);
        }
    },
    modifyTask: async (req, res) => {
        let result, task;
        try {
            const user = await req.user;
            task = await Task.findByPk(req.params.id)
            if(!task){
                result = {success: false, msg: 'Document does not exist or you are not authorized to update it.'}
                return res.status(401).json(result);
            }
            const folder = await Folder.findByPk(task.folderId);
            if(folder.userId == user.dataValues.id){
                task = await Task.update({
                    name: req.body.name
                },{where: {id: task.id}})                
                return res.status(200).json({success: true, msg: 'Task update successfully'});
            } else {
                return res.status(401).json({success: false, msg: 'Not authorized to update'})
            }
        } catch (err) {            
            return res.status(500).json(err);
        }
    },
    checkTask: async (req, res) => {
        let result, task;
        try {
            const user = await req.user;
            task = await Task.findByPk(req.params.id)
            if(!task){
                result = {success: false, msg: 'Document does not exist or you are not authorized to update it.'}
                return res.status(401).json(result);
            }
            const folder = await Folder.findByPk(task.folderId);
            if(folder.userId == user.dataValues.id){
                task = await Task.update({
                    done: req.body.done
                },{where: {id: task.id}})
                result = {success: true, task: task}
                return res.status(200).json(result);
            } else {
                return res.status(401).json({success: false, msg: 'Not authorized to update'})
            }
        } catch (err) {            
            return res.status(500).json(err);
        }
    } 
}

module.exports = taskController;