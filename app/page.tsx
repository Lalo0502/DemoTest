'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineBuildingOffice2, HiOutlineLockClosed, HiOutlineEnvelope } from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulamos un delay para mostrar el loading state
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock login - En producción esto se conectaría con tu backend
    if (email === 'demo@example.com' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-gray-800">
      {/* Círculos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-64 w-64 animate-blob rounded-full bg-primary/5 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />
        <div className="absolute left-1/4 top-1/3 h-64 w-64 animate-blob animation-delay-2000 rounded-full bg-primary/10 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />
        <div className="absolute right-1/4 top-1/2 h-64 w-64 animate-blob animation-delay-4000 rounded-full bg-primary/5 mix-blend-multiply blur-xl filter dark:mix-blend-overlay" />
      </div>

      <div className="relative w-full max-w-md transform space-y-8 rounded-2xl bg-white/80 p-8 shadow-2xl backdrop-blur-sm transition-all dark:bg-gray-900/80">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative">
            {/* Logo con animación de pulso y rotación */}
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
            <div className="relative rounded-full bg-primary/10 p-2">
              <HiOutlineBuildingOffice2 className="h-8 w-8 animate-float text-primary" />
            </div>
          </div>
          <h1 className="animate-fade-in text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Alexander Depot
          </h1>
          <p className="animate-fade-in animation-delay-200 text-sm text-gray-500 dark:text-gray-400">
            Sistema de Gestión de Almacenes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="group relative animate-fade-in animation-delay-400">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineEnvelope className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-primary" />
              </div>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Correo electrónico"
                required
              />
            </div>

            <div className="group relative animate-fade-in animation-delay-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineLockClosed className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-primary" />
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Contraseña"
                required
              />
            </div>
          </div>

          <div className="flex animate-fade-in animation-delay-800 items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600 dark:text-gray-400"
              >
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary transition-colors hover:text-primary/80"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className="relative w-full overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            disabled={isLoading}
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isLoading ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </span>
            <span
              className={`transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              Iniciar Sesión
            </span>
          </Button>
        </form>

        <p className="mt-4 animate-fade-in animation-delay-1000 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="font-medium text-primary transition-colors hover:text-primary/80">
            Regístrate aquí
          </a>
        </p>
      </div>

      <div className="mt-8 animate-fade-in animation-delay-1000 text-center text-xs text-gray-500 dark:text-gray-400">
        Para probar, usa: demo@example.com / password
      </div>
    </div>
  );
}