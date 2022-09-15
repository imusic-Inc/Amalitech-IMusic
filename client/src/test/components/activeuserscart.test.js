import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Activeuserscart from '../../session/activeuserscart';
test('The Activeuserscart component should render', async () => {
    render(<Router><Activeuserscart/></Router>);
    screen.debug();
});