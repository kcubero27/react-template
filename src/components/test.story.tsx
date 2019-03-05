import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

interface Props {
    children: any;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
}

const Test = ({ fontSize = 16, fontFamily = "Arial", color = "red", children }: Props) => (
    <div style={{ color, fontFamily, fontSize: fontSize + "px" }}>{children}</div>
);

storiesOf("Test", module)
    .addWithJSX("Paris", () => {
        const fontSize = number("Font size", 45);
        return (
            <Test fontSize={fontSize} fontFamily="Roboto" color="#CAF200">
                Hello
            </Test>
        );
    })
    .addWithJSX("Orleans", () => <Test color="#236544">Hello</Test>);

storiesOf("Test 2", module).addWithJSX("Paris", () => <div color="#333">test</div>);