import * as React from 'react';

const pushState = (url: string) => (e: React.MouseEvent<any>) => {
  e.preventDefault();
  history.pushState(null, "", url);
}

const Link = ({ href, ...rest }: React.AllHTMLAttributes<any>) =>
  <a href={href} onClick={pushState(href)} {...rest} />;

export default Link;