<script setup lang="ts">
import { ref, toValue } from 'vue';
import { useMthPagination } from '../lib';
const page = ref(1);

// UNCONTROLLED
/*
  const pagination = useMthPagination({
    default: page,
    total: 10,
  });

*/

const pagination = useMthPagination({
	page: page,
	total: 10,
	onChange: (_page) => {
		page.value = toValue(_page);
	},
});
</script>

<template>
	<h1>Page: {{ pagination.getActivePage() }}</h1>
	<div style="display: inline-flex; gap: 1rem; flex-wrap: wrap">
		<button
			:disabled="pagination.getActivePage() === 1"
			@click="pagination.first()"
		>
			First
		</button>
		<button
			:disabled="pagination.getActivePage() === 1"
			@click="pagination.prev()"
		>
			Prev
		</button>
		<template v-for="(range, index) in pagination.getRange()" :key="index">
			<button
				@click="pagination.setPage(range as number)"
				:disabled="pagination.getActivePage() === range"
				v-if="range !== 'dots'"
			>
				{{ range }}
			</button>
			<button style="pointer-events: none" v-else>...</button>
		</template>
		<button
			:disabled="pagination.getActivePage() === pagination.getTotal()"
			@click="pagination.next()"
		>
			Next
		</button>
		<button
			:disabled="pagination.getActivePage() === pagination.getTotal()"
			@click="pagination.last()"
		>
			Last
		</button>
	</div>
	<div>
		<select
			style="width: 50%; margin-block-start: 1rem; height: 2rem"
			v-model="page"
		>
			<option
				:value="item + 1"
				v-for="item in Array.from({ length: pagination.getTotal() }).map(
					(_, index) => index
				)"
				:key="item"
			>
				{{ item + 1 }}
			</option>
		</select>
	</div>
</template>
