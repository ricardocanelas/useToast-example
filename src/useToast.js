import React, { createContext, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext();

function ToastProvider({
  children,
  DefaultToast = null,
  portal = null,
  maximum = 10,
}) {
  const timers = useRef({});
  const index = useRef(0);
  const [toasts, setState] = useState([]);
  const DefaultToastComponent = DefaultToast || Alert;
  const portalTarget = portal;

  function generateId() {
    index.current += 1;
    return Number(index.current);
  }

  function createTimeout(toast, time) {
    timers.current[toast.id] = setTimeout(() => removeToast(toast.id), time);
  }

  function removeTimeout(toastId) {
    clearTimeout(timers.current[toastId]);
    delete timers.current[toastId];
  }

  const addToast = (props, direction = "bottom", time = 5000) => {
    const opts = { props, direction, time };

    if (arguments.length === 0 || !props) return;
    if (isNaN(Number(direction)) && arguments.length === 2)
      opts.time = direction;

    const id = generateId();

    setState((prevState) => {
      let newToasts = [].concat(
        { props, id, direction, Component: DefaultToastComponent },
        prevState || []
      );
      createTimeout({ props, id, direction }, time);
      if (newToasts.length > maximum) newToasts.pop();

      return newToasts;
    });
  };

  const removeToast = (toastId) => {
    removeTimeout(toastId);
    setState((prevState) => {
      const newToasts = prevState.filter(({ id }) => id !== toastId);
      return newToasts;
    });
  };

  const clearToasts = () => {
    setState([]);
  };

  const getToasts = (direction = null) => {
    if (!direction) return toasts;
    return toasts.filter((toast) => toast.direction === direction);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        getToasts,
        addToast,
        removeToast,
        clearToasts,
      }}
    >
      {portalTarget && createPortal(<Toaster />, portalTarget)}
      {!portalTarget && <Toaster />}
      {children}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);

  if (context === undefined) {
    throw new Error(`useToast must be used within a ToastProvider`);
  }

  return context;
}

const Alert = ({ props, remove, id }) => {
  const handleRemove = () => {
    remove();
  };

  const { title, variant = "primary" } = props;

  return (
    <div className={`toaster__message toaster__message--${variant}`}>
      [{id}] {title}
      <button
        type="button"
        className="toaster__message__close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={handleRemove}
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
};

const Toaster = () => {
  const { removeToast, getToasts } = useToast();

  const renderScreen = (direction) => {
    return (
      <span className={`toaster_screen-${direction}`}>
        {getToasts(direction).map((toast) => (
          <toast.Component
            key={`${direction}-${toast.id}`}
            id={toast.id}
            props={toast.props}
            remove={() => removeToast(toast.id)}
          />
        ))}
      </span>
    );
  };

  return (
    <div className="toaster">
      {renderScreen("top")}
      {renderScreen("top-left")}
      {renderScreen("top-right")}
      {renderScreen("bottom")}
      {renderScreen("bottom-left")}
      {renderScreen("bottom-right")}
    </div>
  );
};

export { ToastProvider, Alert, useToast };

export default useToast;
