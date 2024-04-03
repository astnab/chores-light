import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Flex,
  Text,
  Input,
  Button,

  Checkbox,
  Grid,
  Spacer,
  Box
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  AddIcon,
  AttachmentIcon,
} from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import EditTaskForm from "./components/EditTaskForm";


function App() {
  
  const [tasks, setTasks] = useState([
    { id: uuidv4(), name: "Create guest experience mobile check-in", completed: false },
    { id: uuidv4(), name: "Document current CI/CD process", completed: false },
    { id: uuidv4(), name: "Perform code review for final pillow-talk release", completed: false },
    { id: uuidv4(), name: "Implement new color palette from design team", completed: false },
  ]
  );

  const [newTask, setNewTask] = useState("");

  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  function handleInput(event) {
    setNewTask(event.target.value);
  }

  function addTask(event) {
    event.preventDefault();
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, { id: uuidv4(), name: newTask, completed: false, isEditing: false }]);
      setNewTask("");
    } else {
      alert("Add a new task!")
    }
  }

  function editTask (index, newName) {
    const updatedTasks = [...tasks];
    updatedTasks[index].name = newName;
    setTasks(updatedTasks);
    setEditingTaskIndex(null);

  }
  function deleteTask(index) {
    const updatedTasks = tasks.filter((element, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleTaskStatusChange(index, isChecked) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = isChecked;
    setTasks(updatedTasks);
  }

  const totalCompletedTasks = tasks.filter((task) => task.completed).length;

  return (
    <>
      <Flex w="100%" h="100vh" justifyContent={"center"} alignItems={"center"}>
        <Flex
          className="backdropcustom"
          w={["100%", "100%", "80%", "50%"]}
          flexDir="column"
          color="black"
          borderRadius={30}
          marginX={[5, 10]}
          >

          {/* HEADER */}
          <Flex
            className="headercustom"
            w="100%"
            fontSize={25}
            fontWeight={700}
            paddingY={[3, 5]}
            align={"center"}
            color={"#D31995"}
            flexDir={"row"}>
              
            <AttachmentIcon color={"#B83280"} marginRight={3} marginLeft={[6, 10]} />

            <Text fontSize={[14, 18]} fontWeight={1000}>CHORES TO DO LIST</Text>

            {/* <Text fontSize={[16, 20]} color={"#E2E8F0"}>it's astnab's</Text> */}
          </Flex>

          {/* LIST */}
          <Flex flexDir={"column"} padding={[5, 10]}>

            <Grid gap={[3, 5]}>
              <Text fontSize={[16, 20]} fontWeight={700}>Task Ready</Text>


              <Box
              bgColor={"#D6BCFA"} borderRadius={20} w={["60%", "50%", "30%"]} marginBottom={2}>
              <Text fontSize={[14]} fontWeight={600} color={"#6B46C1"} align={"center"}  paddingY={1}> 
            Completed Task: {totalCompletedTasks}
          </Text>
          </Box>
              {tasks.map((task, index) => (
                <Flex
                  key={index}
                  flexDir={"row"}
                  h="100%"
                  alignItems={"center"}
                  paddingX={10}
                  paddingY={[2, 3]}
                  className="space-x-4 listcustom"
                >

                  {/* CHECK BUTTON */}
                  <Checkbox
                    colorScheme="green"
                    borderColor={"green"}
                    size="lg"
                    onChange={() =>
                      handleTaskStatusChange(index, !task.completed)
                    }
                  ></Checkbox>

                  {/* TASK */}
                  <Text
                    fontSize={[12, 15]}
                    className="text-wrap"
                    alignSelf="center"
                    ml={3}
                    onClick={() => setEditingTaskIndex(index)}
                  >
                    {task.name}
                  </Text>

                  <Spacer />

                  {/* EDIT BUTTON */}
                  <Button
                    variant="solid"
                    bg="none"
                    border="2px"
                    borderColor="#494BD6"
                    size="xs"
                    _hover={{ bg: "#494BD6" }}
                    onClick={() => setEditingTaskIndex(index)}
                  >
                    <EditIcon bg="none" color="#939DFD" />
                  </Button>

                  {/* DELETE BUTTON */}
                  <Button
                    variant="solid"
                    bg="none"
                    border="2px"
                    borderColor="#B83280"
                    size="xs"
                    _hover={{ bg: "#B83280" }}
                    onClick={() => deleteTask(index)}
                  >
                    <DeleteIcon bg="none" color="#F687B3" />
                  </Button>
                </Flex>
              ))}  

              <Text fontSize={[16, 20]} fontWeight={700} mt={[3,5]}>
            {" "}
            Add a task
          </Text>  

          <form onSubmit={addTask}>
            <Flex>
              <Input
                value={newTask}
                onChange={handleInput}
                className="text-ellipsis inputcustom"
                w={["100%", "50%"]}
                overflow={"hidden"}
                fontSize={15}
                placeholder="Write your task here"
                mr={3}
              />

              <Button
                className="btncustom"
                type="submit"
                onClick={addTask}
                fontSize={12}
                color={"white"}
                bg={"#5C65DE"}
                fontWeight={700}
                w={[10]}
                mb={[5, 10]}
              >
                {" "}
                <AddIcon />
              </Button>
            </Flex>
          </form>

            </Grid>

          </Flex>

          <EditTaskForm
          isOpen={editingTaskIndex !== null}
          onClose={() => setEditingTaskIndex(null)}
          initialName={editingTaskIndex !== null ? tasks[editingTaskIndex].name : ""}
          onSave={(newName) => editTask(editingTaskIndex, newName)}
          />

        </Flex>
      </Flex>
    </>
  );
}

export default App;
