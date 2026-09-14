import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h1>🍴 Recipe Discovery App</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
      <input type="text" placeholder="Search..." />
    </div>
  );
}

export default Navbar;
