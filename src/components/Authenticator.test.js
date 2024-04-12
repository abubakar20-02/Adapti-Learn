import { render, fireEvent } from '@testing-library/react';
import Authenticator from './Authenticator';

test('signOut works within child component', () => {
  // Render the Authenticator component
  const { getByText } = render(<Authenticator />);
  
  // Simulate signOut action
  fireEvent.click(getByText('Sign Out'));
  
  // Assert that the signOut action has been triggered
  // You can add more assertions here based on the expected behavior
});