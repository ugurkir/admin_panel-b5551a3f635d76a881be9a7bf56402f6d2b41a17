<script lang="ts">
	import { currentUser, selectedGroup, tableGroup, tables } from '$lib/store';
	import { openPopup } from './PopupContainer.svelte';
	import { RangeSlider, SlideToggle, filter } from '@skeletonlabs/skeleton';

	export let selectedTable = {
		id: 0,
		group: 0,
		name: '',
		price: 0,
		c1: 0,
		c2: 0,
		t: 0,
		first: 0,
		last: 0
	};
	let tableId = selectedTable.id;
	let tableName = selectedTable.name;
	let isNew = !selectedTable.id;

	let tablePrice = selectedTable.price;
	let max = 1000;
	$: {
		console.log(isNew);
		selectedTable.id = tableId;
		selectedTable.name = tableName;
		selectedTable.price = tablePrice;
	}
</script>

<div class="card card-hover">
	<div class="card-header text-center">
		{#if !isNew}
			<h1>Edit User: {selectedTable.id}</h1>
		{:else}
			<h1>Create new user</h1>
		{/if}
	</div>
	<form class="flex flex-col gap-4 p-4 justify-center items-center">
		<input class="input" type="text" placeholder="Id" bind:value={tableId} disabled={!isNew} />
		<input class="input" type="text" placeholder="name" bind:value={tableName} />

		<RangeSlider name="range-slider" bind:value={tablePrice} max={1000} step={1} ticked>
			<div class="flex justify-between items-center">
				<div class="font-bold">Price</div>
				<div class="text-xs">{tablePrice} / {max}</div>
			</div>
		</RangeSlider>

		<button
			class="btn bg-primary-500"
			on:click={() => {
				if (isNew) {
					$tables = [selectedTable, ...$tables.filter((u) => u.id !== selectedTable.id)];
					for (let i = 0; i < $tables.length; i++) {
						if ($tables[i].group == $selectedGroup.groupType) {
							$selectedGroup.tables = [
								$tables[i],
								...$selectedGroup.tables.filter((u) => u.group !== $selectedGroup.groupType)
							];
						}
					}
					$openPopup = null;
				} else {
					$tables = [selectedTable, ...$tables.filter((u) => u.id !== selectedTable.id)];
					for (let i = 0; i < $tables.length; i++) {
						if ($tables[i].group == $selectedGroup.groupType) {
							$selectedGroup.tables[i] = $tables[i];
						}
					}
					$openPopup = null;
				}
			}}
		>
			{#if isNew}
				Add user
			{:else}
				Save changes
			{/if}
		</button>
	</form>
</div>
