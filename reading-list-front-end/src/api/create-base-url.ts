export const createBaseURL = ({
  host,
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
}) => `https://${host}/${handle}/${service}/${endpointContext}/${version}`;
