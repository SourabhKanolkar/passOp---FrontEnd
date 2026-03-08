import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Manager() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  const navigate=useNavigate();
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
 

  if (!token) {
    navigate("/");
  }
}, [navigate]);



  const fetchPasswords = async () => {
    try {
      const res = await axios.get(`${apiUrl}passwords`, {
        headers: {
          "auth-token": token,
        },
      });

      setPasswordArray(res.data.data);
    } catch (error) {
      toast("Failed to load passwords");
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, [token]);

  const savePassword = async () => {
    if (
      form.site.length <= 3 ||
      form.username.length <= 3 ||
      form.password.length <= 3
    ) {
      toast("Please ensure all fields contain a minimum of four characters.");
      return;
    }

    try {
      //BELOW IS UPDATE LOGIC
      if (editId) {
        const res = await axios.put(`${apiUrl}passwords/${editId}`, form,{
          headers:{
            "auth-token":token
          },
        });
        setPasswordArray(
          passwordArray.map((p) => (p._id === editId ? res.data : p)),
        );
        toast("Password Updated");
        setEditId(null);
        setForm({ site: "", username: "", password: "" });
      } else {
        //CREATE MODE (CREATES PASSWORD IN DATABASE)
        const res = await axios.post(`${apiUrl}passwords`, form, {
          headers: {
            "auth-token": token,
          },
        });
        setPasswordArray([res.data.newPass, ...passwordArray]);
        toast("Password Saved");
        setForm({ site: "", username: "", password: "" });
      }
    } catch (error) {
      toast("Server error");
    }
  };

  const deletePassword = async (id) => {
    const c = confirm("Do you really want to delete this password?");
    if (!c) {
      return;
    }
    try {
      await axios.delete(`${apiUrl}passwords/${id}`,{
        headers:{
          "auth-token":token
        }
      });
      setPasswordArray(passwordArray.filter((item) => item._id !== id));
      toast("Password Deleted !");
      setForm({ site: "", username: "", password: "" });
    } catch (error) {
      toast("Delete failed");
    }
  };

  const editPassword = async (item) => {
    setForm({
      site: item.site,
      username: item.username,
      password: item.password,
    });
    setEditId(item._id);
  };

  const copyText = (text) => {
    toast("Copied to clipboard");
    navigator.clipboard.writeText(text);
  };

  const togglePassword = () => {
    setShowPass(!showPass); // Toggle the boolean
  };

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <div className="bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <ToastContainer autoClose={2000} />
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className=" p-2  mycontainer2">
          <h1 className="text-4xl font-bold text-center mt-7">
            <span className="text-green-500">&lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>

          <p className="text-green-900 text-lg text-center">
            Your own Password Manager
          </p>

          <div className=" flex flex-col p-4 text-black gap-8 items-center">
            <input
              value={form.site}
              onChange={handelChange}
              placeholder="Enter website URL"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="site"
              id="site"
            />
            <div className="flex flex-col md:flex-row w-full justify-between gap-8">
              <input
                value={form.username}
                onChange={handelChange}
                placeholder="Enter Username"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="text"
                name="username"
                id="username"
              />
              <div className="relative">
                <input
                  value={form.password}
                  onChange={handelChange}
                  placeholder="Enter Password"
                  className="rounded-full border border-green-500 w-full p-4 py-1"
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                />
                <span
                  className="absolute right-[3px] top-[4px] cursor-pointer"
                  onClick={togglePassword}
                >
                  <img
                    className="p-1"
                    width={26}
                    src={showPass ? "./eye.png" : "./eyecross.png"}
                    alt="eye"
                  />
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                savePassword();
              }}
              className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border    border-green-900"
            >
              <lord-icon
                src="https://cdn.lordicon.com/efxgwrkc.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          </div>

          <div className="passwords">
            <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
            {passwordArray.length === 0 && <div>No Passwords to show</div>}

            {passwordArray.length != 0 && (
              <div className="overflow-x-auto">
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className=" bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="  py-2 border border-white text-center ">
                          <div className="flex items-center justify-center">
                            <a
                              href={item.site}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.site}
                            </a>
                            <div
                              className=" lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="  py-2 border border-white text-center ">
                          <div className="flex items-center justify-center">
                            <span> {item.username}</span>
                            <div
                              className=" lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="   py-2 border border-white text-center ">
                          <div className="flex items-center justify-center">
                            <span> {item.password}</span>
                            <div
                              className="lordiconcopy size-7 cursor-pointer"
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src="https://cdn.lordicon.com/xuoapdes.json"
                                trigger="hover"
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className="flex items-center justify-center py-2 border border-white text-center ">
                          <span className="cursor-pointer mx-1">
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                              }}
                              src="./edit.png"
                              onClick={() => {
                                editPassword(item);
                              }}
                              alt="edit-icon"
                            />
                          </span>
                          <span className="cursor-pointer mx-1">
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                              }}
                              src="./bin.png"
                              onClick={() => {
                                deletePassword(item._id);
                              }}
                              alt="delete-icon"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Manager;
