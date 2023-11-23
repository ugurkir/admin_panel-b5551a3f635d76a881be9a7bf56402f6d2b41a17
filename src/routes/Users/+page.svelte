<script lang="ts">
	import {
		type TableSource,
		tableMapperValues,
		Table,
		Accordion,
		AccordionItem
	} from '@skeletonlabs/skeleton';
	import { users } from '$lib/store';
	import usersData from '$lib/data/userssss.json';
	$users = usersData;
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { openPopup } from '$lib/components/PopupContainer.svelte';
	import { currentUser } from '$lib/store';
	import AddUser from '$lib/components/AddUser.svelte';
	import DellUser from '$lib/components/DellUser.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import AddGame from '$lib/components/AddGame.svelte';

	let is_admin: boolean = false;
	let filter = '';
	$: filteredUsers = $users.filter((u) => {
		if (!filter) {
			return true;
		}
		return Object.values(u).find((v) => v.toString().toLowerCase().includes(filter));
	});
	$: {
		if ($currentUser?.superadmin_id == null || undefined) {
			backButton = true;
		} else {
			backButton = false;
		}
	}
	let thisAdmin: boolean = true;
	let thisNotAdmin: boolean = false;
	let backButton = true;
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
						openPopup.set([AddUser, {}]);
					}}>add user</button
				>
			</div>
		</div>

		<table class="table table-hover">
			<thead>
				<tr>
					<th>Id</th>
					<th>Email</th>
					<th>Phone</th>
					<th>User Type</th>
					<th>Is admin</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredUsers as row, i}
					{#if row.superadmin_id == $currentUser?.id || row.admin_id == $currentUser?.id || row.seller_id == $currentUser?.id}
						<tr
							on:dblclick={() => {
								$currentUser = row;
							}}
						>
							<td>{row.id}</td>
							<td>{row.email}</td>
							<td>{row.phone}</td>
							<td>{row.user_type}</td>
							{#if row.admin_id !== ''}
								<td><SlideToggle name="slide" checked={thisAdmin} disabled /></td>
							{:else}
								<td><SlideToggle name="slide" checked={thisNotAdmin} disabled /></td>
							{/if}

							<td>
								<button
									class="btn bg-secondary-500"
									on:click={() => {
										$openPopup = [AddUser, { selectedUser: row }];
									}}
								>
									🖊️
								</button>
								<button
									class="btn bg-error-500 w-2"
									on:click={() => {
										openPopup.set([DellUser, { uid: row.id }]);
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
			disabled={backButton}
			on:click={() => {
				for (let user of $users) {
					switch (user.id) {
						case $currentUser?.seller_id:
							$currentUser = user;
							break;
						case $currentUser?.admin_id:
							$currentUser = user;
							break;
						case $currentUser?.superadmin_id:
							$currentUser = user;
							break;
					}
				}
			}}>back</button
		>
	</div>
</div>
