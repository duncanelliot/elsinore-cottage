<script lang="ts">
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import type { ProjectParticipantsProps } from './types.js';

	let { participants }: ProjectParticipantsProps = $props();
</script>

<div class="mb-8">
	<h2 class="text-3xl font-bold text-gray-900 mb-6">Project Participants by Organization</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each Object.entries(participants) as [orgName, people]}
			<Card>
				<CardHeader>
					<CardTitle class="text-xl">{orgName}</CardTitle>
					<CardDescription
						>{people.length} team member{people.length !== 1 ? 's' : ''}</CardDescription
					>
				</CardHeader>
				<CardContent>
					<div class="space-y-4">
						{#each people as person}
							<div class="border-l-4 border-blue-500 pl-4">
								<div class="flex items-start justify-between mb-2">
									<h4 class="font-semibold text-gray-900">{person.name}</h4>
									<Badge variant="outline" class="text-xs">{person.role}</Badge>
								</div>
								<p class="text-sm text-gray-600 mb-2">{person.description}</p>
								<div class="text-xs text-gray-500 space-y-1">
									<div>📧 {person.email}</div>
									{#if person.phone}
										<div>📞 {person.phone}</div>
									{/if}
									{#if person.credentials}
										<div>🎓 {person.credentials}</div>
									{/if}
									{#if person.location}
										<div>📍 {person.location}</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>

	<!-- Project Relationships -->
	<Card class="mt-8">
		<CardHeader>
			<CardTitle class="text-xl">Project Relationships & Communication</CardTitle>
			<CardDescription>
				Understanding the connections between organizations and key communication flows
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h4 class="font-semibold text-gray-900 mb-3">Primary Relationships</h4>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>
							• <strong>Cloud Lobsters:</strong> Platform development and technical delivery
						</li>
						<li>
							• <strong>AXIS Canada:</strong> Insurance distribution partner for Canadian market
						</li>
						<li>• <strong>1783 Group:</strong> UK broker coordinating the project</li>
						<li>• <strong>Acrisure:</strong> US partner providing additional support</li>
					</ul>
				</div>
				<div>
					<h4 class="font-semibold text-gray-900 mb-3">Communication Flow</h4>
					<ul class="space-y-2 text-sm text-gray-700">
						<li>
							• <strong>Harry Syms:</strong> Central coordinator, keeps all parties updated
						</li>
						<li>• <strong>Kevin Lea:</strong> Technical requirements and UX feedback</li>
						<li>
							• <strong>Duncan Elliot:</strong> Technical delivery and development updates
						</li>
						<li>
							• <strong>Ben Preston:</strong> Strategic oversight and Canadian market requirements
						</li>
					</ul>
				</div>
			</div>
		</CardContent>
	</Card>
</div>