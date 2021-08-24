import React from "react";

export interface ICheckbox {
    label: string;
    value: string;
    selected?: boolean;
}

interface ICheckboxComponentProps extends ICheckbox {
    type?: string;
    checked?: boolean;
    onChangeInputClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSpanClick?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}

const Checkbox: React.FunctionComponent<ICheckboxComponentProps> = (props: ICheckboxComponentProps): React.ReactElement => {
    const { type = "checkbox", checked, value, label, onChangeInputClick, onChangeSpanClick } = props;

    return (
        <div className="checkbox">
            <input type={type} name={value} checked={checked} onChange={onChangeInputClick} />
            <span data-name={value} data-checked={checked ? "" : "true"} onClick={onChangeSpanClick}>{label}</span>
        </div >
    );
};

export default Checkbox;
