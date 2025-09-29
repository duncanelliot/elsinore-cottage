import type { BadgeVariant, Todo, TodosByAssignee } from './types.js';

/**
 * Toggle the selection state of a specific todo
 */
// export function toggleTodoSelection(
// 	selectedTodos: Map<number, boolean>, 
// 	todoId: number
// ): Map<number, boolean> {
// 	const newMap = new Map(selectedTodos);
// 	newMap.set(todoId, !newMap.get(todoId));
// 	return newMap;
// }

/**
 * Toggle all todos for a specific assignee (select all or none)
 */
// export function toggleAllTodosForAssignee(
// 	selectedTodos: Map<number, boolean>,
// 	todosByAssignee: TodosByAssignee,
// 	assignee: string,
// 	selectAll: boolean
// ): Map<number, boolean> {
// 	const newMap = new Map(selectedTodos);
// 	const assigneeTodos = todosByAssignee[assignee] || [];
// 	assigneeTodos.forEach((todo: Todo) => {
// 		if (todo.status !== 'completed') {
// 			newMap.set(todo.id, selectAll);
// 		}
// 	});
// 	return newMap;
// }

/**
 * Get the badge variant for a todo priority
 */
export function getPriorityColor(priority: string): BadgeVariant {
	switch (priority) {
		case 'high':
			return 'destructive';
		case 'medium':
			return 'secondary';
		case 'low':
			return 'outline';
		default:
			return 'outline';
	}
}

/**
 * Get the CSS classes for a todo status color
 */
export function getStatusColor(status: string): string {
	switch (status) {
		case 'completed':
			return 'bg-green-100 text-green-800';
		case 'in_progress':
			return 'bg-blue-100 text-blue-800';
		case 'scheduled':
			return 'bg-purple-100 text-purple-800';
		case 'pending':
			return 'bg-yellow-100 text-yellow-800';
		case 'future':
			return 'bg-gray-100 text-gray-800';
		default:
			return 'bg-gray-100 text-gray-800';
	}
}

/**
 * Get the priority icon emoji for a todo priority
 */
export function getPriorityIcon(priority: string): string {
	switch (priority) {
		case 'high':
			return '🔴';
		case 'medium':
			return '🟡';
		case 'low':
			return '🟢';
		default:
			return '⚪';
	}
}