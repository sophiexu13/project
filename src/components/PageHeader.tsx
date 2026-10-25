export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="page-head rise">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
