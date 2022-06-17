import useForm from "../hooks/useForm";

function Form() {
    const { formRender } = useForm(
        [
            {
                inputValue: "",
                type: "email",
                name: "email",
                errorMessage: "Invalid Email",
                validate(input) {
                    return input.trim().includes("@");
                },
                placeHolder: "Enter your Email Here",
            },
            {
                inputValue: "",
                type: "password",
                name: "password",
                errorMessage: "Invalid Password",
                validate(input) {
                    return input.trim().length > 6;
                },
                placeHolder: "enter your password",
            },
            {
                inputValue: "",
                type: "password",
                name: "confirmPassword",
                placeHolder: "Confirm your Password",
                errorMessage: "Passwords do not match",
                validate(input, formData) {
                    return input.trim() === formData["password"].inputValue;
                },
            },
        ],
        (formData) => console.dir(formData)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
    };

    return (
        <form onSubmit={handleSubmit}>
            {formRender}
            <button>Submit</button>
        </form>
    );
}

export default Form;
