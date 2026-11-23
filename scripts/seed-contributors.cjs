const { createClient } = require("@sanity/client");

const contributors = [
  "Rajiv Ganguly",
  "Shyamapriya Chatterjee",
  "Susmita Ghosh",
  "Anupam Das",
  "Sudip Bhattacharya",
  "Arnab Ghosh",
  "Arpan Maiti",
  "Asim Biswas",
  "Debosreeta Bose",
  "Piyali Gupta",
  "Kuheli Goswami",
  "Subhadeep Mukherjee",
  "Arun Kumar Ghosh",
  "Priyanka Bera",
  "Paramita Patra",
  "Sanjoy Gupta",
  "Sandeep Chowdhuri",
  "Moumita Kundu",
  "Buddhadeb Pradhan",
  "Dr. Tanay Pramanik",
  "Avijit Baidya",
  "Subhasis Rana",
  "Susenjit Ghosh",
  "Debjani Banerjee",
  "Paban Bittar",
  "Sanatan Soren",
  "Aishee Dey",
  "Subhajit Das",
  "Ila Dutta",
];

const client = createClient({
  projectId: "rv4xbems",
  dataset: "production",
  apiVersion: "2025-02-19",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

async function seed() {
  console.log(`Updating ${contributors.length} contributors to category "Supporter"…\n`);
  const transaction = client.transaction();

  contributors.forEach((name, i) => {
    const id = "contributor-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    transaction.createOrReplace({
      _type: "contributor",
      _id: id,
      name,
      location: "Kolkata",
      category: "Supporter",   // ← fixed
      anonymous: false,
      order: (i + 1),
    });
  });

  const result = await transaction.commit();
  console.log(`✓ ${result.results.length} documents written:\n`);
  result.results.forEach((r) => console.log(`  [${r.operation}] ${r.id}`));
}

seed().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
