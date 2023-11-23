import { writable } from "svelte/store";

export interface User {
    id: string;
    superadmin_id?: string | null;
    admin_id?: string | null;
    seller_id?: string | null;
    created_at: string;
    email?: string;
    phone?: string;
    h: string;
    password: string;
    affiliated_by?: string;
    multi_login_allowed: boolean;
    is_disabled: boolean;
    user_type: string;
    is_seamless: boolean;
    acc_reset_passwd?: string;
    card_lock_passwd?: string;
    note?: string;
    seamless_buy?: string;
    seamless_win?: string;
    seamless_check?: string;
    seamless_secret?: string;
    last_login_ips: string[];
    credit: number;
    bonus_credit: number;
}


enum TableGroupType {
    SameCardSameRoomBuy,
    UserBuysFromSingleTable,
    CardCanBeBoughtFromSingleTable,
    CardCanBeBoughtFromMultipleTables,
}

export interface Game {
    id: number;
    name: string;
    cards: number[];
}

export interface Table {
    id: number;
    group: number;
    name: string;
    price: number;
    c1: number;
    c2: number;
    t: number;
    first: number;
    last: number;
}



export interface TableGroup {
    gameId: number;
    name: string;
    groupType: number;
    sellerId: string;
    tables: Table[];
}

export const selectedGroup = writable<TableGroup>();
export const selectedGame = writable<Game>();
export const tableGroup = writable<TableGroup[]>([]);
export const games = writable<Game[]>([]);
export const tables = writable<Table[]>([]);
export const currentUser = writable<User | undefined>();
export const open = writable(false);
export const comboboxValue = writable('skeleton');
export const users = writable<User[]>([]);