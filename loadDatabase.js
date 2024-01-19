/* jshint node: true */

/*
 * This Node.js program loads the CSE4050 Project #5 model data into Mongoose defined objects
 * in a MongoDB database. It can be run with the command:
 *     node loadDatabase.js
 * be sure to have an instance of the MongoDB running on the localhost.
 *
 * This script loads the data into the MongoDB database named 'cse4050project6'.  In loads
 * into collections named User and Photos. The Comments are added in the Photos of the
 * comments. Any previous objects in those collections is discarded.
 *
 * NOTE: This scripts uses Promise abstraction for handling the async calls to
 * the database. We are not teaching Promises in CSE4050 so strongly suggest you don't
 * use them in your solution.
 *
 */
// We use .evn to store system variables 
import 'dotenv/config';

// We use the Mongoose to define the schema stored in MongoDB.
import mongoose from 'mongoose';

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the magic models we used in the previous projects.
import { taskListModel, taskTypeListModel } from './modelData/kanbanApp.js';

// Load the Mongoose schema for Use and Photoid
import Task from './schema/task.js';
import TaskType from './schema/taskType.js';
import SchemaInfo from'./schema/schemaInfo.js';

var versionString = '1.0';

// We start by removing anything that existing in the collections.
var removePromises = [Task.deleteMany({}), TaskType.deleteMany({}), SchemaInfo.deleteMany({})];

Promise.all(removePromises).then(function () {

    // Load the users into the User. Mongo assigns ids to objects so we record
    // the assigned '_id' back into the userListModels so we have it
    // later in the script.

    var taskTypeModels = taskTypeListModel();
    var mapFakeId2RealId = {};
    var taskTypePromises = taskTypeModels.map(function (taskType) {
        return TaskType.create({
            name: taskType.name, // Name of the task type.
            _class: taskType._class,  // Class of the task type.
            color: taskType.color
        }).then(function (taskTypeObj) {
            // Set the unique ID of the object. We use the MongoDB generated _id for now
            // but we keep it distinct from the MongoDB ID so we can go to something
            // prettier in the future since these show up in URLs, etc.

            mapFakeId2RealId[taskType._id] = taskTypeObj._id;
            taskType.objectID = taskTypeObj._id;
            taskTypeObj.save();
            console.log('Adding task type:', taskType.name, ' with ID ',
                    taskType.objectID);
        }).catch(function(err){
            console.error('Error create task type', err);
        });
    });


    var allPromises = Promise.all(taskTypePromises).then(function () {
        // Once we've loaded all the task types and users into the DB we add all the tasks. Note
        // that the user_id of the task is the MongoDB assigned id in the User object.
        var taskModels = taskListModel();
        var taskPromises = taskModels.map(function (task) {
            return Task.create({
                description: task.description,
                type_id: mapFakeId2RealId[task.type_id]
            }).then(function (taskObj) {
                task.objectID = taskObj._id;
                taskObj.save();
                console.log('Adding task:', task.description, ' of type ID ', taskObj.type_id);
            }).catch(function (err){
                console.error('Error create task', err);
            });
        });

        return Promise.all(taskPromises).then(function () {
            // Create the SchemaInfo object
            return SchemaInfo.create({
                version: versionString
            }).then(function (schemaInfo) {
                console.log('SchemaInfo object created with version ', schemaInfo.version);
            }).catch(function(err){
                console.error('Error create schemaInfo', err);
            });
        });
    });

    allPromises.then(function () {
        mongoose.disconnect();
    });

}).catch(function(err){
    console.error('Error create schemaInfo', err);
});
