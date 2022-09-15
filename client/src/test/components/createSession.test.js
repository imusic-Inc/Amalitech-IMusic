import userEvent from '@testing-library/user-event'
import {render, screen, fireEvent} from '@testing-library/react'
import { BrowserRouter as Router } from "react-router-dom";
import CreateSession from "../../components/createSession";

test('The creat session component should render', () => {
    render(<Router><CreateSession /></Router>);
});
test('The create button must be visible', () => {
    render(<Router><CreateSession /></Router>);
    expect(screen.getByTestId('create'));
    expect(screen.queryByTestId('passcode')).toBeNull();
});
test('The private input must be visible', () => {
    render(<Router><CreateSession /></Router>);
    expect(screen.getByTestId('create'));
    expect(screen.queryByTestId('passcode')).toBeNull();
});

test('The discription input must be visible', () => {
    render(<Router><CreateSession /></Router>);
    expect(screen.getByTestId('discription'));
    expect(screen.queryByTestId('passcode')).toBeNull();
});

test('The room type input must be visible', () => {
    render(<Router><CreateSession /></Router>);
    expect(screen.getByTestId('roomtype'));
    expect(screen.queryByTestId('passcode')).toBeNull();
});

test('The name input must be visible',  () => {
    render(<Router><CreateSession /></Router>);
    expect(screen.getByTestId('name'));
    expect(screen.queryByTestId('passcode')).toBeNull();
});

test('The when private is clicked password must be visible', () => {
    render(<Router><CreateSession /></Router>);
    fireEvent.click(screen.getByTestId('roomtype'));
    expect(screen.getByTestId('passcode'));
});