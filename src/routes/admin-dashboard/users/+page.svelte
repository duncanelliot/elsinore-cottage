<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Plus, Edit, Trash2, User } from 'lucide-svelte';
	import CreateUserModal from './create-user-modal.svelte';

	interface Permission {
		id: string;
		canViewBookings: boolean;
		canEditBookings: boolean;
		canDeleteBookings: boolean;
		canViewUsers: boolean;
		canEditUsers: boolean;
		canDeleteUsers: boolean;
		canManageSettings: boolean;
		canViewReports: boolean;
		canManageCalendar: boolean;
		canManagePricing: boolean;
	}

	interface User {
		id: string;
		email: string;
		username: string | null;
		name: string;
		phone: string | null;
		role: string;
		isActive: boolean;
		lastLogin: string | null;
		createdAt: string;
		permissions: Permission[];
	}

	let users: User[] = [];
	let loading = true;
	let showCreateModal = false;
	let editingUser: User | null = null;

	onMount(async () => {
		await fetchUsers();
	});

	async function fetchUsers() {
		try {
			const response = await fetch('/api/users');
			if (response.ok) {
				users = await response.json();
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		} finally {
			loading = false;
		}
	}

	async function deleteUser(userId: string) {
		if (!confirm('Are you sure you want to delete this user?')) return;

		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: 'DELETE'
			});

			if (response.ok) {
				await fetchUsers();
			}
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	}

	function handleUserCreated() {
		showCreateModal = false;
		fetchUsers();
	}

	function getRoleBadgeVariant(role: string) {
		switch (role) {
			case 'super_admin':
				return 'destructive';
			case 'admin':
				return 'default';
			case 'staff':
				return 'secondary';
			default:
				return 'outline';
		}
	}

	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString();
	}

	function getPermissionCount(permissions: Permission[]): number {
		if (!permissions[0]) return 0;
		const perm = permissions[0];
		return Object.values(perm).filter((value, index) => index > 0 && value === true).length;
	}
</script>

<svelte:head>
	<title>User Management - Admin Dashboard</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">User Management</h1>
			<p class="text-muted-foreground">Manage users, roles, and permissions</p>
		</div>
		<Button onclick={() => (showCreateModal = true)} class="gap-2">
			<Plus class="h-4 w-4" />
			Add User
		</Button>
	</div>

	{#if loading}
		<div class="flex items-center justify-center h-64">
			<div class="text-muted-foreground">Loading users...</div>
		</div>
	{:else}
		<div class="grid gap-4">
			{#each users as user}
				<Card>
					<CardHeader class="pb-3">
						<div class="flex items-start justify-between">
							<div class="flex items-center gap-3">
								<div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
									<User class="h-5 w-5" />
								</div>
								<div>
									<CardTitle class="text-lg">{user.name}</CardTitle>
									<CardDescription class="flex items-center gap-2">
										{user.email}
										{#if user.username}
											<span class="text-xs">(@{user.username})</span>
										{/if}
									</CardDescription>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<Badge variant={getRoleBadgeVariant(user.role)}>
									{user.role.replace('_', ' ').toUpperCase()}
								</Badge>
								{#if !user.isActive}
									<Badge variant="outline">Inactive</Badge>
								{/if}
							</div>
						</div>
					</CardHeader>
					<CardContent class="pt-0">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
							<div>
								<div class="text-muted-foreground">Permissions</div>
								<div class="font-medium">
									{getPermissionCount(user.permissions)} active permissions
								</div>
							</div>
							<div>
								<div class="text-muted-foreground">Last Login</div>
								<div class="font-medium">
									{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
								</div>
							</div>
							<div>
								<div class="text-muted-foreground">Created</div>
								<div class="font-medium">{formatDate(user.createdAt)}</div>
							</div>
						</div>
						<div class="flex justify-end gap-2 mt-4">
							<Button
								variant="outline"
								size="sm"
								onclick={() => (editingUser = user)}
								class="gap-2"
							>
								<Edit class="h-4 w-4" />
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onclick={() => deleteUser(user.id)}
								class="gap-2"
							>
								<Trash2 class="h-4 w-4" />
								Delete
							</Button>
						</div>
					</CardContent>
				</Card>
			{/each}

			{#if users.length === 0}
				<Card>
					<CardContent class="flex items-center justify-center h-64">
						<div class="text-center">
							<User class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<h3 class="text-lg font-semibold">No users found</h3>
							<p class="text-muted-foreground mb-4">Create your first user to get started</p>
							<Button onclick={() => (showCreateModal = true)} class="gap-2">
								<Plus class="h-4 w-4" />
								Add User
							</Button>
						</div>
					</CardContent>
				</Card>
			{/if}
		</div>
	{/if}
</div>

{#if showCreateModal}
	<CreateUserModal 
		on:created={handleUserCreated}
		on:cancel={() => (showCreateModal = false)}
	/>
{/if}

{#if editingUser}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
		<Card class="w-full max-w-md">
			<CardHeader>
				<CardTitle>Edit User</CardTitle>
				<CardDescription>Update user information and permissions</CardDescription>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground">User editing modal will be implemented next.</p>
				<div class="flex justify-end gap-2 mt-4">
					<Button variant="outline" onclick={() => (editingUser = null)}>Cancel</Button>
				</div>
			</CardContent>
		</Card>
	</div>
{/if}