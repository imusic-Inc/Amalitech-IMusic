import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Session from '../../components/session';
test('The Session component should render', async () => {
    render(<Router><Session /></Router>);
    screen.debug();
});