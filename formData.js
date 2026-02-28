const formStructure = {
    title: "User Registration",
    fields: [
        { label: "Full Name", type: "text", id: "fullname", required: true },
        { label: "Email", type: "email", id: "email", required: true },
        { label: "Password", type: "password", id: "password", required: true },
        {
            label: "Country",
            type: "select",
            id: "country",
            options: ["India", "USA", "Canada"],
            required: true
        },
        {
            label: "User Type",
            type: "radio",
            id: "usertype",
            options: ["Student", "Professional"],
            required: true
        }
    ]
};