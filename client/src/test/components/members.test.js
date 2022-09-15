import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Members from '../../home/members';
test('The Members component should render', async () => {
    render(<Router><Members /></Router>);
    screen.debug();
});