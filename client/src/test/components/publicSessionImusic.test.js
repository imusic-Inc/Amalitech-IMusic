import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import PublicSessionImusic from '../../components/publicSessionImusic';
test('The PublicSessionImusic component should render', async () => {
    render(<Router><PublicSessionImusic /></Router>);
    screen.debug();
});