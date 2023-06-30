import { LensClient, development, production } from "@lens-protocol/client";

const lensHandler = new LensClient({
  environment: production,
});

export default lensHandler;
