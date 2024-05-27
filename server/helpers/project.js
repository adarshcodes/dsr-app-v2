const productModel = require('../models/projectmodel');

//----- Admin ui for user ----------
const ProjectList = async (req, res) => {
    try {
        const projectList = await productModel.find({}).sort({ _id: -1 }).populate('created_by').populate('updated_by').exec();

        if (req.originalUrl == '/admin/project') {
            res.render('project', { projectList:projectList, url: req.originalUrl });
        } else {
            res.json({ status: 200, message: "Project List !!", data: projectList })
        }
    } catch (error) {
        res.json({ status: 400, message: error })
    }

}

const ProjectCreate = async (req, res) => {
    try {
        if (Object.keys(req.body).length > 0 && req.body.name != null && req.body.name != '' && req.body.manager != null && req.body.manager != '') {
            console.log(req.body)

            const data = {
                created_by: req.body.created_by,
                updated_by: req.body.created_by,
                name: req.body.name,
                manager: req.body.manager,
                isActive: req.body.isActive,

            }
            const ProjectData = new productModel(data);
            const result = await ProjectData.save();

            if (req.originalUrl == '/admin/project/create') {
                res.redirect('/admin/project');
            } else {
                if (result)
                    res.json({ status: 200, message: "Project Created !!" })
                else
                    res.json({ status: 400, message: "Project Not Create !!" })
            }
        } else {
            res.json({ status: 400, message: "Please fill all details !!" })
        }

    } catch (error) {
        res.json({ status: 400, message: error })
    }

}

const ProjectUpdate = async (req, res) => {

    try {

        if (Object.keys(req.body).length > 0 && req.body.id != null && req.body.id != '' && req.body.morning_time_from != null && req.body.morning_time_from != '' && req.body.morning_time_to != null && req.body.morning_time_to != '' && req.body.evening_time_from != null && req.body.evening_time_from != '' && req.body.evening_time_to != null && req.body.evening_time_to != '') {

            const projectList = await productModel.find({ _id: req.body.id });
            if (Object.keys(projectList).length > 0) {

                const data = {
                    created_by: req.body.created_by,
                    update_by: req.body.created_by,
                    name: req.body.name,
                    isActive: req.body.isActive,

                }

                const filter = { _id: req.body.id };
                const result = await productModel.findOneAndUpdate(filter, data);

                if (result) {

                    if (req.originalUrl == '/admin/project/update')
                        res.redirect('/admin/project');
                    else
                        res.json({ status: 200, message: "Project Updated !!" })

                } else {
                    res.json({ status: 400, message: "Project Not Updated !!" })
                }

            } else {

                if (req.originalUrl == '/admin/project/update') {
                    res.redirect('/admin/project')
                } else {
                    res.json({ status: 200, message: "Not found project details !!" })
                }
            }
        } else {
            res.json({ status: 400, message: "Please fill all details !!" })
        }
    } catch (error) {
        res.json({ status: 400, message: error })
    }

}

module.exports = { ProjectList, ProjectCreate, ProjectUpdate }