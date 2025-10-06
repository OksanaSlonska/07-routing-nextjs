// import SidebarNotes from "./@sidebar/SidebarNotes";

// export default function FilterLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <SidebarNotes />
//       <div style={{ flex: 1 }}>{children}</div>
//     </div>
//   );
// }

// import SidebarNotes from "./@sidebar/SidebarNotes";

// export default function FilterLayout({
//   children,
//   sidebar,
//   modal,
// }: {
//   children: React.ReactNode;
//   sidebar: React.ReactNode;
//   modal: React.ReactNode;
// }) {
//   return (
//     <div style={{ display: "flex" }}>
//       {sidebar}
//       <div style={{ flex: 1, position: "relative" }}>
//         {children}
//         {modal} {/* ← тут буде рендеритись модалка */}
//       </div>
//     </div>
//   );
// }

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
      <SidebarNotes />
      <div style={{ flex: 1, position: "relative" }}>
        {children}
        {modal} {/* сюда попадет модалка */}
      </div>
    </div>
  );
}
