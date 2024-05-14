import { render } from "@testing-library/react";
import App from "../src/App";
import { test } from "@jest/globals";
import React from "react";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockResponse } from "../utils/axiosMockResponse.ts";

// Create a new instance of axios with a mock adapter
const mock = new MockAdapter(axios);

// Mock the response for the auth status request
mock.onGet("http://localhost:3001/auth/authstatus").reply(200, mockResponse);

test("renders App component", () => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
