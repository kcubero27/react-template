import React from "react";
import { render, waitForElement } from "react-testing-library";

const ExampleComponent = ({ name }) => {
    return <p>{name}.</p>;
};

describe("Example Component", function() {
    test("it renders the name", async () => {
        const name = "Lorem";
        const { container, getByText } = render(<ExampleComponent name={name} />);

        await waitForElement(() => getByText(/Lorem/));

        expect(container).toMatchSnapshot();
    });
});
