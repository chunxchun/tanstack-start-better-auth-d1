type RouteHeaderProps = {
  title: string;
};

export default function RouteHeader({ title }: RouteHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
