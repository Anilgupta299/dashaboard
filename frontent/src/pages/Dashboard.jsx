import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import { getUsers, createUser, updateUser, deleteUser } from "../services/api";
import UserList from "../components/UserList";
function Dashboard() {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    let cancelled = false;
    getUsers()
      .then((response) => {
        if (!cancelled) setUsers(response.data.users || []);
      })
      .catch((error) => console.error("Error fetching users:", error));

    return () => {
      cancelled = true;
    };
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateUser(editingId, {
          name,
          email,
          role,
        });
      } else {
        await createUser({
          name,
          email,
          role,
          password,
        });
      }

      setName("");
      setEmail("");
      setRole("");
      setPassword("");
      setEditingId(null);

      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.response?.data?.message || "Unable to save user");
    }
  };

  const editUser = (user) => {
    setEditingId(user._id);

    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  const cancelEdit = () => {
    setName("");
    setEmail("");
    setRole("");
    setPassword("");
    setEditingId(null);
  };
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <UserForm
        name={name}
        email={email}
        role={role}
        setName={setName}
        setEmail={setEmail}
        setRole={setRole}
        password={password}
        setPassword={setPassword}
        editingId={editingId}
        saveUser={saveUser}
        cancelEdit={cancelEdit}
      />

      <UserList users={users} editUser={editUser} handleDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
