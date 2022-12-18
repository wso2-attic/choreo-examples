export const createBaseURL = ({
  host,
  env,
  service,
  version,
}: {
  host: string;
  env: string;
  service: string;
  version: string;
}) => `https://${host}.${env}/pera/${service}/${version}`;
