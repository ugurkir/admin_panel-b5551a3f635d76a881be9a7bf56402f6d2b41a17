<script lang="ts">
	import { games, selectedGame, selectedGroup, tableGroup } from '$lib/store';
	import tableGrp from '$lib/data/tablegrp.json';

	import { openPopup } from '$lib/components/PopupContainer.svelte';
	import { currentUser } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import DellGroup from '$lib/components/DellGroup.svelte';
	import AddGame from '$lib/components/AddGame.svelte';
	import AddTblGroup from '$lib/components/AddTableGroup.svelte';
	import AddTableGroup from '$lib/components/AddTableGroup.svelte';
	import { goto } from '$app/navigation';
	$tableGroup = tableGrp;
	let filter = '';
	$: filteredUsers = $tableGroup.filter((u) => {
		if (!filter) {
			return true;
		}
		return Object.values(u).find((v) => v.toString().toLowerCase().includes(filter));
	});
	import type { PageLoad } from './$types';

	export const load: PageLoad = ({ params }) => {
		return {
			post: {
				title: `Title for ${params.slug} goes here`,
				content: `Content for ${params.slug} goes here`
			}
		};
	};
</script>

<div class="flex m-2 p-4 card">
	<div />
	<div class="table-container">
		<div class="card grow w-full flex p-2 justify-end rounded-sm">
			<div class="flex justify-between grow">
				<div class="">
					<input type="text" class="input" placeholder="filter" bind:value={filter} />
				</div>
				<button
					class="btn card-hover bg-surface-500"
					on:click={() => {
						openPopup.set([AddTableGroup, {}]);
					}}>add user</button
				>
			</div>
		</div>

		<table class="table table-hover">
			<thead>
				<tr>
					<th>name</th>
					<th>game id</th>
					<th class="justify-end flex">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as row, i}
					{#if row.gameId == $selectedGame.id}
						<tr
							on:dblclick={() => {
								goto(`/tables?group=${row.name}`);
								$selectedGroup = row;
							}}
						>
							<td>{row.name}</td>
							<td>{row.gameId}</td>

							<td class="justify-end flex">
								<button
									class="btn bg-secondary-500"
									on:click={() => {
										$openPopup = [AddTableGroup, { selectedGroup: row, isNew: false }];
									}}
								>
									🖊️
								</button>
								<button
									class="btn bg-error-500 w-2"
									on:click={() => {
										openPopup.set([DellGroup, { uid: row.gameId }]);
									}}
								>
									🗑️
								</button>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
		<button
			class="btn bg-secondary-500"
			on:click={() => {
				goto('/Game_tables');
			}}
		>
			back
		</button>
	</div>
</div>
