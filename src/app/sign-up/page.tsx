import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Icons } from '~/components/ui/icons'

export default function SignUp() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="min-w-96 mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Continue with google</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline">
            <Icons.google className="mr-2 size-4" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}