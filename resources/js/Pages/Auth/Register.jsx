import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", formData);
      setSuccess(res.data.message);
      console.log(res.data);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      {success && <p className="text-green-600">{success}</p>}
      <form onSubmit={handleSubmit} style={{maxWidth:200 , display:"flex" , flexDirection:"column", gap:4}} > 
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        {errors.name && <p className="text-red-600">{errors.name[0]}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        {errors.email && <p className="text-red-600">{errors.email[0]}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        {errors.password && <p className="text-red-600">{errors.password[0]}</p>}

        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" style={{maxWidth:90}}>
          Register
        </button>
      </form>
    </div>
  );
}
