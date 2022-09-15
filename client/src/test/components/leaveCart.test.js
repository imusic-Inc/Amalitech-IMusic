import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import LeaveCart from '../../components/leaveCart';
test('The LeaveCart component should render', async () => {
    render(<Router><LeaveCart /></Router>);
    screen.debug();
});