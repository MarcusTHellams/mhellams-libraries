export const DOTS = 'dots';
import { type MaybeRefOrGetter, ref, toValue, computed } from 'vue';
import { useUncontrolled } from './useUncontrolled';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export interface UseMthPaginationParams {
  /** Uncontrolled page selected on initial render, defaults to 1 */
  defaultPage?: MaybeRefOrGetter<number>;

  /** Controlled active page number */
  page?: MaybeRefOrGetter<number>;

  /** Total amount of pages */
  total: MaybeRefOrGetter<number>;
  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: MaybeRefOrGetter<number>;
  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: MaybeRefOrGetter<number>;
  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

export const useMthPagination = (params: UseMthPaginationParams) => {
  const {
    defaultPage = ref(1),
    page,
    total,
    siblings = ref(1),
    boundaries = ref(1),
    onChange,
  } = params;

  const _total = computed(() => Math.max(Math.trunc(toValue(total)), 0));
  const [activePage, setActivePage] = useUncontrolled({
    value: page,
    defaultValue: defaultPage,
    onChange,
    finalValue: defaultPage,
  });

  const setPage = (pageNumber: MaybeRefOrGetter<number>) => {
    const _pageNumber = toValue(pageNumber);
    if (_pageNumber <= 0) {
      setActivePage(1);
    } else if (_pageNumber > _total.value) {
      setActivePage(_total.value);
    } else {
      setActivePage(_pageNumber);
    }
  };

  const next = () => setPage(toValue(activePage) + 1);
  const prev = () => setPage(toValue(activePage) - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total);

  const paginationRange = computed(() => {
    const _siblings = toValue(siblings);
    const _boundaries = toValue(boundaries);
    const _activePage = toValue(activePage);

    const totalPageNumbers = _siblings * 2 + 3 + _boundaries * 2;
    if (totalPageNumbers >= _total.value) {
      return range(1, _total.value);
    }

    const leftSiblingIndex = Math.max(_activePage - _siblings, _boundaries);
    const rightSiblingIndex = Math.min(_activePage + _siblings, _total.value - _boundaries);

    const shouldShowLeftDots = leftSiblingIndex > _boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total.value - (_boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = _siblings * 2 + _boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_total.value - (_boundaries - 1), _total.value),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = _boundaries + 1 + 2 * _siblings;
      return [
        ...range(1, _boundaries),
        DOTS,
        ...range(_total.value - rightItemCount, _total.value),
      ];
    }

    return [
      ...range(1, _boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total.value - _boundaries + 1, _total.value),
    ];
  });

  return {
    getActivePage: () => toValue(activePage),
    getTotal: () => _total.value,
    getRange: () => toValue(paginationRange),
    first,
    last,
    next,
    prev,
    setPage,
  };
};
