// function UserForm(){
//     return(
//         <div>
//             <h2>User Form</h2>
//         </div>
//     );
// }
// export default UserForm;

function UserForm({
  name,
  email,
  role,
  password,
  setName,
  setEmail,
  setRole,
  setPassword,
  editingId,
  saveUser,
  cancelEdit,
}) {
  return (
    <div className="form-card">
      <h2>{editingId ? "Edit User" : "Add User"}</h2>

      <form className="user-form" onSubmit={saveUser}>
        <input className="input"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input className="input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input className="input"
          type="text"
          placeholder="Enter role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        {!editingId && (
          <input className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}
        

        <button className="primary-btn" type="submit">{editingId ? "Update User" : "Add User"}</button>
        {editingId && (
          <button className="cancel-btn" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default UserForm;
