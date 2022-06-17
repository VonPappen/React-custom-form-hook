import { useState } from "react";

/**
 * Note that the validateFn(input) takes the input of the user and must return a boolean
 *
 * @param {array} config - an array containing type, name, inputValue, errorMessage, validateFn(input)
 * @param {function} onSubmitHandler - function to execute on submit
 * @returns formRender - a JSX form
 */
const useForm = (config, onSubmitHandler) => {
    //Create Initial State
    const initialState = {};

    for (let input of config) {
        console.log(input);
        initialState[input.name] = {
            inputValue: input.inputValue,
            isTouched: false,
            validate: input.validate,
        };
    }

    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: {
                ...formData[e.target.name],
                inputValue: e.target.value,
            },
        });
    };

    const blurHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: {
                ...formData[e.target.name],
                isTouched: true,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(formData);
    };

    const isValidDict = {};
    for (let field in formData) {
        isValidDict[field] = {
            isValid: formData[field].validate(
                formData[field].inputValue,
                formData
            ),
        };
    }
    const allValid = Object.values(isValidDict).every(
        (value) => value.isValid === true
    );

    const errorDict = {};
    for (let field in formData) {
        errorDict[field] = {
            hasError: !isValidDict[field].isValid && formData[field].isTouched,
        };
    }
    const noError = Object.values(errorDict).every(
        (value) => value.hasError === false
    );

    const formValid = noError && allValid;

    const formRender = config.map((item, idx) => {
        return (
            <div key={idx}>
                <input
                    className="bg-gray-300 border border-gray-400 m-2"
                    type={item.type}
                    name={item.name}
                    value={formData[item.name].inputValue}
                    onChange={handleInputChange}
                    placeholder={item.placeHolder}
                    onBlur={blurHandler}
                />
                {errorDict[item.name].hasError && (
                    <p className="text-red-600" key={idx}>
                        {item.errorMessage}
                    </p>
                )}

                {formValid && <p>Form valid</p>}
            </div>
        );
    });

    return {
        formData,
        // handleInputChange,
        handleSubmit,
        // blurHandler,
        formRender,
    };
};

export default useForm;
