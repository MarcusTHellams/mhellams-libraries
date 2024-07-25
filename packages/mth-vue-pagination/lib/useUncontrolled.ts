import { shallowRef, toValue, type MaybeRefOrGetter } from 'vue';

interface UseUncontrolledInput<T> {
	/** Value for controlled state */
	value?: MaybeRefOrGetter<T>;

	/** Initial value for uncontrolled state */
	defaultValue?: MaybeRefOrGetter<T>;

	/** Final value for uncontrolled state when value and defaultValue are not provided */
	finalValue?: MaybeRefOrGetter<T>;

	/** Controlled state onChange handler */
	onChange?(value: MaybeRefOrGetter<T>): void;
}

export const useUncontrolled = <T>({
	value,
	defaultValue,
	finalValue,
	onChange = () => {},
}: UseUncontrolledInput<T>): [
	MaybeRefOrGetter<T>,
	(value: MaybeRefOrGetter<T>) => void,
	boolean
] => {
	const uncontrolledValue = shallowRef(
		toValue(defaultValue) !== undefined
			? toValue(defaultValue)
			: toValue(finalValue)
	);

	const handleUncontrolledChange = (val: MaybeRefOrGetter<T>) => {
		uncontrolledValue.value = toValue(val);
		onChange?.(val);
	};

	if (toValue(value) !== undefined) {
		return [value as T, onChange, true];
	}

	return [uncontrolledValue as T, handleUncontrolledChange, false];
};
