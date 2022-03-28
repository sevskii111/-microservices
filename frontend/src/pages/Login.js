import axios from "axios";
import { useState } from "react";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { AuthService } from "../authService";
import Error from "../components/Error";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [genericErrors, setGenericErrors] = useState([]);
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const res = await AuthService.makeLogin({ username, password });
    const { data } = res;
    if (!data.Success) {
      setGenericErrors(data.Errors.generic || []);
      setUsernameErrors(data.Errors.username || []);
      setPasswordErrors(data.Errors.password || []);
    } else {
      window.location.href = "/";
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const params = {
      username,
      password,
    };

    const formData = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: formData,
      url: `/auth/register`,
      withCredentials: true,
    };

    const response = await axios(options);

    const { data } = response;

    if (!data.Success) {
      setGenericErrors(data.Errors.generic || []);
      setUsernameErrors(data.Errors.username || []);
      setPasswordErrors(data.Errors.password || []);
    } else {
      alert("Registration success");
    }
  };

  return (
    <Form
      className="form mx-auto"
      style={{ maxWidth: 400 }}
      onSubmit={handleLogIn}
    >
      {genericErrors.map((err) => (
        <Error error={err} key={err} />
      ))}
      <FormGroup>
        <Label for="username">Username</Label>
        {usernameErrors.map((err) => (
          <Error error={err} key={err} />
        ))}
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        {passwordErrors.map((err) => (
          <Error error={err} key={err} />
        ))}
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <div>
        <Button type="button" color="secondary me-1" onClick={handleRegister}>
          Register
        </Button>
        <Button type="submit" color="primary">
          LogIn
        </Button>
      </div>
    </Form>
  );
};

export default Login;
