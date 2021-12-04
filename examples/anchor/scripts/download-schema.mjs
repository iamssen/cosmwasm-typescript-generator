const SCHEMA_ROOT = path.resolve(__dirname, '../schema');

const ANCHOR_CONTRACTS = [
  {
    remote: (contract) =>
      `https://github.com/Anchor-Protocol/anchor-token-contracts/tree/main/contracts/${contract}/schema`,
    contracts: [
      'airdrop',
      'collector',
      'community',
      'distributor',
      'gov',
      'staking',
      'vesting',
    ],
  },
  {
    remote: (contract) =>
      `https://github.com/Anchor-Protocol/money-market-contracts/tree/main/contracts/${contract}/schema`,
    contracts: [
      'custody_beth',
      'custody_bluna',
      'distribution_model',
      'interest_model',
      'liquidation',
      'liquidation_queue',
      'market',
      'oracle',
      'overseer',
    ],
  },
];

if (fs.existsSync(SCHEMA_ROOT)) {
  await $`rm -rf ${SCHEMA_ROOT}`;
}

for (const { remote, contracts } of ANCHOR_CONTRACTS) {
  for (const contract of contracts) {
    await $`copy-github-directory ${remote(contract)} ${path.resolve(
      SCHEMA_ROOT,
      contract,
    )}`;
  }
}
