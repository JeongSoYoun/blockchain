import blockData from "./data.json";

export const headCells = [
  {
    id: "rank",
    label: "Rank",
  },
  {
    id: "name",
    label: "Display Name",
  },
  {
    id: "abr",
    label: "Average Blocks Per Round",
  },
  {
    id: "blr",
    label: "Blocks Last Round",
  },
  {
    id: "minBond",
    label: "Minimum Bond",
  },
  {
    id: "del",
    label: "Delegations",
  },
  {
    id: "total",
    label: "Total Bonded",
  },
];

function createDataObj(
  rank,
  displayName,
  abr,
  blr,
  minBond,
  delegations,
  totalBonded
) {
  return {
    rank,
    displayName,
    abr,
    blr,
    minBond,
    delegations,
    totalBonded,
  };
}

const rows = [];
const getData = (_data) => {
  _data.map((data, index) => {
    let temp = Object.create({});

    temp = createDataObj(
      index,
      data.display_name,
      data.Average_Blocks,
      data.Blocks_last_round,
      data.minumum_bond,
      data.delegations,
      data.total_bonded
    );

    rows.push(temp);
    return rows;
  });
};

getData(blockData);
export const dataRows = rows.sort((a, b) => {
  return -(a.totalBonded - b.totalBonded);
});
dataRows.map((data, index) => (data.rank = index + 1));
