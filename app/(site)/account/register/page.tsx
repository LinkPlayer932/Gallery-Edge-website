import AuthTabs from "@/components/auth/AuthTabs";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="bg-[#F3EFE7] px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-700 text-lg font-semibold text-white">
          G
        </div>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-neutral-900">
          Gallery Edge
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Your personal gallery account</p>
      </div>
      <AuthTabs />
      <RegisterForm />
    </main>
  );
}