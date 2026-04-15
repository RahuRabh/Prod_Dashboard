function Error({ error }: { error: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white rounded-2xl shadow-md border border-red-200 p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          {error}
        </h2>

        <button
          onClick={() => window.location.reload()}
          className="px-5 py-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default Error;
