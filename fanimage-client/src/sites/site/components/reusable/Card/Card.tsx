import React from "react";

interface IComponentProps {
    // Float or flat
    float?: boolean;
    // Color of card: < primary | secondary | alternative >
    color?: string;
    // Card should be outlined
    outline?: boolean;
    // Padding amount < small | medium | large >
    padding?: string;
    // Margin amount < small | medium | large >
    margin?: string;
    // Card should have rounded corners:
    roundedCorners?: boolean;
    // Children react components
    children: React.ReactNode;
}

const Card: React.FunctionComponent<IComponentProps> = (props: IComponentProps) => {
    const { children, float, color = "primary", outline = false, padding = "medium", roundedCorners = true, margin } = props;

    const classes = ["parent-card", "float"];

    switch (padding.toLowerCase()) {
        case "small": {
            classes.push("parent-card--padding-small");
            break;
        }
        case "medium": {
            classes.push("parent-card--padding-medium");
            break;
        }
        case "large": {
            classes.push("parent-card--padding-large");
            break;
        }
    }

    switch (margin?.toLowerCase()) {
        case "small": {
            classes.push("parent-card--margin-small");
            break;
        }
        case "medium": {
            classes.push("parent-card--margin-medium");
            break;
        }
        case "large": {
            classes.push("parent-card--margin-large");
            break;
        }
    }

    if (float) {
        classes.push("float");
    }

    if (outline) {
        classes.push("parent-card--outline");
    }

    if (roundedCorners) {
        classes.push("parent-card--rounded-corners");
    }

    switch (color.toLowerCase()) {
        case "primary": {
            classes.push("parent-card--primary");
            break;
        }
        case "secondary": {
            classes.push("parent-card--secondary");
            break;
        }
        case "alternative": {
            classes.push("parent-card--alternative");
            break;
        }
    }

    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    );
};

export default Card;
