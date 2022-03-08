export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => orderingComparator(a, b, orderBy)
    : (a, b) => -orderingComparator(a, b, orderBy);
}

function orderingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
