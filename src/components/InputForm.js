import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { addTodos } from "../reduxStore/TodoSlice";
import ErrMsg from "./msg/ErrMsg";
import SuccessMsg from "./msg/SuccessMsg";
import TodoList from "./TodoList";

function InputForm() {
  const dispatch = useDispatch()
  const todosItem = useSelector((state)=> state.todos.todosList)
  const [todoValue, setTodoValue] = useState("");
  const [category, setCategory] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false)
  const options = [
    {
      _id: 1000,
      title: "Categories"
    },
    {
      _id: 1001,
      title: "Personal"
    },
    {
      _id: 1002,
      title: "Business"
    },
    {
      _id: 1003,
      title: "Others"
    },
  ];
  const handleTodo = (e) => {
    e.preventDefault();
    if (todoValue === "") {
      setErrMsg("Please write your todo!")
      setShowErr(true)
      setShowSuccess(false)
    } else if (category === ""){
      setErrMsg("Please choose category!")
      setShowErr(true)
      setShowSuccess(false)
    } else if ( category === "Categories") {
      setErrMsg("Please choose valid category!")
      setShowErr(true)
      setShowSuccess(false)
    }
    else {
      dispatch(
        addTodos({
          _id: Math.random(),
          todo:todoValue,
          category:category,
        })
      )
      setTodoValue("")
      setShowSuccess(true)
      setShowErr(false)
      setSuccessMsg("Todo Added Successfully")
    }
  }
  useEffect(()=> {
    const timer = setTimeout(()=> {
      showErr && setShowErr(false)
      showSuccess && setShowSuccess(false)
    },2000)
    return ()=> clearTimeout(timer)
  }, [showErr, showSuccess])

  return (
    <div className="w-full bg-bodyColor flex flex-col gap-4">
      <div className="flex items-center gap-4 h-12">
        <input onChange={(e) => setTodoValue(e.target.value)}
          value={todoValue}
          className="w-[80%] h-full bg-bodyColor border-[1px] border-grey-400 py-2 px-4 
        placeholder:text-grey-400 text-white text-base placeholder:text-sm tracking-wide 
        rounded-md outline-none focus-visible:border-purple-600 hover:border-white"
          type="text"
          placeholder="Enter your Todo.."
        />
        <div className="w-[20%] h-full relative">
          <select onChange={(e) =>setCategory(e.target.value)}
            className="w-full h-full text-center capitalize outline-none
        bg-bodyColor border-[1px] border-gray-400 px-1 cursor-pointer appearance-none rounded-md
         focus-visible:border-purple-600 hover:border-white">
            {
              options.map((item) => (
                <option key={item._id}>{item.title}</option>
              ))
            }
          </select>
          <span className="absolute right-3 top-4"><FaChevronDown /></span>
        </div>
      </div>
      <button onClick={handleTodo} className="w-full border-[1px] border-gray-200 hover:border-gray-200 duration-300 
      font-titleFont font-semibold tracking-wider text-gray-300 hover:text-purple-600 
      h-10 uppercase rounded-md">Add todo</button>
      <div className="flex flex-col gap-4">
        <ul className="grid grid-cols-1 gap-4 border border-gray-600 shadow-todoShadow mt-6 p-4">
          {
            todosItem.length > 0 ? <>{
              todosItem.map((item) => (
                <TodoList key={item._id} todo={item.todo} _id={item._id} category={item.category}/>
              ))
            }</> : <p className="text-center text-base text-yellow-500 font-tit
             font-medium tracking-wide">Your todo list is empty</p>
          }
        </ul>
      </div>
      {showErr && <ErrMsg errMsg={errMsg} />}
      {showSuccess && <SuccessMsg  successMsg={successMsg}/>}
    </div>
  );
}

export default InputForm;
