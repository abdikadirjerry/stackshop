function SectionContainer({ children, className = "" }) {
  return <div className={`section-container ${className}`}>{children}</div>;
}

export default SectionContainer;
