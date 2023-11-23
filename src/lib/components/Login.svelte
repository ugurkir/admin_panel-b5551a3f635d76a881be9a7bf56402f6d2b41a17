<script lang="ts">
	import { currentUser } from '../store';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import users from '$lib/data/userssss.json';
	import { comboboxValue } from '$lib/store';
	import { onMount } from 'svelte';
	const toastStore = getToastStore();

	onMount(() => {
		comboboxValue.subscribe((v) => {
			document.body.dataset.theme = v;
		});
	});
	let username = '';
	let password = '';

	function handleSubmit() {
		for (let i = 0; i < users.length; i++) {
			const element = users[i];
			console.log(element);
			if (username == element.id && password == element.password) {
				currentUser.set({
					id: element.id,
					superadmin_id: element.superadmin_id,
					admin_id: element.admin_id,
					seller_id: element.seller_id,
					created_at: element.created_at,
					email: element.email,
					phone: element.phone,
					h: element.h,
					password: element.password,
					affiliated_by: element.affiliated_by,
					multi_login_allowed: element.multi_login_allowed,
					is_disabled: element.is_disabled,
					user_type: element.user_type,
					is_seamless: element.is_seamless,
					acc_reset_passwd: '',
					card_lock_passwd: '',
					note: '',
					seamless_buy: '',
					seamless_win: '',
					seamless_check: '',
					seamless_secret: '',
					last_login_ips: element.last_login_ips,
					credit: element.credit,
					bonus_credit: element.bonus_credit
				});
				toastStore.clear();

				break;
			} else {
				toastStore.clear();
				toastStore.trigger({
					message: 'Gecersiz parola!',
					background: 'variant-filled-error',
					autohide: false,
					hoverable: true
				});
			}
		}
	}
</script>

<div class="h-full w-full flex justify-center items-center">
	<form
		class="card h-fit card-hover p-4 text-center flex flex-col gap-y-4 w-3/4 md:w-1/2 lg:w-1/4"
		on:submit|preventDefault={handleSubmit}
	>
		<div class="card-header">
			<h1>Login</h1>
		</div>
		<hr />
		<input type="text" bind:value={username} class="input" placeholder="Username" />
		<input type="password" bind:value={password} class="input" placeholder="Password" />
		<button class="btn variant-ghost-primary" type="submit"> login</button>
	</form>
</div>
