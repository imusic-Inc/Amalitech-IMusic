import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import NewMessage from '../../message/newMessage';
test('The NewMessage component should render', async () => {
    render(<Router><NewMessage /></Router>);
    screen.debug();
});