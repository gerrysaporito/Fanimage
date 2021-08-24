import React from "react";

interface IComponentProps {
    company?: any;
    privacy?: any;
    terms?: any;
}

const Footer: React.FunctionComponent<IComponentProps> = (props: IComponentProps) => {
    const { company, privacy, terms } = props;

    return (
        <footer>
            <a href={company?.route}>GERRY SAPORITO</a>
            <section>
                <a href="https://www.linkedin.com/in/gerrysaporito/">LinkedIn</a> | <a href="https://github.com/gerrysaporito">Github</a>
            </section>
        </footer>
    );
};

export default Footer;