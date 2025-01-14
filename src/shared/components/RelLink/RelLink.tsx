import { useRelLinks } from "@/shared/utils/hooks";
import React from "react";
import { Link, LinkProps } from "react-router-dom";
interface RelLinkProps extends LinkProps {}

const RelLink: React.FC<RelLinkProps> = ({ to, ...props }) => {
  const [link] = useRelLinks([to as string]);

  return <Link to={link} {...props}></Link>;
};

export default RelLink;
