import React from "react";
import { ICheckbox } from "./Checkbox";

interface IComponentState {
    checkedItems: ICheckedItem;
    dropdownVisible: boolean;
}

export interface ICheckedItem {
    [key: string]: boolean;
}


const MultiSelectHooks = (props: any) => {

    const [componentState, setState] = React.useState<IComponentState>({
        checkedItems: props.checkboxes.reduce((prev: any, cur: ICheckbox) => ({ ...prev, [cur.value]: cur.selected }), {}),
        dropdownVisible: false,
    });

    // Make dropdown visible
    const handleDropdownState = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();

        setState(prevState => ({
            ...prevState,
            dropdownVisible: !prevState.dropdownVisible,
        }));
    };

    // Update the checkboxes on input click
    const handleCheckboxChangeOnInputClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const item = e.target.name;
        const isChecked = e.target.checked;
        const checkedItems = {
            ...componentState.checkedItems,
            [item]: isChecked
        };

        setState(prevState => ({
            ...prevState,
            checkedItems: checkedItems
        }));

        props.handleInputChangeFunction(checkedItems);
    };

    // Update the checkboxes on span click
    const handleCheckboxChangeOnSpanClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();

        // @ts-ignore
        const item = e.target.getAttribute("data-name");
        // @ts-ignore
        const isChecked = e.target.getAttribute("data-checked") !== "" ? true : false;

        if (item) {
            const checkedItems = {
                ...componentState.checkedItems,
                [item]: isChecked,
            };

            setState(prevState => ({
                ...prevState,
                checkedItems: checkedItems
            }));

            props.handleInputChangeFunction(checkedItems);
        }
    };

    // Select all checkboxes
    const handleSelectAllCheckboxChange = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const checkedItems = props.checkboxes.reduce((prev: any, cur: any) => ({ ...prev, [cur.value]: true }), {});

        setState(prevState => ({
            ...prevState,
            checkedItems: checkedItems
        }));

        props.handleInputChangeFunction(checkedItems);
    };

    // Update the checkboxes
    const handleDeselectAllCheckboxChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const checkedItems = props.checkboxes.reduce((prev: any, cur: any) => ({ ...prev, [cur.value]: false }), {});

        setState(prevState => ({
            ...prevState,
            checkedItems: checkedItems
        }));

        props.handleInputChangeFunction(checkedItems);
    };

    return {
        componentState,
        handleCheckboxChangeOnInputClick,
        handleCheckboxChangeOnSpanClick,
        handleSelectAllCheckboxChange,
        handleDeselectAllCheckboxChange,
        handleDropdownState,
    };
};

export default MultiSelectHooks;
