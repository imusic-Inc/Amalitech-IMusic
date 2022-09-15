import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Player from '../../players/player';
test('The Player component should render', async () => {
    render(<Router><Player /></Router>);
    screen.debug();
});