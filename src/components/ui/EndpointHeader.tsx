import React from "react";

interface EndpointHeaderProps {
  method?: string;
  path: string;
  title: string;
  sub?: string;
}

const EndpointHeader: React.FC<EndpointHeaderProps> = ({
  method = "GET",
  path,
  title,
  sub,
}) => (
  <div className="mb-12 text-center">
    <div className="inline-flex items-center gap-2 font-cavolini text-sm sm:text-base font-semibold bg-raised border border-line rounded-full px-4 py-1.5 mb-4">
      <span className="text-green font-semibold">{method}</span>
      <span className="text-muted">{path}</span>
      <span className="text-muted">·</span>
      <span className="text-green">200 OK</span>
    </div>
    <h2 className="font-cavolini text-3xl sm:text-4xl font-bold text-main">{title}</h2>
    {sub && <p className="text-muted mt-3 max-w-xl mx-auto text-sm sm:text-base">{sub}</p>}
  </div>
);

export default EndpointHeader;
