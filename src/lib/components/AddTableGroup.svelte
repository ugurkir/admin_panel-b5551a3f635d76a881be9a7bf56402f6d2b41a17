<script lang="ts">
	import { currentUser, games, selectedGame, tableGroup, tables } from '$lib/store';
	import { openPopup } from './PopupContainer.svelte';
	import { RangeSlider, SlideToggle } from '@skeletonlabs/skeleton';
	export let selectedGroup = {
		gameId: 0,
		name: '',
		groupType: 0,
		sellerId: '',
		tables: $tables
	};
	let idInput = $selectedGame.id;
	let gameName = selectedGroup.name;
	let isNew = !selectedGroup.gameId;
	let gameId = selectedGroup.gameId;
	$: {
		if (!isNew) {
			idInput = gameId;
		}
		selectedGroup.gameId = idInput;
		selectedGroup.name = gameName;
	}
</script>

<div class="card card-hover">
	<div class="card-header text-center">
		{#if !isNew}
			<h1>Edit Edit: {selectedGroup.name}</h1>
		{:else}
			<h1>Create newdsadas</h1>
		{/if}
	</div>
	<form class="flex flex-col gap-4 p-4 justify-center items-center">
		<input class="input" type="text" placeholder="Id" bind:value={idInput} disabled={!isNew} />
		<input class="input" type="text" placeholder="name" bind:value={gameName} />

		<button
			class="btn bg-primary-500"
			on:click={() => {
				if (isNew) {
					$tableGroup = [
						selectedGroup,
						...$tableGroup.filter((u) => u.name !== selectedGroup.name)
					];
					console.log($tables);
					$openPopup = null;
				} else {
					$tableGroup = [
						selectedGroup,
						...$tableGroup.filter((u) => u.name !== selectedGroup.name)
					];
					console.log($tables);
					$openPopup = null;
				}
			}}
		>
			{#if isNew}
				Add table group
			{:else}
				Save changes
			{/if}
		</button>
	</form>
</div>
