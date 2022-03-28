import { Alert } from "reactstrap";

const Error = ({ error }) => {
  return (
    <Alert color="danger" transition={{ baseClass: "", timeout: 0 }}>
      {error}
    </Alert>
  );
};

export default Error;
