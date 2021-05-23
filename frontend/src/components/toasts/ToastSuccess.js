import React from 'react';

export const ToastSuccess = ({ text = '' }) => {
    return (
        <div className="toast-success-custom">
            <i className="far fa-check-circle icon-toast-success"></i>
            <p>{text}</p>
        </div>
    )
}
