function Task15List({ users, onEdit, onDelete }) {
    return (
        <div>
            {users.map((u) => (
                <div key={u.id}>
                    {u.name} | {u.email} | {u.age}
                    <button onClick={() => onEdit(u)}>Edit</button>
                    <button onClick={() => onDelete(u.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default Task15List;