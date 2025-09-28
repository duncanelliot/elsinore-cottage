// Project-specific TypeScript interfaces

export interface Person {
	name: string;
	email: string;
	role: string;
	description: string;
	phone?: string;
	credentials?: string;
	location?: string;
}

export interface Participants {
	[organizationName: string]: Person[];
}

export interface Todo {
	id: number;
	task: string;
	assignee: string[];
	organization: string;
	status: 'pending' | 'in_progress' | 'scheduled' | 'completed' | 'abandoned' | 'future';
	priority: 'high' | 'medium' | 'low';
	description: string;
	context: string;
	dueDate?: string;
}

export interface ProjectDetails {
	title: string;
	description: string;
	status: string;
	demoUrl?: string;
	keyMilestones: string[];
}

export interface AssigneeEmails {
	[assigneeName: string]: string;
}

export interface CopyStates {
	[assigneeName: string]: 'ready' | 'copied' | 'error';
}

export interface TodosByStatus {
	[status: string]: Todo[];
}

export interface TodosByOrganization {
	[organization: string]: Todo[];
}

export interface TodosByAssignee {
	[assigneeName: string]: Todo[];
}

export type StatusOrder = ['pending', 'in_progress', 'scheduled', 'completed', 'future'];

export interface StatusLabels {
	[status: string]: string;
}

// Component prop interfaces
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface PersonTodosProps {
	assignee: string;
	assigneeTodos: Todo[];
	assigneeEmails: AssigneeEmails;
	selectedTodos: Map<number, boolean>;
	copyStates: CopyStates;
	toggleTodoSelection: (todoId: number) => void;
	toggleAllTodosForAssignee: (assignee: string, selectAll: boolean) => void;
	generateEmailContent: (assignee: string, assigneeTodos: Todo[]) => string;
	copyToClipboard: (content: string, assignee: string) => Promise<void>;
}

export interface ProjectParticipantsProps {
	participants: Participants;
}

// Drag and drop types
export interface DndEvent<T = any> {
	detail: {
		items: T[];
		info: {
			source: string;
			trigger: string;
		};
	};
}

export interface TodoColumns {
	[status: string]: Todo[];
}

export interface KanbanBoardProps {
	todos: Todo[];
	statusOrder: string[];
	statusLabels: StatusLabels;
	showChangeNotification: () => void;
	onCardClick?: (todo: Todo) => void;
}

export interface TodosByOrganizationProps {
	todos: Todo[];
	todosByOrg: TodosByOrganization;
	statusOrder: string[];
	statusLabels: StatusLabels;
	todosByStatus: TodosByStatus;
	showChangeNotification: () => void;
}

