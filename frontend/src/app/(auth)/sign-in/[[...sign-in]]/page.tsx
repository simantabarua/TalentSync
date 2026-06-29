import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow py-12">
      <SignIn />
    </div>
  );
}
