export const AnchorLink = ({ href, children, className, style, ...props }) => {
  return (
    <div style={{ marginTop: "12px", color: "#FF594D", fontWeight: "bold" }}>
      <a href={href} style={{ ...style }} {...props}>
        {children}
      </a>
    </div>
  );
};
