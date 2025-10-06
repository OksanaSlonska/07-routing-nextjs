import SidebarNotes from "./@sidebar/SidebarNotes";

export default function FilterLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ width: "120px", backgroundColor: "#f0f0f0", padding: "16px" }}
      >
        <SidebarNotes />
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        {children}
        {modal}
      </div>
    </div>
  );
}
