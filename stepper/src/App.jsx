import { useEffect, useState, useMemo } from "react";
import "./App.css";

function App() {
    const [activeStep, setActiveStep] = useState(1);
    // const [message, setMessage] = useState("");
    const data = [
        {
            id: 1,
            lable: "Contact Details",
            message: "Add contact details for further communications.",
        },
        {
            id: 2,
            lable: "Shipping Address",
            message: "Add shipping address for successful delivery.",
        },

        {
            id: 3,
            lable: "Payment",
            message: "Complete Payment to complete the order.",
        },

        {
            id: 4,
            lable: "Delivered",
            message: "Ready to get delivered!",
        },
    ];
    // useMemo to memoize the message based on activeStep.
    const message = useMemo(() => {
        const step = data.find((item) => item.id === activeStep);
        return step ? step.message : "Order Delivered successfully!🎉";
    }, [activeStep, data]);

    // Effect to handle step-specific logic
    useEffect(() => {
        const currentStep = document.querySelector(`.curr-step-${activeStep}`);
        if (currentStep) {
            currentStep.classList.add("blue"); // Use CSS classes
        }
        return () => {
            if (currentStep) {
                currentStep.classList.remove("blue"); // Cleanup
            }
        };
    }, [activeStep]);
    function handleNext() {
        const currentStep = document.querySelector(`.curr-step-${activeStep}`);
        if (currentStep) {
            currentStep.classList.add("activate");
        }
        setActiveStep((prev) => prev + 1);
    }
    function handlePrevious() {
        const currentStep = document.querySelector(
            `.curr-step-${activeStep - 1}`
        );
        if (currentStep) {
            currentStep.classList.remove("activate");
        }
        const currentSteputil = document.querySelector(
            `.curr-step-${activeStep}`
        );
        if (currentSteputil) {
            currentSteputil.setAttribute("id", "");
        }
        setActiveStep((prev) => prev - 1);
    }
    return (
        <div className="container">
            <div className="stepper-container">
                <div className="stepper-container-util">
                    {data.map((step, index) => (
                        <div key={index} className="step-container">
                            <div className="step">
                                <span
                                    className={`curr-step-${step.id} curr-step`}
                                >
                                    {step.id}
                                </span>
                                <div className="step-label">{step.lable}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="step-message">
                {activeStep <= 4 ? message : "Order Delivered successfully!🎉"}
            </div>
            <div className="btn-container">
                <button
                    disabled={activeStep === 1 ? true : false}
                    onClick={handlePrevious}
                >
                    Previous
                </button>
                <button
                    disabled={activeStep === 5 ? true : false}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
