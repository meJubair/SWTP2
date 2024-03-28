// Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';


interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
