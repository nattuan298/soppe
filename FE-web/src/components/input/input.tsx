import React from "react";
import styles from "./input.module.css";
import classnames from "classnames";

interface InputProps {
  wrapperProps?: Object;
  label?: React.ReactNode;
  name?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  clear?: Boolean;
  errorMessage?: string | undefined;
  focus?: React.ReactNode;
  type?: string;
  placeholder?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  maxLength?: number;
}
class Input extends React.PureComponent<InputProps> {
  static defaultProps = {
    wrapperProps: {},
    label: null,
    name: null,
    className: null,
    icon: null,
    clear: false,
    iconPosition: "left",
    errorMessage: null,
    type: null,
    placeholder: null,
    id: null,
  };
  // setRef = (node: ReactNode) => {};

  render() {
    const {
      className,
      wrapperProps,
      name,
      icon,
      label,
      focus, // eslint-disable-line
      clear,
      iconPosition,
      errorMessage,
      type,
      placeholder,
      id,
      onChange,
      value,
      ...rest
    } = this.props;

    return (
      <div
        className={classnames(`${styles.formGroup}`, {
          [`${styles.clear}`]: clear,
        })}
        {...wrapperProps}
      >
        {label && { label }}
        <div className={classnames(`${styles.inputWrapper}`)}>
          {icon && (
            <span
              className={classnames(`${styles.iconWrapper}`, {
                [`${styles.iconWrapperRight}`]: iconPosition === "right",
              })}
            >
              {icon}
            </span>
          )}
          <input
            className={classnames(className, `${styles.input}`, {
              "ring-error": errorMessage,
            })}
            placeholder={placeholder}
            id={id}
            onChange={onChange}
            type={type}
            name={name}
            value={value}
            {...rest}
          />
        </div>
        {errorMessage && <p className={`${styles.errorMessage}`}>{errorMessage}</p>}
      </div>
    );
  }
}
export default Input;
