import LoginForm from '@/components/form/LoginForm';

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center pt-16 min-h-screen bg-linear-to-b from-[#3a3d40] to-[#181719]">
      <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
