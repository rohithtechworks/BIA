const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const codes = ["1200000001", "1200000002", "1200000003", "1200000004", "1200000005"];
  for (const code of codes) {
    await prisma.accessCode.upsert({
      where: { code },
      update: {},
      create: { code },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
