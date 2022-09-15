import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import PlayerConrols from '../../players/playerControls';
test('The PlayerConrols component should render', async () => {
    render(<Router><PlayerConrols /></Router>);
    screen.debug();
});