import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import Discover from '../../home/discover';
test('The Discover component should render', () => {
    render(<Router><Discover /></Router>);
    screen.debug();
});