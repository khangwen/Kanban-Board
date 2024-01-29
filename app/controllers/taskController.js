import Task from '../models/task.js';
import User from '../models/user.js';
import mongoose from 'mongoose'; // not sure if this will cause duplicate ids

const index = (async (req, res) => {
    try {
        const tasks = await Task.find().exec();
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not fetch tasks' });
    }
});

const show = (async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).exec();
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ err: 'Error: could not find task' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not fetch task' });
    }
});

const store = (async (req, res) => {
    try {
        let user_id;

        User.findOne({ user_name: req.body.user_name })
            .then((user) => {
                user_id = user._id;
            }).then(() => {
                const task = new Task({
                    _id: new mongoose.Types.ObjectId(),
                    type_id: req.body.type_id,
                    user_id: user_id,
                    description: req.body.description
                });
                task.save();
                res.json(task);
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ err: 'Error: could not create task' });
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not create task' });
    }
});

const update = (async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).exec();
        if (task) {
            task.type_id = req.body.type_id;
            await task.save();
            res.json(task);
        } else {
            res.status(404).json({ err: 'Error: could not find task' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not update task' });
    }
});

const destroy = (async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).exec();
        if (task) {
            await task.deleteOne();
            res.json({ success: true });
        } else {
            res.status(404).json({ err: 'Error: could not find task' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not delete task' });
    }
});

export { index, show, store, update, destroy };