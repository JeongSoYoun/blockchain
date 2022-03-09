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

export function sortByTotalBond(rows) {
  let sortedRows = [];
  sortedRows = rows.sort((a, b) => {
    return -(a.totalBonded - b.totalBonded);
  });
  sortedRows.map((row, index) => (row.rank = index + 1));

  return sortedRows;
}

export const stateMapping = {
  true: "True",
  false: "False",
};