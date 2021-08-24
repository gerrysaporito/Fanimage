import React from "react";
import Checkbox, { ICheckbox } from "./Checkbox";
import MultiSelectHooks, { ICheckedItem } from "./MultiSelectHooks";

interface IComponentProps {
    // List of options to display in dropdown
    checkboxes: ICheckbox[];
    // Function to update list
    handleInputChangeFunction?: (selected: ICheckedItem) => void;
}

/*
 * Multi select checkbox react component
 */
const MultiSelect: React.FunctionComponent<IComponentProps> = (props: IComponentProps): React.ReactElement => {
    const { checkboxes } = props;
    const { componentState, handleCheckboxChangeOnInputClick, handleCheckboxChangeOnSpanClick, handleSelectAllCheckboxChange, handleDeselectAllCheckboxChange, handleDropdownState } = MultiSelectHooks(props);

    const checkboxesList: React.ReactElement[] = [];

    const checkboxDefaults: React.ReactElement[] = [
        (
            <span key={"select_buttons"}>
                <button onClick={handleSelectAllCheckboxChange} >
                    Select All
                </button>
                <button onClick={handleDeselectAllCheckboxChange} >
                    Deselect All
                </button>

            </span>
        )
    ];

    const checkboxesOptions: React.ReactElement[] = checkboxes.map((option: ICheckbox) => {
        const checked = componentState.checkedItems[option.value];

        return (
            <Checkbox
                checked={checked}
                key={option.value}
                value={option.value}
                label={option.label}
                onChangeInputClick={handleCheckboxChangeOnInputClick}
                onChangeSpanClick={handleCheckboxChangeOnSpanClick}
            />
        );
    });

    checkboxesList.push(...checkboxDefaults, ...checkboxesOptions);

    const selectedBoxes: React.ReactElement[] = Object.keys(componentState.checkedItems)
        .filter(item => componentState.checkedItems[item])
        .map(((item: string) => {
            const value = props.checkboxes.filter((checkbox: ICheckbox) => checkbox.value.toString() === item);

            return <MultiSelectItem key={item} item={item} label={value[0]?.label} />;
        }));

    return (
        <div className="multi-select" >
            <span className="multi-select__input" onClick={handleDropdownState}>
                {selectedBoxes.length > 0 ? selectedBoxes : <MultiSelectItem item={"N/A"} label="N/A" dummy />}
                <span className="caret-down">
                    <i className="fas fa-caret-down" />
                </span>

            </span>
            {componentState.dropdownVisible && (
                <span className="multi-select__dropdown">
                    {checkboxesList}
                </span>
            )}
        </div>
    );
};

export default MultiSelect;


interface IMultiSelectItem {
    item: string;
    label: string;
    dummy?: boolean;
}
const MultiSelectItem: React.FunctionComponent<IMultiSelectItem> = (props: IMultiSelectItem): React.ReactElement => {
    const { item, label, dummy } = props;
    const classes = ["multi-select__selected-options"];

    if (dummy) {
        classes.push("multi-select__selected-options--dummy");
    }
    return <span className={classes.join(" ")}>{label || item}</span>;
};