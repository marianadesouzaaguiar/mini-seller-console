import React from 'react';

export default function Login() {
  return (
    <div className="p-4 max-w-md mx-auto mt-20 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form className="flex flex-col space-y-3">
        <input type="text" placeholder="Usuário" className="p-2 border rounded" />
        <input type="password" placeholder="Senha" className="p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
