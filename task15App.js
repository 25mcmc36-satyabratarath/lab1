import { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "./task15api";
import Task15Form from "./components/task15Form";
import Task15List from "./components/task15List";

function Task15App() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        const res = await getUsers(page);
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const handleSave = async (user) => {
        if (user.id) {
            await updateUser(user.id, user);
        } else {
            await addUser(user);
        }
        fetchUsers();
        setSelectedUser(null);
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <div>
            <h1>CRUD App</h1>

            <Task15Form selectedUser={selectedUser} onSave={handleSave} />

            <Task15List
                users={users}
                onEdit={setSelectedUser}
                onDelete={handleDelete}
            />

            <button onClick={() => setPage(page - 1)}>Prev</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
}

export default Task15App;