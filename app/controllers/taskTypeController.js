import taskType from '../models/taskType.js';

const indexType = (async (req, res) => {
    try {
        const type = await taskType.find().exec();
        res.json(type);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Error: could not fetch tasks types' });
    }
});

export { indexType };