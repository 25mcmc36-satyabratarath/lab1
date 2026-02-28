$(document).ready(function () {

    let form = $("<form id='dynamicForm'></form>");

    // Build form from JSON
    formStructure.fields.forEach(field => {

        let div = $("<div class='form-group'></div>");
        div.append(`<label>${field.label}</label>`);

        if (field.type === "select") {

            let select = $(`<select id="${field.id}"></select>`);
            select.append(`<option value="">Select</option>`);

            field.options.forEach(opt => {
                select.append(`<option value="${opt}">${opt}</option>`);
            });

            div.append(select);
        }
        else if (field.type === "radio") {

            field.options.forEach(opt => {
                div.append(`
                    <input type="radio" name="${field.id}" value="${opt}"> ${opt}
                `);
            });
        }
        else {
            div.append(`<input type="${field.type}" id="${field.id}">`);
        }

        div.append(`<div class="error" id="${field.id}Error"></div>`);

        form.append(div);
    });

    form.append(`<div id="extraFields"></div>`);
    form.append(`<button type="submit">Register</button>`);

    $("#formContainer").append(form);

    // Country Change Logic
    $(document).on("change", "#country", function () {

        $("#extraFields").empty();

        if ($(this).val() === "USA") {
            $("#extraFields").append(`
                <div class="form-group">
                    <label>State</label>
                    <select id="state">
                        <option value="">Select State</option>
                        <option>California</option>
                        <option>Texas</option>
                        <option>New York</option>
                    </select>
                    <div class="error" id="stateError"></div>
                </div>
            `);
        }

        if ($(this).val() === "India") {
            $("#extraFields").append(`
                <div class="form-group">
                    <label>State</label>
                    <select id="state">
                        <option value="">Select State</option>
                        <option>Odisha</option>
                        <option>Maharashtra</option>
                        <option>Karnataka</option>
                    </select>
                    <div class="error" id="stateError"></div>
                </div>
            `);
        }
    });

    // Conditional Logic (User Type)
    $(document).on("change", "input[name='usertype']", function () {

        if ($(this).val() === "Student") {
            $("#extraFields").append(`
                <div class="form-group" id="collegeField">
                    <label>College Name</label>
                    <input type="text" id="college">
                    <div class="error" id="collegeError"></div>
                </div>
            `);
        } else {
            $("#collegeField").remove();
        }
    });

    // Validation
    $("#dynamicForm").submit(function (e) {

        e.preventDefault();
        $(".error").text("");

        let valid = true;

        if ($("#fullname").val() === "") {
            $("#fullnameError").text("Name is required");
            valid = false;
        }

        if ($("#email").val() === "" || !$("#email").val().includes("@")) {
            $("#emailError").text("Valid email required");
            valid = false;
        }

        if ($("#password").val().length < 6) {
            $("#passwordError").text("Password must be 6+ characters");
            valid = false;
        }

        if ($("#country").val() === "") {
            $("#countryError").text("Select a country");
            valid = false;
        }

        if ($("#state").length && $("#state").val() === "") {
            $("#stateError").text("Select a state");
            valid = false;
        }

        if (!$("input[name='usertype']:checked").val()) {
            $("#usertypeError").text("Select user type");
            valid = false;
        }

        if ($("#college").length && $("#college").val() === "") {
            $("#collegeError").text("College required");
            valid = false;
        }

        if (valid) {
            alert("Form Submitted Successfully!");
        }
    });

});