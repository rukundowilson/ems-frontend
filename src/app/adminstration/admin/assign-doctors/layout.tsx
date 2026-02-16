export default function AssignDoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 w-full">
      {children}
    </div>
  );
}
