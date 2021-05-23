import React from 'react'

export const ToastError = ({ text }) => {
    return (
        <div className="toast-success-custom">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{text}</p>
        </div>
    )
}
