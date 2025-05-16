import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(protected)/_dashboard/home/")({
  component: HomePage,
});

function HomePage() {
  return <div>HomePage</div>;
}
