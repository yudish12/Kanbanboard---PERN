import { useEffect, useState } from "react";
import FormRow from "../components/Form-components/FormRow";
import { useAuthContext } from "../context/hooks";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const { email, password, last_name, first_name } = formdata;
  const [loading, setLoading] = useState(false);
  const { signupFunc, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    await signupFunc(email, password, first_name, last_name);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="login-section">
      <h2 className="login-title text-3xl font-semibold">Signup</h2>
      <div className="login-container">
        <form className="form">
          <FormRow
            value={first_name}
            handleChange={handleChange}
            type="text"
            name="first_name"
            labelText="First Name"
          />
          <FormRow
            value={last_name}
            handleChange={handleChange}
            type="text"
            name="last_name"
            labelText="Last Name"
          />
          <FormRow
            value={email}
            handleChange={handleChange}
            type="email"
            name="email"
            labelText="Email"
          />
          <FormRow
            value={password}
            handleChange={handleChange}
            type="password"
            name="password"
            labelText="Password"
          />
        </form>
        <div className="w-full flex flex-col justify-center">
          <button
            onClick={handleSignup}
            className="form-btn flex gap-3 items-center justify-center"
          >
            Signup
            {loading && (
              <Oval
                visible={true}
                height="30"
                width="30"
                color="#4fa94d"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </button>
          <span className="text-primary text-sm text-center mx-auto mt-2">
            {" "}
            Already have an account?
            <a href="/login" className="font-semibold hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Signup;
