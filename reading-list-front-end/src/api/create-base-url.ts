export const createBaseURL = ({
  host,
  env,
  service,
  version,
  handle,
}: {
  host: string;
  env: string;
  service: string;
  version: string;
  handle: string;
}) => `https://${host}.${env}/${handle}/${service}/${version}`;
