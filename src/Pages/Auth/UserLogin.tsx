import { FormEvent, useState } from "react";
// import loginImg from "../../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";

// import loginImage from "../../assets/authImage.png";
import { baseUrl } from "../../App";

const UserLogin = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      username,
      password,
    };

    const response = await fetch(`${baseUrl}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (response.status == 200) {
      setLoading(false);

      console.log(data);

      
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      window.dispatchEvent(new Event("storage"))
      navigate("/");
    }
  };

  return (
    <>
      <div className="main flex h-[80vh] items-center  justify-center">
        <div className="signIn  flex  flex-col">
          <h1 className="mb-7 text-4xl font-bold text-[#1f1f1f]">Login</h1>

          <div className="form">
            <form onSubmit={handleForm}>
              <div className="mb-4 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label className="text-sm font-semibold text-[#1f1f1f]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="my-2 w-96 rounded-md border-[1px] border-solid border-[#cdcdcd] py-2 pl-3 placeholder:text-[#cccccc]"
                />
              </div>

              <button
                type="submit"
                className="mb-5 h-10 w-96 rounded-lg bg-black text-center text-white"
              >
                {loading ? (
                  <video autoPlay loop className="mx-auto h-10"></video>
                ) : (
                  "Login"
                )}
              </button>
              <p>
                Not a member?
                <Link to={"/user/register"}>
                  {" "}
                  <span className="text-base text-blue-500 hover:underline">
                    Register
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="hidden w-1/2 items-center justify-center lg:flex">
          <img
            className="max-w-lg rounded-lg"
            // src={loginImage}
            alt="Police image"
          />
        </div>
      </div>
    </>
  );
};

export default UserLogin;
