import App from '../App';
import { render, screen, userEvent, waitFor } from './utils/utils';

describe('Testing useDeferredPromise', () => {
  it('should render and go through the process', async () => {
    const user = userEvent.setup();
    render(<App />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(3);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    await user.click(buttons[0]);
    await waitFor(() => {
      expect(
        screen.getByText('Do you really want to remove this task?')
      ).toBeInTheDocument();
    });

    const no = screen.getByTestId('no');
    await user.click(no);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    await user.click(buttons[0]);
    const yes = screen.getByTestId('yes');
    await user.click(yes);
    expect(screen.queryByText('Task 1')).toBeNull();




    // const input = screen.getByRole('textbox');
    // expect(screen.getByText('Username:')).toBeInTheDocument();
    // expect(input).toBeInTheDocument();
    // await user.type(input, 'Hello World');
    // expect(input).toHaveValue('Hello World');
  });
});
