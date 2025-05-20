import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/onboarding/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/onboarding/"!</div>
}
