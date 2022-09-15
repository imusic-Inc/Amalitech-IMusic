import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Passcode from '../../components/passcode';
test('The Passcode component should render', async () => {
    render(<Router><Passcode /></Router>);
    screen.debug();
});