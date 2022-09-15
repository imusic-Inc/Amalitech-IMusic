import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import PublicSession from "../../components/publicSession";
test('The PublicSession component should render', async () => {
    render(<Router><PublicSession/></Router>);
});