<script lang="ts">
	import { games, selectedGroup, tables } from '$lib/store';
	import tabless from '$lib/data/tables.json';

	import { openPopup } from '$lib/components/PopupContainer.svelte';
	import { currentUser } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import DellGroup from '$lib/components/DellGroup.svelte';
	import AddGame from '$lib/components/AddGame.svelte';
	import AddTable from '$lib/components/AddTable.svelte';
	import { goto } from '$app/navigation';
	import DellTable from '$lib/components/DellTable.svelte';
	let filter = '';
	$tables = tabless;
	$: filteredUsers = $selectedGroup.tables.filter((u) => {
		if (!filter) {
			return true;
		}
		return Object.values(u).find((v) => v.toString().toLowerCase().includes(filter));
	});
</script>

<div class="flex m-2 p-4 card">
	<div class="table-container">
		<div class="card grow w-full flex p-2 justify-end rounded-sm">
			<div class="flex justify-between grow">
				<div class="">
					<input type="text" class="input" placeholder="filter" bind:value={filter} />
				</div>
				<button
					class="btn card-hover bg-surface-500"
					on:click={() => {
						openPopup.set([AddTable, {}]);
					}}>add table</button
				>
			</div>
		</div>

		<table class="table table-hover">
			<thead>
				<tr>
					<th>name</th>
					<th>id</th>
					<th class="justify-end flex">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as row, i}
					<tr
						on:dblclick={() => {
							goto('');
						}}
					>
						<td>{row.name}</td>
						<td>{row.id}</td>

						<td class="justify-end flex">
							<button
								class="btn bg-secondary-500"
								on:click={() => {
									$openPopup = [AddTable, { selectedTable: row }];
								}}
							>
								🖊️
							</button>
							<button
								class="btn bg-error-500 w-2"
								on:click={() => {
									openPopup.set([DellTable, { uid: row.id }]);
								}}
							>
								🗑️
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<button
			class="btn bg-secondary-500"
			on:click={() => {
				goto('/table_groups');
			}}
		>
			back
		</button>
	</div>
</div>
