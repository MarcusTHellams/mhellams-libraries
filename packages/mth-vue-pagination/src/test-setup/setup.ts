import { server } from '../mocks/server';
import '@testing-library/jest-dom';

import { cleanup } from '@testing-library/vue';
import { afterEach, beforeAll, afterAll } from 'vitest';

beforeAll(() => {
	server.listen();
});
afterEach(() => {
	cleanup();
	server.resetHandlers();
});
afterAll(() => {
	server.close();
});
