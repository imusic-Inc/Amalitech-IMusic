import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Invite from '../../session/invite';
test('The Invite component should render', async () => {
    render(<Router><Invite /></Router>);
    screen.debug();
});