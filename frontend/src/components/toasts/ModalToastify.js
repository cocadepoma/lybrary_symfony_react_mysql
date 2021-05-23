
// This component needs a function, and ID or Name to show in, and a message

export const ModalToastify = ({ closeToast, handleDeleteItem, message, title }) => {

    return (
        <div className="toast-wrapper-container">
            <p>{message} <b>{title}</b>?</p>
            <div className="toast-wrapper-buttons">
                <span
                    onClick={closeToast}
                    className="btn btn-cancel">
                    Cancelar
                </span>
                <span
                    onClick={(e) => { e.stopPropagation(); closeToast(); handleDeleteItem(); }}
                    className="btn btn-agree">Aceptar
                </span>
            </div>
        </div>
    )
}