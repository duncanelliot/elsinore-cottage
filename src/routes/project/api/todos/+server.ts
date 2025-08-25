import { json, type RequestHandler } from '@sveltejs/kit';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const TODOS_FILE_PATH = join(process.cwd(), 'src/routes/project/data/todos.json');

interface Todo {
	id: number;
	task: string;
	assignee: string[];
	organization: string;
	status: string;
	priority: string;
	dueDate?: string;
	description: string;
	context: string;
}

// Read todos from JSON file
function readTodos(): Todo[] {
	try {
		const todosJson = readFileSync(TODOS_FILE_PATH, 'utf-8');
		return JSON.parse(todosJson);
	} catch (error) {
		console.error('Error reading todos:', error);
		throw new Error('Failed to read todos');
	}
}

// Write todos to JSON file
function writeTodos(todos: Todo[]): void {
	try {
		const todosJson = JSON.stringify(todos, null, '\t');
		writeFileSync(TODOS_FILE_PATH, todosJson, 'utf-8');
	} catch (error) {
		console.error('Error writing todos:', error);
		throw new Error('Failed to save todos');
	}
}

// GET - Load current todos
export const GET: RequestHandler = async () => {
	try {
		const todos = readTodos();
		return json(todos);
	} catch (error) {
		return json({ error: 'Failed to load todos' }, { status: 500 });
	}
};

// POST - Handle various todo operations
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		
		// If the body is an array, it's a direct save of all todos
		if (Array.isArray(body)) {
			writeTodos(body);
			return json({ success: true, todos: body });
		}
		
		// Otherwise, handle action-based operations
		const { action, ...data } = body;
		let todos = readTodos();

		switch (action) {
			case 'updateStatus': {
				const { id, status } = data;
				const todoIndex = todos.findIndex(t => t.id === id);
				if (todoIndex !== -1) {
					todos[todoIndex].status = status;
				}
				break;
			}

			case 'reorder': {
				const { id, direction } = data;
				const todo = todos.find(t => t.id === id);
				if (!todo) break;

				const statusTodos = todos.filter(t => t.status === todo.status);
				const otherTodos = todos.filter(t => t.status !== todo.status);
				const currentIndex = statusTodos.findIndex(t => t.id === id);

				if (direction === 'up' && currentIndex > 0) {
					[statusTodos[currentIndex], statusTodos[currentIndex - 1]] = 
						[statusTodos[currentIndex - 1], statusTodos[currentIndex]];
				} else if (direction === 'down' && currentIndex < statusTodos.length - 1) {
					[statusTodos[currentIndex], statusTodos[currentIndex + 1]] = 
						[statusTodos[currentIndex + 1], statusTodos[currentIndex]];
				}

				todos = [...otherTodos, ...statusTodos];
				break;
			}

			case 'save': {
				const { todos: newTodos } = data;
				todos = newTodos;
				break;
			}

			default:
				return json({ error: 'Invalid action' }, { status: 400 });
		}

		writeTodos(todos);
		return json({ success: true, todos });

	} catch (error) {
		console.error('API Error:', error);
		return json({ error: 'Failed to process request' }, { status: 500 });
	}
};