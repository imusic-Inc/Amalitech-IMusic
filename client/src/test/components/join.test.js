import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Join from '../../components/join';
test('The Join component should render', async () => {
    render(<Router><Join /></Router>);
    screen.debug();
});