import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [updateExist, setUpdateExist] = useState(false);
  const [userId, setUserId] = useState("");
  const handleData = (e) => {
    let { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleImage = (e) => {
    setUserData({...userData, picture:e.target.files[0]})
  }
  const handleForm = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('userName', userData.userName)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('picture', userData.picture)
    console.log([...formData.entries()]);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/registration",formData, {
          headers:{
            'Content-Type': 'multipart/form-data',
          },
        });
    } catch (error) {
      console.log(error);
    }
    getAllUsers();
    setUserData({
      userName: "",
      email: "",
      password: "",
    });
  };
  const getAllUsers = async () => {
    const userInfo = await axios.get(
      "http://localhost:8000/api/v1/getAllUsers",
    );
    setAllUsers(userInfo.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdate = (item) => {
    setUserId(item._id);
    setUpdateExist(true);
    setUserData({
      userName: item.userName,
      email: item.email,
      password: item.password
    });
  };
  const handleFormUpdate = async () => {
    await axios.post(`http://localhost:8000/api/v1/update/${userId}`, userData);
    getAllUsers();
    setUpdateExist(false);
    setUserData({
      userName: "",
      email: "",
      password: "",
    });
  };
  const handleDelete = async (item) => {
    console.log(item._id);
    await axios.delete(`http://localhost:8000/api/v1/delete/${item._id}`);
    getAllUsers();
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <input
          className="w-70 h-10 border border-black outline-0 rounded-2xl p-2"
          onChange={(e) => {
            handleData(e);
          }}
          value={userData.userName}
          type="text"
          name="userName"
          placeholder="Enter your username....."
        />{" "}
        <br /> <br />
        <input
          className="w-70 h-10 border border-black outline-0 rounded-2xl p-2"
          onChange={(e) => {
            handleData(e);
          }}
          value={userData.email}
          type="email"
          name="email"
          placeholder="Enter your email....."
        />{" "}
        <br /> <br />
        <input
          className="w-70 h-10 border border-black outline-0 rounded-2xl p-2"
          onChange={(e) => {
            handleData(e);
          }}
          value={userData.password}
          type="password"
          name="password"
          placeholder="Enter your password....."
        />{" "}
        <br /> <br />
        <input
          className="w-70 h-10 border border-black outline-0 rounded-2xl p-2"
          type="file"
          onChange={(e) => {
            handleImage(e);
          }}
          name="image"
          placeholder="Select Your Image"
        />{" "}
        <br /> <br />
        {updateExist ? (
          <button
            className="p-3 bg-green-700 font-semibold text-white rounded-2xl"
            onClick={() => {
              handleFormUpdate();
            }}
          >
            Update
          </button>
        ) : (
          <input
            className="p-3 bg-green-700 font-semibold text-white rounded-2xl"
            type="submit"
          />
        )}
      </form>

      <div className="flex flex-wrap p-5 gap-9">
        {allUsers?.map((item, index) => (
          <div className="w-100 h-56 bg-amber-800 rounded-2xl p-5" key={index}>
            <p className="text-white font-semibold text-[18px]">
              {item.userName}
            </p>
            <p className="text-white font-semibold text-[18px]">{item.email}</p>
            <p className="text-white font-semibold text-[18px]">
              {item.password}
            </p>
            <p className="text-white font-semibold text-[18px]">
              {item.picture}
            </p>
            <button
              className="p-2 bg-white rounded-2xl text-amber-600"
              onClick={() => {
                handleUpdate(item);
              }}
            >
              Update
            </button>{" "}
            <br />
            <button
              className="p-2 bg-white rounded-2xl text-amber-600 mt-3"
              onClick={() => {
                handleDelete(item);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
