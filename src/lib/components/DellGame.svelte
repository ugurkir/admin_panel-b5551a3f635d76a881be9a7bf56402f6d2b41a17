<script lang="ts">
	import { games } from '$lib/store';
	import { openPopup } from './PopupContainer.svelte';
	export let uid: number;
</script>

<div class="card card-hover">
	<div class="p-4">Emin Misiniz? {uid}</div>

	<div class="card-footer">
		<button
			class="btn bg-error-500"
			on:click={() => {
				$games = [...$games.filter((u) => u.id !== uid)];
				$openPopup = null;
			}}>Evet</button
		>
		<button
			class="btn bg-success-500"
			on:click={() => {
				$openPopup = null;
			}}>Hayir</button
		>
	</div>
</div>
