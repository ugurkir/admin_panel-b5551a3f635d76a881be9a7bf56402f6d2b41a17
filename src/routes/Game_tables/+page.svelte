<script lang="ts">
	import { games, selectedGame } from '$lib/store';
	import gameData from '$lib/data/game.json';

	import { openPopup } from '$lib/components/PopupContainer.svelte';
	import { currentUser } from '$lib/store';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import AddTable from '$lib/components/AddGame.svelte';
	import AddGame from '$lib/components/AddGame.svelte';
	$games = gameData;
	import AddTblGroup from '$lib/components/AddTableGroup.svelte';
	import DellGame from '$lib/components/DellGame.svelte';
	import { goto } from '$app/navigation';

	let filter = '';
	$: filteredGames = $games.filter((u) => {
		if (!filter) {
			return true;
		}
		return Object.values(u).find((v) => v.toString().toLowerCase().includes(filter));
	});
	let click = 0;
	let game: any;
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
						openPopup.set([AddGame, {}]);
					}}>add user</button
				>
			</div>
		</div>

		<table class="table table-hover">
			<thead>
				<tr>
					<th>name</th>
					<th>cards</th>
					<th class="justify-end flex">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredGames as game, i}
					<tr
						on:dblclick={() => {
							console.log(game);
							goto(`/table_groups?game=${game.name}`);
							$selectedGame = game;
						}}
					>
						<td>{game.name}</td>
						<td>{game.cards}</td>

						<td class="justify-end flex">
							<button
								class="btn bg-secondary-500"
								on:click={() => {
									$openPopup = [AddGame, { selectedGame: game, isNew: false }];
								}}
							>
								🖊️
							</button>
							<button
								class="btn bg-error-500 w-2"
								on:click={() => {
									openPopup.set([DellGame, { uid: game.id }]);
								}}
							>
								🗑️
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
