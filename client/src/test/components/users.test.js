import {render, screen} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Users from '../../home/users';
test('The Users component should render', async () => {
    render(<Router><Users /></Router>);
    screen.debug();
});