import { useState, useEffect } from "react";

function Task15Form({ selectedUser, onSave }) {
    const [form, setForm] = useState({ name: "", email: "", age: "" });

    useEffect(() => {
        if (selectedUser) setForm(selectedUser);
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
        setForm({ name: "", email: "", age: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
            <button type="submit">Save</button>
        </form>
    );
}

export default Task15Form;