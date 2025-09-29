<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Switch } from '$lib/components/ui/switch';
	import { X } from '@lucide/svelte';

	const dispatch = createEventDispatcher();

	let formData = {
		email: '',
		username: '',
		password: '',
		name: '',
		phone: '',
		role: 'guest',
		permissions: {
			canViewBookings: false,
			canEditBookings: false,
			canDeleteBookings: false,
			canViewUsers: false,
			canEditUsers: false,
			canDeleteUsers: false,
			canManageSettings: false,
			canViewReports: false,
			canManageCalendar: false,
			canManagePricing: false
		}
	};

	let loading = false;

	const roles = [
		{ value: 'guest', label: 'Guest' },
		{ value: 'staff', label: 'Staff' },
		{ value: 'admin', label: 'Admin' },
		{ value: 'super_admin', label: 'Super Admin' }
	];

	const permissions = [
		{ key: 'canViewBookings', label: 'View Bookings' },
		{ key: 'canEditBookings', label: 'Edit Bookings' },
		{ key: 'canDeleteBookings', label: 'Delete Bookings' },
		{ key: 'canViewUsers', label: 'View Users' },
		{ key: 'canEditUsers', label: 'Edit Users' },
		{ key: 'canDeleteUsers', label: 'Delete Users' },
		{ key: 'canManageSettings', label: 'Manage Settings' },
		{ key: 'canViewReports', label: 'View Reports' },
		{ key: 'canManageCalendar', label: 'Manage Calendar' },
		{ key: 'canManagePricing', label: 'Manage Pricing' }
	];

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				dispatch('created');
			} else {
				const error = await response.json();
				alert('Error creating user: ' + (error.error || 'Unknown error'));
			}
		} catch (error) {
			console.error('Error creating user:', error);
			alert('Error creating user');
		} finally {
			loading = false;
		}
	}

	function handleRoleChange(value: string) {
		formData.role = value;
		
		// Auto-assign permissions based on role
		if (value === 'super_admin') {
			permissions.forEach(perm => {
				formData.permissions[perm.key as keyof typeof formData.permissions] = true;
			});
		} else if (value === 'admin') {
			formData.permissions = {
				canViewBookings: true,
				canEditBookings: true,
				canDeleteBookings: true,
				canViewUsers: true,
				canEditUsers: true,
				canDeleteUsers: false,
				canManageSettings: true,
				canViewReports: true,
				canManageCalendar: true,
				canManagePricing: true
			};
		} else if (value === 'staff') {
			formData.permissions = {
				canViewBookings: true,
				canEditBookings: true,
				canDeleteBookings: false,
				canViewUsers: false,
				canEditUsers: false,
				canDeleteUsers: false,
				canManageSettings: false,
				canViewReports: true,
				canManageCalendar: true,
				canManagePricing: false
			};
		} else {
			permissions.forEach(perm => {
				formData.permissions[perm.key as keyof typeof formData.permissions] = false;
			});
		}
	}
</script>

<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
	<Card class="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
		<CardHeader class="flex flex-row items-center justify-between">
			<div>
				<CardTitle>Create New User</CardTitle>
				<CardDescription>Add a new user to the system with specific permissions</CardDescription>
			</div>
			<Button variant="ghost" size="icon" onclick={() => dispatch('cancel')}>
				<X class="h-4 w-4" />
			</Button>
		</CardHeader>
		<CardContent>
			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="name">Full Name</Label>
						<Input id="name" bind:value={formData.name} required />
					</div>
					<div class="space-y-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" bind:value={formData.email} required />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="username">Username (Optional)</Label>
						<Input id="username" bind:value={formData.username} />
					</div>
					<div class="space-y-2">
						<Label for="phone">Phone (Optional)</Label>
						<Input id="phone" bind:value={formData.phone} />
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="password">Password</Label>
						<Input id="password" type="password" bind:value={formData.password} required />
					</div>
					<div class="space-y-2">
						<Label for="role">Role</Label>
						<Select.Root onSelectedChange={(selected) => selected && handleRoleChange(selected.value)}>
							<Select.Trigger>
								<Select.Value placeholder="Select role" />
							</Select.Trigger>
							<Select.Content>
								{#each roles as role}
									<Select.Item value={role.value}>{role.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>

				<div class="space-y-4">
					<Label class="text-base font-semibold">Permissions</Label>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
						{#each permissions as permission}
							<div class="flex items-center justify-between space-x-2">
								<Label for={permission.key} class="text-sm">
									{permission.label}
								</Label>
								<Switch 
									id={permission.key}
									bind:checked={formData.permissions[permission.key]}
								/>
							</div>
						{/each}
					</div>
				</div>

				<div class="flex justify-end gap-3 pt-4">
					<Button type="button" variant="outline" onclick={() => dispatch('cancel')}>
						Cancel
					</Button>
					<Button type="submit" disabled={loading}>
						{loading ? 'Creating...' : 'Create User'}
					</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</div>