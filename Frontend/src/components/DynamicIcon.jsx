import React from 'react';
import * as MdIcons from 'react-icons/md';

export default function DynamicIcon({ name, className, style, ariaHidden }) {
  if (!name) return null;
  const compName = 'Md' + name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const Component = MdIcons[compName] || MdIcons.MdHelpOutline;
  return <Component className={className} style={style} aria-hidden={ariaHidden} />;
}
