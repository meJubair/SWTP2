import { render } from '@testing-library/react';
import App from '../src/App';
import {test} from '@jest/globals';
import React from 'react';

test('renders App component', () => {
  render(<App />);
});