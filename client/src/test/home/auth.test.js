import Auth from "../../auth/auth"
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from "react-router-dom";
test('The auth component should render', () => {
    render(<Router><Auth /></Router>);
});

test('The login button must be visible', async () => {
    render(<Router><Auth /></Router>);
    expect(await screen.getByText('SIGN UP FREE'));
});
it('Check when sign up button is clicked',  async () => {
    render(<Router><Auth /></Router>);
    userEvent.click(screen.getByText('SIGN UP FREE'));
});