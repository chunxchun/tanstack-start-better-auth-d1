import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoMachines() {
  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="w-1/2 mx-auto">
        <CardHeader>
          <CardTitle>Machine Schedules</CardTitle>
          <CardDescription>
            No machines found for this shop yet. Create a machine first before
            assigning operating hours.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
