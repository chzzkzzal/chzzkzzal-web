import React from "react";
import "./Button.css";

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", disabled = false }) => {
    return (
        <button className={`custom-button ${variant}`} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;
