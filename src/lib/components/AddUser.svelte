<script lang="ts">
	import type { User } from '$lib/store';
	import { currentUser, users } from '$lib/store';
	import { openPopup } from './PopupContainer.svelte';
	import { RangeSlider, SlideToggle } from '@skeletonlabs/skeleton';

	export let selectedUser: User = {
		id: '',
		superadmin_id: '',
		admin_id: '',
		seller_id: '',
		created_at: '',
		email: '',
		phone: '',
		h: '',
		password: '',
		affiliated_by: '',
		multi_login_allowed: false,
		is_disabled: false,
		user_type: '',
		is_seamless: false,
		acc_reset_passwd: '',
		card_lock_passwd: '',
		note: '',
		seamless_buy: '',
		seamless_win: '',
		seamless_check: '',
		seamless_secret: '',
		last_login_ips: [],
		credit: 0,
		bonus_credit: 0
	};
	let userId = selectedUser.id;
	let userPass = '';
	let isAdmin: boolean;

	let userEmail = selectedUser.email;
	let userPhone = selectedUser.phone;
	let note = selectedUser.note || 'No Note';
	let userType = selectedUser.user_type;
	let userCredit = selectedUser.credit;
	let isNew = !selectedUser.id;
	let max = 1000;
	let userSadmin = '';
	$: {
		selectedUser.id = userId;
		if (isAdmin == true) {
			selectedUser.admin_id = `admin${userId}`;
			isAdmin = true;
		} else {
			selectedUser.admin_id = '';
			isAdmin = false;
		}
		selectedUser.password = userPass;
		selectedUser.email = userEmail;
		selectedUser.phone = userPhone;
		selectedUser.credit = userCredit;
	}
</script>

<div class="card card-hover">
	<div class="card-header text-center">
		{#if !isNew}
			<h1>Edit User: {selectedUser.id}</h1>
		{:else}
			<h1>Create new user</h1>
		{/if}
	</div>
	<form class="flex flex-col gap-4 p-4 justify-center items-center">
		<input class="input" type="text" placeholder="Id" bind:value={userId} disabled={!isNew} />

		<input class="input" type="text" placeholder="Password" bind:value={userPass} />
		<input type="text" placeholder="Email" class="input" bind:value={userEmail} />
		<input type="text" placeholder="Number" class="input" bind:value={userPhone} />

		<RangeSlider name="range-slider" bind:value={userCredit} max={1000} step={1} ticked>
			<div class="flex justify-between items-center">
				<div class="font-bold">Credit</div>
				<div class="text-xs">{userCredit} / {max}</div>
			</div>
		</RangeSlider>
		<div class="flex items-center justify-around w-full">
			Is admin:
			<SlideToggle name="slide" bind:checked={isAdmin} />
		</div>

		<button
			class="btn bg-primary-500"
			on:click={() => {
				if (isNew) {
					if (!$currentUser?.admin_id) {
						selectedUser.admin_id = $currentUser?.id;
					} else if (!$currentUser.seller_id) {
						selectedUser.seller_id = $currentUser?.id;
					}

					$users = [selectedUser, ...$users.filter((u) => u.id !== selectedUser.id)];
					console.log($users);
					$openPopup = null;
				} else {
					$users = [selectedUser, ...$users.filter((u) => u.id !== selectedUser.id)];
					console.log($users);
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
