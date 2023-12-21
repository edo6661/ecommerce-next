import { ModeToggle } from '@/components/shared/theme'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <>
      <div className='flex justify-evenly items-center'>
        <Button >Test</Button>
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
        <p>{process.env.CLERK_WEBHOOK_SECRET}</p>
      </div>
    </>
  )
}
