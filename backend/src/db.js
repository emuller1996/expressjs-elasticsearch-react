import { Client } from "@elastic/elasticsearch";

export const client = new Client({
  node: "https://e29a09b3554d42da9fdb230bb0d2e6c9.us-central1.gcp.cloud.es.io:443",
  auth: {
    apiKey: {
      id: "EaH9Wo8BircwOi_nT9Et",
      name: "test2",
      expiration: 1720402501421,
      api_key: "ae9-AJFyTrKc1n-ZeRxGVA",
      encoded: "RWFIOVdvOEJpcmN3T2lfblQ5RXQ6YWU5LUFKRnlUcktjMW4tWmVSeEdWQQ==",
      beats_logstash_format: "EaH9Wo8BircwOi_nT9Et:ae9-AJFyTrKc1n-ZeRxGVA",
    },
  },
});
