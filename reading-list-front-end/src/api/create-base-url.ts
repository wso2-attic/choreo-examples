export const createBaseURL = ({
  host,
  env,
  service,
  version,
  handle,
  endpointContext,
}: {
  host: string;
  env: string;
  service: string;
  version: string;
  handle: string;
  endpointContext?: string;
}) =>
  `https://${host}.${env}/${handle}/${service}/${endpointContext}/${version}`;
