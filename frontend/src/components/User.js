import { NavLink } from "reactstrap";
import { AuthService } from "../authService";

const User = ({ user }) => {
  if (user) {
    return (
      <div className="d-flex align-items-center">
        <span>{user.Username}</span>
        <NavLink
          onClick={async () => {
            const res = await AuthService.makeLogout();
            if (res.data.Success) {
              window.location.href = "/";
            } else {
              alert(res.data.Errors);
            }
          }}
          role="button"
        >
          Logout
        </NavLink>
      </div>
    );
  } else {
    return <NavLink href="/login">Login</NavLink>;
  }
};

export default User;
