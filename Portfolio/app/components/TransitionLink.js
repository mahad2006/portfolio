'use client';
import React from 'react';
import { useSystem } from './SystemProvider';

const TransitionLink = ({ href, messages, children, className }) => {
  const { handleNavigate } = useSystem();

  const handleClick = (e) => {
    e.preventDefault();
    handleNavigate(href, messages);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default TransitionLink;