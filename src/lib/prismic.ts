import * as prismic from "@prismicio/client";

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME;

if (!repositoryName) {
  throw new Error(
    "A variável de ambiente PRISMIC_REPOSITORY_NAME não está definida. " +
      "Adicione-a ao seu arquivo .env.local."
  );
}

export const client = prismic.createClient(repositoryName);
