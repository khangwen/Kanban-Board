import React, { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import './TaskList.css';

import TaskSearchBar from './TaskSearchBar';
import TaskAdder from './TaskAdder';
import TaskDeleter from './TaskDeleter';
// import TaskUpdater from './TaskUpdater';
/**
 * Define TaskList, a componment of CS4050 project #4.
 */

export default function TaskList() {
  const [inputLetters, setInputLetters] = useState('');
  const [tasks, setTasks] = useState([]); // [window.cse4050models.taskModel()
  const [taskTypes, setTaskTypes] = useState([]); // [window.cse4050models.taskTypeModel()
  const [isLoaded, setIsLoaded] = useState(false);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  // const [idToUpdate, setIdToUpdate] = useState('');
  // const [idDescriptionToUpdate, setIdDescriptionToUpdate] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/tasks')
      .then(res => res.data)
      .then(
        (result) => {
          setTasks(result);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/task-types')
      .then(res => res.data)
      .then(
        (result) => {
          setIsLoaded(true);
          setTaskTypes(result);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handledragover = (event) => {
    event.preventDefault();
  };

  const handledrop = (event) => {
    event.preventDefault();
    var task_id = event.dataTransfer.getData("task_id");
    var parsed_task_id = task_id.toString().replace('task', '');
    axios.put('http://localhost:3000/api/tasks/' + parsed_task_id, {
      type_id: event.target.attributes.type_id.value
    })
      .then(res => res.data)
      // .then(
      //   (result) => {
      //     setTasks(tasks.map(task => task._id === parsed_task_id ? result : task));
      //   }
      // ) // trying to rerender after drag, doesnt work
      .catch(function (error) {
        console.log(error);
      });
    if (event.target.classList.contains('cse4050-task-list')) {
      event.target.appendChild(document.getElementById(task_id));
    }
  };

  const handledrag = (event) => {
    event.dataTransfer.setData("task_id", event.target.attributes.id.value);
  };

  const handleclick = () => {
    // highlight or denote selected task
    // change implementation to delete, edit using onclick rather than textfields
    // implement later
  };

  const handleSearchChange = (event) => {
    setInputLetters(event.target.value);
  };

  const handleAdderDescriptionChange = (event) => {
    setNewTaskDescription(event.target.value);
  };

  const handleAddTask = () => {
    try {
      if (newTaskDescription === '') {
        throw new Error('Task description cannot be empty.');
      }
    } catch (error) {
      console.log(error);
      return;
    }
    axios.post('http://localhost:3000/api/tasks', {
      description: newTaskDescription,
      type_id: taskTypes[0]._id
    })
      .then(res => res.data)
      .then(
        (result) => {
          setTasks([...tasks, result]);
        }
      )
      .catch(function (error) {
        console.log(error);
      });
    setNewTaskDescription('');
  };

  const handleDeleteTask = () => {
    try {
      if (idToDelete === '') {
        throw new Error('Task ID cannot be empty.');
      }
      if (!tasks.some(task => task._id === idToDelete)) {
        throw new Error('Task ID does not exist.');
      }
    } catch (error) {
      console.log(error);
      return;
    }
    axios.delete('http://localhost:3000/api/tasks/' + idToDelete)
      .then(res => res.data)
      .then(
        () => {
          setTasks(tasks.filter(task => task._id !== idToDelete));
        }
      )
      .catch(function (error) {
        console.log(error);
      });
    setIdToDelete('');
  };

  const handleIdToDeleteChange = (event) => {
    setIdToDelete(event.target.value);
  };

  /*Incomplete updater inplementation for extra credit*/
  /* 
  const handleIdToUpdateChange = (event) => {
    setIdToUpdate(event.target.value);
  };

  const handleUpdateTask = (event) => {
    try {
      if (idToUpdate === '') {
        throw new Error('Task ID cannot be empty.');
      }
      if (!tasks.some(task => task._id === idToUpdate)) {
        throw new Error('Task ID does not exist.');
      }
    } catch (error) {
      alert(error);
      return;
    }
    axios.put('http://localhost:3000/api/tasks/description/' + idToUpdate, {
      description: idDescriptionToUpdate
    })
      .then(res => res.data)
      // .then(
      //   (result) => {
      //     setTasks(tasks.map(task => task._id === idToUpdate ? result : task));
      //   }
      // )
      .catch(function (error) {
        console.log(error);
      });
    setIdToUpdate('');
    setIdDescriptionToUpdate('');
  }*/

  useEffect(() => {
    console.log(inputLetters); // Log the updated value
  }, [inputLetters]);

  return (
    <Container disableGutters maxWidth="false" sx={{ px: 1, py: 1 }}>
      <TaskAdder value={newTaskDescription} onChange={handleAdderDescriptionChange} onClick={handleAddTask} />
      <TaskDeleter value={idToDelete} onChange={handleIdToDeleteChange} onClick={handleDeleteTask} />
      {/*Incomplete updater inplementation for extra credit*/}
      {/*<TaskUpdater value={idToUpdate} onChange={handleIdToUpdateChange} onClick={handleUpdateTask} />*/}
      <TaskSearchBar value={inputLetters} onChange={handleSearchChange} />
      <div>
        {isLoaded ? (
          null
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <Container disableGutters maxWidth="ld" component="main">
        <Grid container spacing={2} alignItems="flex-end" >
          {taskTypes?.map(type => (
            <Grid item xs={12} md={4} key={type.name + "-tasks"} className="new-tasks">
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 0,
                  mb: 1,
                  borderLeft: 3,
                  borderColor: type.color
                }}>
                <Typography sx={{ px: 2, py: 1, fontWeight: 500 }}>{type.name}</Typography>
              </Card>

              <Stack
                id={type.name + "-tasks-stack"}
                type_id={type._id}
                droppable="true"
                onDragOver={handledragover}
                onDrop={handledrop}
                spacing={1}
                className="cse4050-task-list"
                sx={{
                  height: 600,
                }}
              >

                {tasks?.filter(task => task.type_id === type._id && task.description.toUpperCase().includes(inputLetters.toUpperCase())).map(task => (
                  <Card
                    key={"task" + task._id}
                    id={"task" + task._id}
                    draggable="true"
                    droppable="false"
                    onDragStart={handledrag}
                    onClick={handleclick}
                    variant="outlined"
                    className="cse4050-task-task"
                    sx={{
                      borderLeft: 3,
                      borderColor: type.color
                    }}
                  >
                    <CardContent>
                      <Typography>{task.description}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}
