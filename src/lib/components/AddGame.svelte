<script lang="ts">
	import { currentUser, games } from '$lib/store';
	import { openPopup } from './PopupContainer.svelte';
	import { RangeSlider, SlideToggle } from '@skeletonlabs/skeleton';
	export let selectedGame = {
		id: 0,
		name: '',
		cards: []
	};
	let idInput: number;
	let gameName = selectedGame.name;
	let isNew = !selectedGame.id;
	let gameId = selectedGame.id;
	$: {
		if (!isNew) {
			idInput = gameId;
		}
		selectedGame.id = idInput;
		selectedGame.name = gameName;
	}
</script>

<div class="card card-hover">
	<div class="card-header text-center">
		{#if !isNew}
			<h1>Edit Edit: {selectedGame.name}</h1>
		{:else}
			<h1>Create new game</h1>
		{/if}
	</div>
	<form class="flex flex-col gap-4 p-4 justify-center items-center">
		<input class="input" type="text" placeholder="Id" bind:value={idInput} disabled={!isNew} />
		<input class="input" type="text" placeholder="name" bind:value={gameName} />

		<button
			class="btn bg-primary-500"
			on:click={() => {
				if (isNew) {
					$games = [selectedGame, ...$games.filter((u) => u.id !== selectedGame.id)];
					$openPopup = null;
				} else {
					$games = [selectedGame, ...$games.filter((u) => u.id !== selectedGame.id)];
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
